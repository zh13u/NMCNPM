// src/routes/homeRoutes.ts
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Chào mừng đến với hệ thống truy xuất nguồn gốc thực phẩm!',
    news: [
      { id: 1, title: 'Nông sản sạch lên kệ siêu thị', date: '2025-04-16' },
      { id: 2, title: 'Blockchain giúp minh bạch chuỗi cung ứng', date: '2025-04-15' },
    ],
    tips: [
      'Luôn kiểm tra mã QR trước khi mua',
      'Thực phẩm sạch có nguồn gốc rõ ràng từ nhà cung cấp uy tín'
    ]
  });
});

export default router;
