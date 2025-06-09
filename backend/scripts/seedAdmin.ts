import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import User from '../src/models/User';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/foodtrace';

async function seedAdmin() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = 'Admin';

  if (!email || !password) {
    console.log('ADMIN_EMAIL or ADMIN_PASSWORD is not set!');
    process.exit(1);
  }

  let user = await User.findOne({ email });
  if (user) {
    // Nếu đã có, cập nhật password và role admin
    user.password = await bcrypt.hash(password, 10);
    user.role = 'admin';
    user.isVerified = true;
    await user.save();
    console.log('Admin user updated!');
  } else {
    // Nếu chưa có, tạo mới
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });
    console.log('Admin user created!');
  }
  process.exit(0);
}

seedAdmin().catch(err => {
  console.error(err);
  process.exit(1);
}); 