
import React from 'react';
import { Bell, CreditCard, Globe, Lock, Mail, User, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and app configuration
        </p>
      </div>
      
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Profile Settings
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input id="name" defaultValue="Demo User" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input id="email" defaultValue="demo@billtrix.app" readOnly />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <label htmlFor="currency" className="text-sm font-medium">Preferred Currency</label>
              <Select defaultValue="usd">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - United States Dollar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="gbp">GBP - British Pound</SelectItem>
                  <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                  <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Button>Save Profile Changes</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notification Settings
          </CardTitle>
          <CardDescription>Configure how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about account activity via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Bill Reminders</h4>
                <p className="text-sm text-muted-foreground">
                  Get reminders before bill due dates
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Budget Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Be notified when you approach budget limits
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Weekly Reports</h4>
                <p className="text-sm text-muted-foreground">
                  Receive weekly spending summaries
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" /> Account Security
          </CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
              <Input id="current-password" type="password" />
            </div>
            <div></div>
            <div className="space-y-2">
              <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          
          <div>
            <Button>Change Password</Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" /> Connected Accounts
          </CardTitle>
          <CardDescription>Manage your connected accounts and services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Google Account</h4>
                <p className="text-sm text-muted-foreground">
                  Connected for email receipts
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Disconnect</Button>
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Banking Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Not connected
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium">Credit Card Services</h4>
                <p className="text-sm text-muted-foreground">
                  Not connected
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Download Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Export all your financial data and reports
              </p>
            </div>
            <Button variant="outline">Export Data</Button>
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Data Analytics</h4>
              <p className="text-sm text-muted-foreground">
                Allow anonymous usage data for app improvements
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-destructive">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently remove your account and all data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
