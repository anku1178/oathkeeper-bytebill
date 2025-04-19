// pages/api/sync-gmail.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // TODO: Replace with real Gmail syncing logic
    console.log('Gmail sync endpoint hit');
    
    // Simulate a response
    return res.status(200).json({ message: 'Gmail receipts synced successfully' });
  } catch (error) {
    console.error('Error syncing Gmail receipts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
