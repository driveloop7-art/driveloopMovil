import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Altura total que ocupa la isla flotante del tab bar (height 65 + bottom 25 + buffer 10)
const TAB_BAR_SPACE = 100;

interface ScreenLayoutProps {
    children: React.ReactNode;
    scrollable?: boolean;
    paddingHorizontal?: number;
    /** Activar en pantallas dentro del Tab Navigator para evitar que la isla flotante tape el contenido */
    withTabBar?: boolean;
}

const ScreenLayout = ({ children, scrollable = true, paddingHorizontal = 24, withTabBar = false }: ScreenLayoutProps) => {
    const paddingBottom = withTabBar ? TAB_BAR_SPACE : 0;

    if (scrollable) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal, paddingBottom }}
                        className="flex-1"
                        keyboardShouldPersistTaps="handled"
                    >
                        {children}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={{ flex: 1, paddingHorizontal, paddingBottom }}>
                    {children}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ScreenLayout;
