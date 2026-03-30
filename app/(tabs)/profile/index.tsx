import { router, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { logoutUser } from '../../../api/services/authService';
import MenuCard from '../../../components/MenuCard';
import ScreenLayout from '../../../components/ScreenLayout';

const handleLogout = async () => {
    await logoutUser();
    router.replace('/login'); // Expulsa al usuario
};

const AccountSettings = () => {
    const router = useRouter();

    return (
        <ScreenLayout>
            {/* Header con botón Volver */}
            <View className="flex-row items-center mt-4 mb-10">
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Configuración de cuenta</Text>
                </View>
            </View>

            <View className="flex-1">
                <View className="flex-1 justify-center pb-12">
                    <View className="flex-row">
                        <MenuCard
                            title="Información de perfil"
                            onPress={() => router.push('/profile/profileInfo' as any)}
                        />
                    </View>
                    <View className="flex-row">
                        <MenuCard
                            title="Actualizar contraseña"
                            onPress={() => router.push('/profile/updatePassword' as any)}
                        />
                    </View>
                    <View className="flex-row">
                        <MenuCard
                            title="Borrar cuenta"
                            onPress={() => router.push('/profile/deleteAccount' as any)}
                        />
                    </View>
                </View>

                <View className="mb-20">
                    <View className="flex-row">
                        <MenuCard
                            title="Cerrar sesión"
                            onPress={handleLogout}
                        />
                    </View>
                </View>
            </View>
        </ScreenLayout>
    );
};

export default AccountSettings;
