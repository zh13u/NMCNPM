import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/home'; // 💥 Thêm dòng này

const app = express();

app.use(cors());
app.use(express.json());

// 💥 Thêm dòng này
app.use('/api/home', homeRoutes);
app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
  });
export default app;