import { Stack } from "expo-router";

//router do vseh strani(tukaj jih vstavljaš)
//komponente ustvarjaš v app
export default function Layout(){
    return (
        <Stack>
            <Stack.Screen name="home" />
            <Stack.Screen name="index" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="google_login" />
            <Stack.Screen name="login" />
        </Stack>
    );
}