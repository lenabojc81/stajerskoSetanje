//682395030376-b9t0at26u545ir45rprn7odbusqsbs0l.apps.googleusercontent.com
//ios : 682395030376-39e16k4sa5ev8cp7fq0lojgvdoakpsna.apps.googleusercontent.com
//android: 682395030376-35k07odfbpt878dub1sdn976l0vdllvk.apps.googleusercontent.com


import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { View, Image, TouchableOpacity, Text } from 'react-native';


WebBrowser.maybeCompleteAuthSession();

export default function log() {
    const [accessToken, setAccessToken] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({

        clientId: '682395030376-b9t0at26u545ir45rprn7odbusqsbs0l.apps.googleusercontent.com',
        iosClientId: '682395030376-39e16k4sa5ev8cp7fq0lojgvdoakpsna.apps.googleusercontent.com',
        androidClientId: '682395030376-35k07odfbpt878dub1sdn976l0vdllvk.apps.googleusercontent.com'
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
           // setAccessToken(response.authentication.accessToken);
            accessToken && fetchUserInfo();
        }
    }, [response, accessToken]);





    async function fetchUserInfo() {

        let response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        const useInfo = await response.json();
        setUser(useInfo);
    };

    const ShowUserInfo = () => {
        if (user) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text> welcome </Text>
                    <Text> {(user as { name: string }).name} </Text>

                </View>
            )
        }
    }





    return (
        <View>
            {user && <ShowUserInfo />}
            {user === null &&
                <>
                    <Text> welcome </Text>
                    <TouchableOpacity
                        disabled={!request}
                        onPress={() => {
                            promptAsync();

                        }}>
                        <Image source={require('./google.jpg')}
                            style={{ width: 200, height: 50 }} />
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}