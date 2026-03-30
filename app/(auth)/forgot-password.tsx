import { useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { requestPasswordReset } from '../../api/services/authService';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Logo from '../../components/Logo';
import ScreenLayout from '../../components/ScreenLayout';

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendEmail = async () => {
        // Validación básica
        if (!email) {
            Alert.alert('Cuidado', 'Debes ingresar tu correo electrónico');
            return;
        }

        setLoading(true);

        try {
            // Llamamos a la función recién creada en authService
            await requestPasswordReset(email);
            Alert.alert(
                'Correo Enviado',
                'Te hemos enviado un enlace a tu correo para que restablezcas tu contraseña.',
                [{ text: 'Entendido', onPress: () => router.back() }] // Lo devuelve al Login
            );
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScreenLayout>
            {/* Logo de la aplicación */}
            <Logo className="mt-10 mb-8" />

            {/* Mensajes Instructivos */}
            <View className="mb-6">
                <Text className="text-2xl font-roboto-bold text-gray-800 text-center mb-2">
                    Recuperar Contraseña
                </Text>
                <Text className="text-gray-500 font-roboto-light text-center px-4">
                    Ingresa el correo electrónico asociado a tu cuenta y te enviaremos instrucciones.
                </Text>
            </View>

            {/* Formulario de Email */}
            <View className="space-y-4">
                <CustomInput
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    icon={<Mail size={20} color="#6B7280" />}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Contenedor de Botones de envío o volver  */}
            <View className="mt-10 space-y-4">
                {loading ? (
                    <ActivityIndicator size="large" color="#C91843" />
                ) : (
                    <CustomButton title="Enviar instrucciones" onPress={handleSendEmail} />
                )}

                <CustomButton
                    title="Volver al inicio de sesión"
                    variant="textOnly"
                    onPress={() => router.back()}
                />
            </View>
        </ScreenLayout>
    );
};

export default ForgotPassword;
