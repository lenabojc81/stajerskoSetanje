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
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData({ setMessage, setEmail, setUsername });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
      setEmail(null);
      setUsername(null);
    } catch (error) {
      setMessage(`Logout error: ${error.message}`);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login'); 
  };

  const handleRegister = () => {
    navigation.navigate('Register'); 
  };



  return (
    <View style={styless.container}>
      <Text style={styless.title}>Uporabniški profil</Text>
      {email && username ? (
        <>
          <Text style={styless.email}>Prijavljen kot: {username} ({email})</Text>
          <Button title="Odjavi se" onPress={handleLogout} />
        </>
     ) : (
      <>
        <Button title="Prijava" onPress={handleLogin} />
        <Button title="Registracija" onPress={handleRegister} />
        {message && <Text>{message}</Text>}
      </>
    )}
  </View>
  );
};

export default UserProfile;