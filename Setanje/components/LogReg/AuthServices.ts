// AuthService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../global';

export const register = async (email: string, password: string, username: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
    const result = await response.json();
    if (result.status !== 'success') {
      throw new Error(result.message || 'Registration failed');
    }
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (result.status !== 'success') {
      throw new Error(result.message || 'Login failed');
    }

    console.log('Login response token:', result.token);
    if (!result.token) {
      throw new Error('Token is missing in the response');
    }

    await AsyncStorage.setItem('token', result.token);
    return result.data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};
