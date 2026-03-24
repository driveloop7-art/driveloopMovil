import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import MenuCard from '../../../components/MenuCard';
import ScreenLayout from '../../../components/ScreenLayout';

const AccountSettings = () => {
    const router = useRouter();

    return (
        <ScreenLayout>
            {/* Header con botón Volver */}
            <View className="flex-row items-center mt-4 mb-10">
                <CustomButton
                    variant="textOnly"
                    iconLeft={<MaterialIcons name="arrow-back" size={24} color="#111111" />}
                    onPress={() => router.back()}
                />
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
                            onPress={() => console.log('Borrar cuenta')}
                        />
                    </View>
                </View>

                <View className="mb-20">
                    <View className="flex-row">
                        <MenuCard
                            title="Cerrar sesión"
                            onPress={() => console.log('Cerrar sesión')}
                        />
                    </View>
                </View>
            </View>
        </ScreenLayout>
    );
};

export default AccountSettings;
