import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
    icon?: React.ReactNode;
}

const CustomInput = ({ icon, secureTextEntry, ...props }: CustomInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isSecure = secureTextEntry ?? false;

    return (
        <View className="flex-row items-center border-b border-gray-300 py-2 mb-4">
            {icon && <View className="mr-3">{icon}</View>}
            <TextInput
                className="flex-1 text-base font-roboto-light text-secondary"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={isSecure && !isPasswordVisible}
                {...props}
            />
            {isSecure && (
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="p-1 ml-2">
                    <Ionicons
                        name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#C91843"
                        style={{ opacity: 0.5 }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CustomInput;
