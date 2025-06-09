import User from './models/User';
import bcrypt from 'bcryptjs';

export async function ensureAdminUser() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = 'Admin';
  
    console.log('Seeding admin:', email, password ? 'password set' : 'no password');
  
    if (!email || !password) {
      console.log('ADMIN_EMAIL or ADMIN_PASSWORD is not set!');
      return;
    }
  
    const existing = await User.findOne({ email });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'admin',
        isVerified: true,
      });
      console.log('Admin user created!');
    } else {
      console.log('Admin user already exists!');
    }
}