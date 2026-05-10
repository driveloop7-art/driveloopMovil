import React from 'react';
import { Text, View } from 'react-native';
import { PasswordStrength } from './usePasswordMeter';

interface PasswordStrengthMeterProps {
    strength: PasswordStrength;
}

/**
 * Barra visual de 3 segmentos que indica la fuerza de la contraseña.
 * - Baja: 1 segmento rojo
 * - Media: 2 segmentos naranja
 * - Alta: 3 segmentos verdes
 * Se muestra directamente debajo del input de contraseña.
 */
const PasswordStrengthMeter = ({ strength }: PasswordStrengthMeterProps) => {
    if (strength === 'none') return null;

    const getSegmentColor = (index: number): string => {
        if (strength === 'low') {
            return index === 0 ? '#EF4444' : '#E5E7EB';
        }
        if (strength === 'medium') {
            return index <= 1 ? '#F59E0B' : '#E5E7EB';
        }
        // high
        return '#22C55E';
    };

    const getLabel = (): string => {
        if (strength === 'low') return 'Baja';
        if (strength === 'medium') return 'Media';
        return 'Alta';
    };

    const getLabelColor = (): string => {
        if (strength === 'low') return '#EF4444';
        if (strength === 'medium') return '#F59E0B';
        return '#22C55E';
    };

    return (
        <View className="mt-2 mb-1 px-1">
            {/* Barra de 3 segmentos */}
            <View className="flex-row" style={{ gap: 6 }}>
                {[0, 1, 2].map((i) => (
                    <View
                        key={i}
                        className="flex-1 rounded-full"
                        style={{ height: 5, backgroundColor: getSegmentColor(i) }}
                    />
                ))}
            </View>

            {/* Etiqueta de fuerza */}
            <View className="items-end mt-1">
                <View
                    className="px-2 rounded-full"
                    style={{
                        backgroundColor: `${getLabelColor()}18`,
                        paddingVertical: 2,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 10,
                            fontFamily: 'Roboto-Bold',
                            color: getLabelColor(),
                        }}
                    >
                        Seguridad: {getLabel()}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PasswordStrengthMeter;
