// src/server.ts
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const { connectDB } = require('../config/database');
import { ensureAdminUser } from './seedAdmin';

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  await ensureAdminUser(); // Seed admin user
  app.listen(PORT, () => {
    console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`);
  });
}

startServer();
