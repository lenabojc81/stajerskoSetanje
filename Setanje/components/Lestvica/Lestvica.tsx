import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';

// Testni podatki uporabnikov
const users = [
    { username: 'Janez123', points: 44500, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Maja456', points: 1400, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Peter789', points: 1300, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Ana321', points: 1200, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Ivan654', points: 1100, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Marko111', points: 1000, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Luka222', points: 900, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Nina333', points: 800, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Sara444', points: 700, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Tina555', points: 600, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Rok666', points: 500, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Katja777', points: 400, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Miha888', points: 300, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Eva999', points: 200, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Klemen1111', points: 100, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Matic2222', points: 50, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Jan3333', points: 150, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Anja4444', points: 250, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Ziga5555', points: 350, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Petra6666', points: 450, profileImage: 'https://via.placeholder.com/50' },
    { username: 'Dejan7777', points: 550, profileImage: 'https://via.placeholder.com/50' },
];


const sortedUsers = users.sort((a, b) => b.points - a.points);

const Lestvica = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Lestvica</Text>
            {sortedUsers.map((user, index) => (
                <View 
                    key={index} 
                    style={[
                        styles.userContainer, 
                        index === 0 && styles.firstUser,
                        index === 1 && styles.secondUser,
                        index === 2 && styles.thirdUser
                    ]}
                >
                    <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{user.username}</Text>
                        <Text style={styles.points}>{user.points} točk</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 80,
        backgroundColor: '#f8f8f8',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        elevation: 2, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
    },
    firstUser: {
        backgroundColor: '#FFD700', 
    },
    secondUser: {
        backgroundColor: '#C0C0C0', 
    },
    thirdUser: {
        backgroundColor: '#CD7F32',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    points: {
        fontSize: 16,
        color: '#1f1021',
    },
});

export default Lestvica;
