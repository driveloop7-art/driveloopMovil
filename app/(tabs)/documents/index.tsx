import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import MenuCard from '../../../components/MenuCard';
import ScreenLayout from '../../../components/ScreenLayout';

const Documents = () => {
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
                    <Text className="text-xl font-roboto-bold text-secondary">Documentos</Text>
                </View>
            </View>

            <View className="flex-1">
                <View className="flex-1 justify-center pb-12">
                    <View className="flex-row">
                        <MenuCard
                            title="Documento de Identidad"
                            onPress={() => router.push('/documents/identityDocument' as any)}
                        />
                    </View>
                    <View className="flex-row">
                        <MenuCard
                            title="Licencia de Conducción"
                            onPress={() => router.push('/documents/drivingLicense' as any)}
                        />
                    </View>
                </View>
            </View>
        </ScreenLayout>
    );
};

export default Documents;
