import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal, paddingBottom }}
                    enableOnAndroid={true}
                    extraScrollHeight={30}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1, paddingHorizontal, paddingBottom }}
                enableOnAndroid={true}
                extraScrollHeight={30}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={false}
            >
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default ScreenLayout;

