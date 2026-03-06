import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import "./global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [fontsLoaded, error] = useFonts({
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    });

    if (!fontsLoaded && !error) return null;

    return <Slot />
}

export default RootLayout