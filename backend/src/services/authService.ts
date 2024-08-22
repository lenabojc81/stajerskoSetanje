// services/authService.ts
import User, { IUser } from '../models/users';
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../utils/jwtUtils';

export const registerUser = async (email: string, password: string, username: string): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    username,
    
  });

  await user.save();
  return user;
};


export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }) as IUser;
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  return {
    user,
    token: generateToken(user._id.toString()), 
  };
};

export const getUserFromToken = async (token: string) => {
  try {
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return null;
    }

    const user = await User.findById(decoded.userId) as IUser;
    return user;
  } catch (error) {
    console.error('Error getting user from token:', error);
    return null;
  }
};
