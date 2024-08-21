import { getToken } from '../LogReg/AuthServices';
import { baseUrl } from '../../global';

interface IFetchUserData {
    setMessage: (message: string) => void;
    setEmail: (email: string) => void;
    setUsername: (username: string) => void;
}

const fetchUserData = async ({ setMessage, setEmail, setUsername }: IFetchUserData) => {
    try {
      const token = await getToken();
      if (token) {
        const response = await fetch(`${baseUrl}/api/auth/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
  
        if (!response.ok) {
          const errorText = await response.text();
          console.log('Error response text:', errorText);
          setMessage(`Error fetching user data: ${response.status} ${response.statusText}`);
          return;
        }
  
        const result = await response.json();
        console.log('Result:', result);
  
        if (result.status === 'success' && result.data.email) {
          setEmail(result.data.email);
          setUsername(result.data.username);
        } else {
          setMessage('Failed to fetch user data');
        }
      } else {
        setMessage('No user is logged in');
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error.message);
      setMessage(`Error fetching user data: ${error.message}`);
    }
};

export default fetchUserData;