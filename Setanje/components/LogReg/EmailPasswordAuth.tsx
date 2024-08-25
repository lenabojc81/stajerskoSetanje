// EmailPasswordAuth.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { register, login } from './AuthServices';
import { useNavigation } from '@react-navigation/native';

const EmailPasswordAuth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await register(email, password, username);
      console.log('Register response:', response); // Log response
      if (response && response.email) {
        setMessage(`User registered: ${response.email}`);
      } else {
        setMessage('Registration failed: Invalid response structure');
      }
    } catch (error) {
      setMessage(`Registration error: ${error.message}`);
    }
  };
  
  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log('Login response:', response); // Log response
      if (response && response.email) {
        setMessage(`User logged in: ${response.email}`);
        navigation.navigate('Main');
      } else {
        setMessage('Login failed: Invalid response structure');
      }
    } catch (error) {
      setMessage(`Login error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
        <TextInput
        placeholder="Username" 
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {/* <Button title="Register" onPress={handleRegister} /> */}
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registracija</Text>
      </TouchableOpacity>
      {/* <Button title="Login" onPress={handleLogin} /> */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Prijava</Text>
      </TouchableOpacity>
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  button: {
    marginTop: 16,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 45,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});

export default EmailPasswordAuth;
