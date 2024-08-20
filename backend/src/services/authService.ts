// services/authService.ts
import User, { IUser } from '../models/users';
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../utils/jwtUtils';

export const registerUser = async (email: string, password: string): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  await user.save();
  return user;
};

export const authenticateUser = async (email: string, password: string): Promise<{ user: IUser; token: string } | null> => {
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = generateToken(user._id as string);
    return { user, token };
  }
  return null;
};

export const getUserFromToken = async (token: string) => {
  try {
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return null;
    }

    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    console.error('Error getting user from token:');
    return null;
  }
};
