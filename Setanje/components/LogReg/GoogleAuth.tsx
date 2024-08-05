import React, { useEffect } from 'react';
import { Button, Platform } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const GoogleAuth: React.FC = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '781331499895-rccuc1egf3rcv8rp5k02rftv6ifi1sun.apps.googleusercontent.com',
    webClientId: '781331499895-jmml07sd9s7fc5us1q2t4c2rcmeft8ko.apps.googleusercontent.com',
    ...(Platform.OS === 'ios' ? { iosClientId: 'YOUR_IOS_CLIENT_ID' } : {}),
    redirectUri: makeRedirectUri({
      native: 'setanje://redirect',
    }),
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Handle authentication
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login with Google"
      onPress={() => {
        promptAsync();
      }}
    />
  );
};

export default GoogleAuth;
