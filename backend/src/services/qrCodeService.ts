import QRCode from 'qrcode';
import { verifyProduct } from './blockchainService';

export const generateQRCode = async (data: {
  hash: string;
  productId: string;
  name: string;
}): Promise<string> => {
  try {
    const qrData = JSON.stringify({
      hash: data.hash,
      productId: data.productId,
      name: data.name,
      timestamp: new Date().toISOString()
    });
    return await QRCode.toDataURL(qrData);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const verifyQRCode = async (qrData: string): Promise<{
  isValid: boolean;
  productData?: any;
  error?: string;
}> => {
  try {
    // Verify the hash against blockchain
    const verificationResult = await verifyProduct(qrData);
    
    return {
      isValid: verificationResult.isValid,
      productData: verificationResult.productData
    };
  } catch (error) {
    console.error('Error verifying QR code:', error);
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Failed to verify QR code'
    };
  }
}; 