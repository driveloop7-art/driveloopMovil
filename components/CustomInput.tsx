import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
    icon?: React.ReactNode;
}

const CustomInput = ({ icon, ...props }: CustomInputProps) => {
    return (
        <View className="flex-row items-center border-b border-gray-300 py-2 mb-4">
            {icon && <View className="mr-3">{icon}</View>}
            <TextInput
                className="flex-1 text-base font-roboto-light text-secondary"
                placeholderTextColor="#9CA3AF"
                {...props}
            />
        </View>
    );
};

export default CustomInput;
