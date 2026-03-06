import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenLayoutProps {
    children: React.ReactNode;
    scrollable?: boolean;
    paddingHorizontal?: number;
}

const ScreenLayout = ({ children, scrollable = true, paddingHorizontal = 6 }: ScreenLayoutProps) => {
    const Container = scrollable ? ScrollView : View;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Container
                contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
                className={`flex-1 px-${paddingHorizontal}`}
            >
                {children}
            </Container>
        </SafeAreaView>
    );
};

export default ScreenLayout;
