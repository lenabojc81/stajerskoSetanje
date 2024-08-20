import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { baseUrl } from "../../global";
import styless from "./styless";
import { logout, getToken } from './../LogReg/AuthServices';
import { useNavigation } from '@react-navigation/native';
import EmailPasswordAuth from '../LogReg/EmailPasswordAuth';

const UserProfile: React.FC = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const navigation = useNavigation();
  
    useEffect(() => {
      const fetchUserData = async () => {
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
            } else {
              setMessage('Failed to fetch user data');
            }
          } else {
            setMessage('No user is logged in');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
          setMessage(`Error fetching user data: ${error.message}`);
        }
      };
  
      fetchUserData();
    }, []);
  
    const handleLogout = async () => {
      try {
        await logout();
        setMessage('Uspešno odjavljen');
        navigation.navigate('Login'); 
      } catch (error) {
        setMessage(`Logout error: ${error.message}`);
      }
    };
  
    return (
      <View style={styless.container}>
        <Text style={styless.title}>Uporabniški profil</Text>
        {email ? (
          <>
            <Text style={styless.email}>Prijavljen kot: {email}</Text>
            <Button title="Odjavi me" onPress={handleLogout} />
          </>
        ) : (
          <Text>{message}</Text>
        )}
      </View>
    );
  };
  
export default UserProfile;
