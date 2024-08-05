// AuthService.ts
import { baseUrl } from "../../global"; // Adjust the path according to your project structure

export const register = async (email: string, password: string) => {
  try {
    console.log('Sending request to:', `${baseUrl}/api/auth/register`);
    console.log('Request payload:', { email, password });
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (result.status !== 'success') {
      throw new Error(result.message || 'Registration failed');
    }
    console.log('Registration response:', result); // Debugging: Log the response
    return result.data; // Return the user data
  } catch (error) {
    console.error('Network request failed', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    console.log('Sending request to:', `${baseUrl}/api/auth/login`);
    console.log('Request payload:', { email, password });
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
    console.log('Login response:', result); // Debugging: Log the response
    return result.data; // Return the user data
  } catch (error) {
    console.error('Network request failed', error);
    throw error;
  }
};
