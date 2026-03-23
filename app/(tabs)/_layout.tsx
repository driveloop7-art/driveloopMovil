import { Tabs } from 'expo-router';
import { Folder, Home, User } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const TabsLayout = () => {
    return (
        <Tabs
            // --- CONFIGURACIÓN DE LA ISLA FLOTANTE ---
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    paddingBottom: 0,
                    paddingTop: 0,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 35,
                    height: 65,
                    borderTopWidth: 0,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Home size={28} color={focused ? '#C91843' : '#8E8E93'} strokeWidth={focused ? 2.5 : 2} />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="documents"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Folder size={28} color={focused ? '#C91843' : '#8E8E93'} strokeWidth={focused ? 2.5 : 2} />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <User size={28} color={focused ? '#C91843' : '#8E8E93'} strokeWidth={focused ? 2.5 : 2} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
