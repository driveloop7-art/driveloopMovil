import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { PasswordConditions } from './usePasswordMeter';

interface PasswordRulesModalProps {
    visible: boolean;
    onClose: () => void;
    conditions: PasswordConditions;
}

interface RuleItemProps {
    label: string;
    met: boolean;
}

const RuleItem = ({ label, met }: RuleItemProps) => (
    <View className="flex-row items-center py-2.5" style={{ gap: 12 }}>
        <View
            className="rounded-full items-center justify-center"
            style={{
                width: 24,
                height: 24,
                backgroundColor: met ? '#22C55E' : '#E5E7EB',
            }}
        >
            <Ionicons
                name={met ? 'checkmark' : 'close'}
                size={14}
                color={met ? '#FFFFFF' : '#9CA3AF'}
            />
        </View>
        <Text
            className="flex-1"
            style={{
                fontSize: 14,
                fontFamily: met ? 'Roboto-Medium' : 'Roboto-Light',
                color: met ? '#22C55E' : '#6B7280',
            }}
        >
            {label}
        </Text>
    </View>
);

/**
 * Modal que muestra las condiciones que debe cumplir la contraseña.
 * Se abre con un botón de info junto al input y muestra un checklist
 * con feedback visual en tiempo real.
 */
const PasswordRulesModal = ({ visible, onClose, conditions }: PasswordRulesModalProps) => {
    const metCount = Object.values(conditions).filter(Boolean).length;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                className="flex-1 justify-center items-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                onPress={onClose}
            >
                <Pressable
                    className="bg-white rounded-2xl mx-6"
                    style={{
                        width: '85%',
                        maxWidth: 360,
                        paddingHorizontal: 24,
                        paddingTop: 24,
                        paddingBottom: 20,
                        // Sombra suave
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.15,
                        shadowRadius: 24,
                        elevation: 12,
                    }}
                    onPress={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center" style={{ gap: 10 }}>
                            <View
                                className="rounded-full items-center justify-center"
                                style={{
                                    width: 36,
                                    height: 36,
                                    backgroundColor: '#C9184318',
                                }}
                            >
                                <Ionicons name="shield-checkmark" size={18} color="#C91843" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Roboto-Bold',
                                    color: '#282828',
                                }}
                            >
                                Requisitos de contraseña
                            </Text>
                        </View>
                        <Pressable
                            onPress={onClose}
                            className="rounded-full items-center justify-center"
                            style={{
                                width: 30,
                                height: 30,
                                backgroundColor: '#F3F4F6',
                            }}
                        >
                            <Ionicons name="close" size={16} color="#6B7280" />
                        </Pressable>
                    </View>

                    {/* Progreso */}
                    <View
                        className="rounded-xl mb-4"
                        style={{
                            backgroundColor: '#F9FAFB',
                            padding: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: 'Roboto-Light',
                                color: '#6B7280',
                                marginBottom: 6,
                            }}
                        >
                            Progreso: {metCount} de 4 requisitos
                        </Text>
                        {/* Barra de progreso */}
                        <View
                            className="rounded-full overflow-hidden"
                            style={{ height: 6, backgroundColor: '#E5E7EB' }}
                        >
                            <View
                                className="rounded-full"
                                style={{
                                    height: 6,
                                    width: `${(metCount / 4) * 100}%`,
                                    backgroundColor:
                                        metCount <= 2 ? '#EF4444' :
                                        metCount === 3 ? '#F59E0B' : '#22C55E',
                                }}
                            />
                        </View>
                    </View>

                    {/* Separador */}
                    <View style={{ height: 1, backgroundColor: '#F3F4F6', marginBottom: 4 }} />

                    {/* Lista de reglas */}
                    <RuleItem label="Mínimo 8 caracteres" met={conditions.length} />
                    <RuleItem label="Al menos una letra mayúscula" met={conditions.uppercase} />
                    <RuleItem label="Al menos un número" met={conditions.number} />
                    <RuleItem label="Al menos un carácter especial (!@#$...)" met={conditions.special} />
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default PasswordRulesModal;
