// src/server.ts
import app from './app';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`);
});
