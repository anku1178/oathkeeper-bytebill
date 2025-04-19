// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/sync-gmail', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ message: 'No access token provided' });
  }

  // Gmail API search query for finance/receipts
  // BROADEN QUERY for debugging: fetch all emails, not just finance/receipts
  const query = encodeURIComponent(''); // Fetch all emails for debugging
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${query}&maxResults=10`;

  try {
    // 1. List message IDs matching the query
    const listRes = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const listData = await listRes.json();
    console.log('Gmail listData:', listData); // DEBUG

    if (!listData.messages) {
      console.log('No matching emails found for query:', query); // DEBUG
      return res.json({ message: 'No matching emails found', emails: [] });
    }

    // 2. Fetch full details for each message
    const emails = [];
    for (const msg of listData.messages) {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const msgData = await msgRes.json();
      emails.push(msgData);
    }

    // 3. Enhanced parsing: extract more financial fields
    const parsedEmails = emails.map(msg => {
      const headers = msg.payload.headers;
      const subjectHeader = headers.find(h => h.name === 'Subject');
      const fromHeader = headers.find(h => h.name === 'From');
      const dateHeader = headers.find(h => h.name === 'Date');
      const toHeader = headers.find(h => h.name === 'To');
      // Extract plain text body (if available)
      let body = '';
      if (msg.payload.parts) {
        const part = msg.payload.parts.find(p => p.mimeType === 'text/plain');
        if (part && part.body && part.body.data) {
          body = Buffer.from(part.body.data, 'base64').toString('utf-8');
        }
      } else if (msg.payload.body && msg.payload.body.data) {
        body = Buffer.from(msg.payload.body.data, 'base64').toString('utf-8');
      }
      // Extract amount (simple regex)
      let amount = '';
      const match = body.match(/(?:INR|Rs\.?|₹|\$)\s?([\d,]+(?:\.\d{1,2})?)/i);
      if (match) {
        amount = match[1];
      }
      // Extract bill/payment status
      let billStatus = '';
      if (/unpaid|due|pending/i.test(body)) billStatus = 'unpaid';
      else if (/paid|successfully paid|payment received/i.test(body)) billStatus = 'paid';
      // Extract vendor (from 'from' header or subject/body)
      let vendor = '';
      if (fromHeader && fromHeader.value) {
        const matchVendor = fromHeader.value.match(/^(.*?)</);
        vendor = matchVendor ? matchVendor[1].trim() : fromHeader.value;
      }
      // Try to extract due date (simple regex for date-like patterns)
      let dueDate = '';
      const dueDateMatch = body.match(/due (?:on|date)[:\s]*([\w\d\/-]+)/i);
      if (dueDateMatch) {
        dueDate = dueDateMatch[1];
      }
      // Try to extract invoice number
      let invoiceNumber = '';
      const invoiceMatch = body.match(/invoice\s*(?:no\.|number|#)[:\s]*([\w\d-]+)/i);
      if (invoiceMatch) {
        invoiceNumber = invoiceMatch[1];
      }
      // Compose receipt object for frontend
      return {
        id: msg.id,
        subject: subjectHeader ? subjectHeader.value : '',
        vendor,
        amount,
        date: dateHeader ? dateHeader.value : '',
        billStatus,
        dueDate,
        invoiceNumber,
        snippet: msg.snippet,
        body,
        from: fromHeader ? fromHeader.value : '',
        to: toHeader ? toHeader.value : '',
      };
    });

    // Calculate summary parameters for frontend
    const totalReceipts = parsedEmails.length;
    const totalAmount = parsedEmails.reduce((sum, r) => {
      // Try to parse amount as float, ignore if not possible
      const num = parseFloat((r.amount || '').replace(/,/g, ''));
      return !isNaN(num) ? sum + num : sum;
    }, 0);
    const processedCount = parsedEmails.filter(r => r.billStatus === 'paid' || r.billStatus === 'unpaid').length;

    // DEBUG: Log parsed emails count and first item
    console.log('Returning parsed emails:', parsedEmails.length, parsedEmails[0]);

    // 4. (Optional) Store parsed data in Supabase

    res.json({
      message: 'Fetched filtered emails',
      emails: parsedEmails,
      summary: {
        totalReceipts,
        totalAmount,
        processedCount,
      }
    });
  } catch (err) {
    console.error('Error fetching Gmail:', err);
    res.status(500).json({ message: 'Failed to fetch Gmail', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});