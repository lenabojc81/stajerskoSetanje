import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from './../LogReg/AuthServices';
import fetchUserData from './FetchUserData';

const UserProfile: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // To determine if the user is an admin
  const [message, setMessage] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserData({ setMessage, setEmail, setUsername, setIsAdmin });

        if (userData && userData.isAdmin) {
          setIsAdmin(true); // Set the admin status from the fetched user data
        }
      } catch (error) {
        setMessage(`Error loading user data: ${error.message}`);
      }
    };

    loadUserData();
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

  const handleChangePassword = () => {
    // Navigate to a change password screen or modal
    console.log('Change Password');
  };

  const handleAddPath = () => {
    // Navigate to the add path screen or modal
    console.log('Add Path');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uporabniški profil</Text>

      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://example.com/your-profile-image-url.png' }} // Replace with actual profile image URL
        />
      </View>

      {email && username ? (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Ime:</Text>
            <Text style={styles.value}>{username}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>

          <Button title="Spremeni geslo" onPress={handleChangePassword} />
          <Button title="Odjavi se" onPress={handleLogout} />

          {isAdmin && (
            <Button title="Dodaj pot" onPress={handleAddPath} />
          )}
        </>
      ) : (
        <>
          <Button title="Prijava" onPress={() => navigation.navigate('Login')} />
          <Button title="Registracija" onPress={() => navigation.navigate('Register')} />
          {message && <Text>{message}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0efde', // Background color
    padding: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0', // Placeholder background color
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default UserProfile;
