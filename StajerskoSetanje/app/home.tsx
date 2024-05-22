import React from 'react';
import { Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

const home = () => {
    return (
        <View>
            <Text>This is the home page</Text>
            <Link href={'/'}>Go to Index</Link>
            <Link href={'/profile'}>Go to Profile</Link>
            <Link href={'/google_login'}>Go to login</Link>
            <Link href={'/login'}>Go to new login</Link>
        </View>
    );
}

export default home;