import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
//pressable
interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
}

const CustomButton = ({ title, ...props }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            className="bg-primary rounded-full py-4 items-center shadow-md active:opacity-80"
            {...props}
        >
            <Text className="text-white text-lg font-roboto-bold">{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

// Recomendacion: Stack navigator con un Tab navigator dentro de la pantalla de inicio  