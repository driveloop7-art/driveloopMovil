import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { registerUser } from '../../api/services/authService';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Logo from '../../components/Logo';
import PasswordRulesModal from '../../components/PasswordRulesModal';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import ScreenLayout from '../../components/ScreenLayout';
import { usePasswordMeter } from '../../components/usePasswordMeter';

const Register = () => {
    const router = useRouter();

    // Estados para capturar los valores de cada campo del formulario
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Estado para el checkbox de términos y condiciones
    const [accepted, setAccepted] = useState(false);

    // Estado para controlar el indicador de carga durante el registro
    const [loading, setLoading] = useState(false);

    // Estado para controlar la visibilidad del modal de reglas
    const [rulesModalVisible, setRulesModalVisible] = useState(false);

    // Hook de validación de contraseña (mismas reglas que el backend Laravel)
    const { conditions, strength, allConditionsMet } = usePasswordMeter(password);

    /**
     * Función principal que procesa el registro al presionar el botón
     */
    const handleRegister = async () => {
        // Validación 1: Campos obligatorios no vacíos
        if (!name || !lastName || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        // Validación 2: Contraseña debe cumplir todas las condiciones de seguridad
        if (!allConditionsMet) {
            Alert.alert('Error', 'La contraseña no cumple con todos los requisitos de seguridad');
            return;
        }

        // Validación 3: Ambas contraseñas deben ser idénticas
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        // Validación 4: El usuario debe aceptar los términos legales
        if (!accepted) {
            Alert.alert('Error', 'Debes aceptar los términos y condiciones');
            return;
        }

        // Activamos la pantalla de carga (desactiva el botón y muestra el spinner)
        setLoading(true);

        try {
            // Preparamos el objeto con los nombres de campos exactamente como los espera Laravel
            const userData = {
                name: name,
                last_name: lastName,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            };

            // Llamada al servicio de autenticación para realizar la petición a la API
            await registerUser(userData);

            // Si el código llega aquí, el registro fue exitoso
            Alert.alert('Éxito', 'Registro completado correctamente', [
                {
                    text: 'OK',
                    // Al ser exitoso, redirigimos a la pantalla de verificación de correo
                    onPress: () => router.replace('/(auth)/verifyEmail' as any)
                }
            ]);
        } catch (error: any) {
            // Capturamos cualquier error de validación (ej. email ya existe) y lo mostramos en una alerta
            Alert.alert('Error de Registro', error.message || 'No se pudo completar el registro');
        } finally {
            // Desactivamos la carga sin importar si la petición falló o tuvo éxito
            setLoading(false);
        }
    };


    return (
        <ScreenLayout>
            {/* Header con botón Volver */}
            <View className="flex-row items-center mt-4">
                <CustomButton
                    variant="textOnly"
                    iconLeft={<MaterialIcons name="arrow-back" size={24} color="#111111" />}
                    onPress={() => router.back()}
                />
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Registro</Text>
                </View>
            </View>

            {/* Logo */}
            <Logo className="mt-6 mb-8" />

            {/* Formulario */}
            <View className="space-y-4">
                <CustomInput
                    placeholder="Nombre"
                    value={name}
                    onChangeText={setName}
                    icon={<MaterialIcons name="person-outline" size={20} color="#6B7280" />}
                />

                <CustomInput
                    placeholder="Apellido"
                    value={lastName}
                    onChangeText={setLastName}
                    icon={<MaterialIcons name="person-outline" size={20} color="#6B7280" />}
                />

                <CustomInput
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    icon={<MaterialIcons name="mail-outline" size={20} color="#6B7280" />}
                />

                {/* Contraseña con botón de info para abrir modal de reglas */}
                <View>
                    <View className="flex-row items-center">
                        <View className="flex-1">
                            <CustomInput
                                placeholder="Contraseña"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                icon={<MaterialIcons name="lock-outline" size={20} color="#6B7280" />}
                            />
                        </View>
                        <Pressable
                            onPress={() => setRulesModalVisible(true)}
                            className="ml-2 mb-4"
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 14,
                                backgroundColor: '#C9184318',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Ionicons name="shield-checkmark-outline" size={15} color="#C91843" />
                        </Pressable>
                    </View>

                    {/* Medidor de fuerza debajo del input */}
                    <PasswordStrengthMeter strength={strength} />
                </View>

                <CustomInput
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    icon={<MaterialIcons name="lock-outline" size={20} color="#6B7280" />}
                />

                {/* Términos y Condiciones */}
                <View className="flex-row items-center mt-4">
                    <CustomButton
                        variant="textOnly"
                        iconLeft={<MaterialCommunityIcons name={accepted ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={accepted ? "#C91843" : "#6B7280"} />}
                        onPress={() => setAccepted(!accepted)}
                    />
                    <Text className="ml-3 text-gray-500 text-sm font-roboto-light">
                        Acepto los <Link href="https://driveloop.ddns.net/terminos.pdf"className="text-blue-400">términos y condiciones</Link>
                    </Text>
                </View>
            </View>

            {/* Botón de Registro */}
            <View className="mt-10 mb-8">
                {loading ? (
                    <ActivityIndicator size="large" color="#C91843" />
                ) : (
                    <CustomButton
                        title="Registrarse"
                        onPress={handleRegister}
                        disabled={!allConditionsMet || !accepted}
                        style={{ opacity: (!allConditionsMet || !accepted) ? 0.5 : 1 }}
                    />
                )}
            </View>

            {/* Modal de reglas de contraseña */}
            <PasswordRulesModal
                visible={rulesModalVisible}
                onClose={() => setRulesModalVisible(false)}
                conditions={conditions}
            />
        </ScreenLayout>
    );
};

export default Register;

