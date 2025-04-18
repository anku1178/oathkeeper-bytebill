require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
// Place your Firebase service account key JSON in backend/serviceAccountKey.json
const serviceAccount = require('./prabal-2025-firebase-adminsdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL || undefined
});

const db = admin.firestore();

// Example route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Example: Get all expenses (replace with your actual collection)
app.get('/api/expenses', async (req, res) => {
  try {
    const snapshot = await db.collection('expenses').get();
    const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example: Add expense
app.post('/api/expenses', async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('expenses').add(data);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
