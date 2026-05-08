import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenLayoutProps {
    children: React.ReactNode;
    scrollable?: boolean;
    paddingHorizontal?: number;
}

const ScreenLayout = ({ children, scrollable = true, paddingHorizontal = 24 }: ScreenLayoutProps) => {

    const renderContent = () => {
        return (
            // Evita que el teclado tape los inputs
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                {scrollable ? (
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal }}
                        className="flex-1"
                        keyboardShouldPersistTaps="handled" // Cierra teclado al tocar fuera
                    >
                        {children}
                    </ScrollView>
                ) : (
                    <View style={{ flex: 1, paddingHorizontal }}>
                        {children}
                    </View>
                )}
            </KeyboardAvoidingView>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {renderContent()}
        </SafeAreaView>
    );
};

export default ScreenLayout;
