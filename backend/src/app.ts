import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/home';
import blockchainRoutes from './routes/blockchainRoutes';
import supplierRoutes from './routes/supplierRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/home', homeRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/supplier', supplierRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

export default app;