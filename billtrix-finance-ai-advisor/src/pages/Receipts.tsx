import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import type { Receipt } from '@/lib/supabase';
import { Header } from '@/components/receipts/Header';
import { SummaryCards } from '@/components/receipts/SummaryCards';
import { SearchToolbar } from '@/components/receipts/SearchToolbar';
import { ReceiptList } from '@/components/receipts/ReceiptList';
import { QuickHelp } from '@/components/receipts/QuickHelp';

const Receipts = () => {
  const { user } = useAuth();
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [summary, setSummary] = useState({
    totalReceipts: 0,
    totalAmount: 0,
    processedCount: 0,
  });

  const filteredReceipts = receipts.filter(receipt =>
    receipt.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .eq('user_id', user?.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setReceipts(data || []);
    } catch (error) {
      console.error('Error fetching receipts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load receipts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const syncGmailReceipts = async () => {
    setSyncing(true);
    try {
      // Try to get provider_token or fallback to access_token
      const { data: sessionData } = await supabase.auth.getSession();
      let accessToken = sessionData?.session?.provider_token;
      if (!accessToken) {
        accessToken = sessionData?.session?.access_token;
      }
      if (!accessToken) {
        throw new Error('No Google access token found. Please re-login with Google.');
      }
      console.log('Google Access Token:', accessToken); // For debugging

      const response = await fetch('http://localhost:5000/api/sync-gmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log('Synced Emails:', data.emails); // For debugging
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sync Gmail receipts');
      }
      if (Array.isArray(data.emails)) {
        // Defensive: filter out any undefined/null/empty objects
        const validEmails = data.emails.filter(email => email && typeof email === 'object');
        const syncedReceipts = validEmails.map(email => ({
          id: email.id || '',
          subject: email.subject || '',
          vendor: email.vendor || email.from || '',
          amount: email.amount || '',
          date: email.date || '',
          billStatus: email.billStatus || '',
          dueDate: email.dueDate || '',
          invoiceNumber: email.invoiceNumber || '',
        }));
        setReceipts(syncedReceipts);
        // Update summary cards from backend summary if present
        if (data.summary) {
          setSummary({
            totalReceipts: data.summary.totalReceipts,
            totalAmount: data.summary.totalAmount,
            processedCount: data.summary.processedCount,
          });
        }
      } else {
        setReceipts([]); // Defensive: clear receipts if no emails returned
        setSummary({ totalReceipts: 0, totalAmount: 0, processedCount: 0 });
        throw new Error('No emails found in Gmail sync');
      }
    } catch (error) {
      console.error('Error syncing Gmail receipts:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sync Gmail receipts',
        variant: 'destructive',
      });
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReceipts();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <Header syncing={syncing} onSync={syncGmailReceipts} />
      <SummaryCards
        receipts={receipts}
        totalReceipts={summary.totalReceipts}
        totalAmount={summary.totalAmount}
        processedCount={summary.processedCount}
      />
      <SearchToolbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ReceiptList loading={loading} receipts={receipts} filteredReceipts={filteredReceipts} />
      <QuickHelp />
    </div>
  );
};

export default Receipts;
