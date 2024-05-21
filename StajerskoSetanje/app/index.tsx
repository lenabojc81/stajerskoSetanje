import React from 'react';
import { Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

const index = () => {
    return (
        <View>
            <Text>This is the index Page</Text>
            <Link href={'/home'}>Go to Home</Link>
        </View>
       
    );
}
export default index;