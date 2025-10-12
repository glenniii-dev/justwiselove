import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import adminRoutes from './routes/AdminRoutes.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURL = process.env.MONGO_URL || '';
mongoose.connect(mongoURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Admin routes
app.use('/api/admin', adminRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server successfully started on port: ${port}`);
});

export default app;
