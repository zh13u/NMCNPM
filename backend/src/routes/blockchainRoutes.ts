import express from 'express';
import { addProduct, getProduct, verifyProductHash } from '../controllers/blockchainController';

const router = express.Router();

router.post('/addProduct', addProduct);
router.get('/product/:id', getProduct);
router.post('/verify', verifyProductHash);

export default router; 