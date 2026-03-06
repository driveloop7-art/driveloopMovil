import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Logo from '../components/Logo';
import ScreenLayout from '../components/ScreenLayout';

const Login = () => {
    const router = useRouter();

    return (
        <ScreenLayout>
            {/* Logo */}
            <Logo className="mt-10 mb-12" />

            {/* Formulario */}
            <View className="space-y-4">
                <CustomInput
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    icon={<MaterialIcons name="mail-outline" size={20} color="#6B7280" />}
                />

                <CustomInput
                    placeholder="Contraseña"
                    secureTextEntry
                    icon={<MaterialIcons name="lock-outline" size={20} color="#6B7280" />}
                />

                <View className="flex-row justify-between mt-2">
                    <Text className="text-gray-500 text-sm font-roboto-light">
                        ¿Olvidaste la contraseña?
                    </Text>
                    <TouchableOpacity>
                        <Text className="text-primary font-roboto-bold text-sm">
                            Clic aquí
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Botón de Acción */}
            <View className="mt-10">
                <CustomButton title="Iniciar sesión" onPress={() => router.replace('/dashboard' as any)} />
            </View>

            {/* Registro */}
            <View className="flex-row justify-center mt-8">
                <Text className="text-gray-500 font-roboto-light">¿No tienes una cuenta? </Text>
                <Link href={"/register" as any} asChild>
                    <TouchableOpacity>
                        <Text className="text-primary font-roboto-bold">Regístrate</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ScreenLayout>
    );
};

export default Login;
