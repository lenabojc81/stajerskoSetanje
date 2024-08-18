import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { baseUrl } from "../../global";


const fetchUserProfile = async (userId) => {
    try {
        const response = await fetch(`${baseUrl}/api/profile/${userId}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid content type, expected application/json");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw new Error(error.message || "Napaka pri pridobivanju uporabniškega profila");
    }
};

const UserProfile = ({ userId }) => {
    const [profile, setProfile] = useState({
        email: '',
        profilePicture: 'https://example.com/path-to-default-profile-picture.png'
    });
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const userData = await fetchUserProfile(userId);
                setProfile(userData.data); // Prilagodite to, če je struktura podatkov drugačna
                setErrorMsg(''); // Po uspešnem nalaganju izbrišite napake
            } catch (error) {
                setErrorMsg(error.message || "Napaka pri nalaganju uporabniškega profila");
            }
        };

        loadUserProfile();
    }, [userId]);

    const handleRefresh = async () => {
        try {
            const userData = await fetchUserProfile(userId);
            setProfile(userData.data); // Prilagodite to, če je struktura podatkov drugačna
            setErrorMsg(''); // Po uspešnem nalaganju izbrišite napake
        } catch (error) {
            setErrorMsg(error.message || "Napaka pri posodabljanju uporabniškega profila");
        }
    };

    return (
        <View style={styles.container}>
            {errorMsg ? (
                <Text style={styles.error}>{errorMsg}</Text>
            ) : (
                <View>
                    <Image
                        source={{ uri: profile.profilePicture }}
                        style={styles.profilePicture}
                    />
                    <Text style={styles.email}>Email: {profile.email}</Text>
                </View>
            )}
            <Button title="Refresh" onPress={handleRefresh} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    email: {
        fontSize: 18,
    },
    error: {
        fontSize: 18,
        color: 'red',
    },
});

export default UserProfile;
