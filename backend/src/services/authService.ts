// services/authService.ts
import User, { IUser } from '../models/users'; // Adjust the path as necessary
import bcrypt from 'bcryptjs';

export const registerUser = async (email: string, password: string): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  await user.save();
  return user;
};

export const authenticateUser = async (email: string, password: string): Promise<IUser | null> => {
  console.log(`Authenticating user with email: ${email}`); // Add logging
  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found');
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Password match status:', isMatch); // Add logging for password match status
  if (!isMatch) {
    console.log('Password does not match');
    return null;
  }
  return user;
};
