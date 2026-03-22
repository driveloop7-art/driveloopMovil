<<<<<<< main
import { Tabs } from 'expo-router';
import { Folder, Home, User } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
=======
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
>>>>>>> main

const TabsLayout = () => {
    return (
        <Tabs
<<<<<<< main
            // --- CONFIGURACIÓN DE LA ISLA FLOTANTE ---
=======
>>>>>>> main
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
<<<<<<< main
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
=======
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowOpacity: 0.1,
                    height: 70,
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderRadius: 30,
                },

                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#9ca3af',
>>>>>>> main
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
<<<<<<< main
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
=======
                    title: "Inicio",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="documents"
                options={{
                    title: "Documentos",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="folder-copy" size={28} color={color} />
>>>>>>> main
                    ),
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
<<<<<<< main
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <User size={28} color={focused ? '#C91843' : '#8E8E93'} strokeWidth={focused ? 2.5 : 2} />
                        </View>
=======
                    title: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" size={28} color={color} />
>>>>>>> main
                    ),
                }}
            />
        </Tabs>
    );
};

<<<<<<< main
export default TabsLayout;
=======
export default TabsLayout;
>>>>>>> main
