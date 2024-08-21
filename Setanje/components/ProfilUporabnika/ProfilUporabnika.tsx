import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { baseUrl } from "../../global";
import styless from "./styless";
import { logout, getToken } from './../LogReg/AuthServices';
import { useNavigation } from '@react-navigation/native';
import EmailPasswordAuth from '../LogReg/EmailPasswordAuth';
import fetchUserData from './FetchUserData';
import { set } from 'react-hook-form';

const UserProfile: React.FC = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const navigation = useNavigation();
  
    useEffect(() => {
      fetchUserData({setMessage, setEmail});
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
