import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, Alert, Pressable } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import PasswordUpdateCard from '../../../components/PasswordUpdateCard';
import PasswordRulesModal from '../../../components/PasswordRulesModal';
import PasswordStrengthMeter from '../../../components/PasswordStrengthMeter';
import ScreenLayout from '../../../components/ScreenLayout';
import { usePasswordMeter } from '../../../components/usePasswordMeter';
import api from '../../../api/axiosConfig';

const UpdatePassword = () => {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Estado para controlar la visibilidad del modal de reglas
    const [rulesModalVisible, setRulesModalVisible] = useState(false);

    // Hook de validación de contraseña (mismas reglas que el backend Laravel)
    const { conditions, strength, allConditionsMet } = usePasswordMeter(newPassword);

    const handleConfirm = async () => {
        // Validamos que el usuario haya llenado todos los campos antes de intentar enviar
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        // Validación de seguridad: la nueva contraseña debe cumplir todas las condiciones
        if (!allConditionsMet) {
            Alert.alert("Error", "La nueva contraseña no cumple con todos los requisitos de seguridad.");
            return;
        }

        // Verificamos que la nueva contraseña y la confirmación coincidan exactamente
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas nuevas no coinciden.");
            return;
        }

        try {
            // Activamos el indicador de carga para evitar toques dobles al botón
            setIsLoading(true);
            
            // Enviamos los datos al backend. 'api' automáticamente inyectará el token 
            // de autorización del usuario guardado en SecureStore (axiosConfig.ts).
            const response = await api.put('/update-password', {
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword
            });
            
            // Si Laravel procesa bien el cambio, mostramos un mensaje de éxito
            Alert.alert("Éxito", "La contraseña se actualizó correctamente.");
            // Limpiamos los campos
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            // Devolvemos al usuario a la pantalla anterior del perfil
            router.back();
        } catch (error: any) {
            // Si Laravel devuelve error (ej. contraseña actual inválida o error 500)
            // sacamos el mensaje que Laravel nos manda en error.response.data.message
            const errorMessage = error.response?.data?.message || "Hubo un error al actualizar la contraseña.";
            Alert.alert("Error", errorMessage);
        } finally {
            // Apagamos el estado de carga, sin importar si tuvo éxito o falló
            setIsLoading(false);
        }
    };

    return (
        <ScreenLayout withTabBar>
            <View className="flex-row items-center mt-4 mb-10">
                <CustomButton
                    variant="textOnly"
                    iconLeft={<MaterialIcons name="arrow-back" size={24} color="#111111" />}
                    onPress={() => router.back()}
                />
                <View className="flex-1 items-center mr-8">
                    <Text className="text-xl font-roboto-bold text-secondary">Actualizar contraseña</Text>
                </View>
            </View>

            <View className="flex-1 justify-between">
                <View>
                    <PasswordUpdateCard
                        label="Ingresa tu contraseña actual"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />

                    {/* Nueva contraseña con botón de info y medidor */}
                    <View>
                        <View className="flex-row items-start">
                            <View className="flex-1">
                                <PasswordUpdateCard
                                    label="Ingresa la contraseña nueva"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                />
                            </View>
                            <Pressable
                                onPress={() => setRulesModalVisible(true)}
                                className="mt-4 ml-2"
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

                        {/* Medidor de fuerza debajo del card de nueva contraseña */}
                        <View style={{ marginTop: -8 }}>
                            <PasswordStrengthMeter strength={strength} />
                        </View>
                    </View>

                    <PasswordUpdateCard
                        label="Confirmar contraseña"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <View className="mb-24 mt-6">
                    {/* Al presionar confirmación ejecutamos handleConfirm, y cuando está enviando datos mostramos un mensaje visual y desactivamos interacciones */}
                    <CustomButton
                        title={isLoading ? "ACTUALIZANDO..." : "CONFIRMAR"}
                        onPress={handleConfirm}
                        disabled={isLoading || !allConditionsMet}
                        style={{
                            borderRadius: 12,
                            opacity: (isLoading || !allConditionsMet) ? 0.5 : 1,
                        }}
                    />
                </View>
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

export default UpdatePassword;
