import React from 'react';
import { Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

const profile = () => {
    return (
        <View>
            <Text>This is the Profile page</Text>
            <Link href={'/'}>Go to Index</Link>
            <Link href={'/home'}>Go to Home </Link>
        </View>
    );
}

export default profile;