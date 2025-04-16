import { Router } from 'express';

const router = Router();

// Ví dụ dữ liệu trang chủ
const homepageData = {
  news: [
    { id: 1, title: 'Ứng dụng Blockchain trong truy xuất thực phẩm', date: '2025-04-15' },
    { id: 2, title: 'Thực phẩm sạch & nguồn gốc minh bạch', date: '2025-04-10' }
  ],
  featuredProducts: [
    { id: 'SP001', name: 'Rau sạch Đà Lạt', supplier: 'Nông trại Xanh' },
    { id: 'SP002', name: 'Gạo hữu cơ An Giang', supplier: 'HTX An Phát' }
  ]
};

router.get('/', (req, res) => {
  res.json(homepageData);
});

export default router;
