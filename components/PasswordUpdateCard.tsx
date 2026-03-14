import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PasswordUpdateCardProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
}

const PasswordUpdateCard = ({ label, value, onChangeText }: PasswordUpdateCardProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View className="border border-primary/40 rounded-xl p-4 mb-4 bg-white">
            <Text className="text-secondary font-roboto-bold mb-2 text-sm">{label}</Text>

            <View className="flex-row items-center border-b border-primary/40 pb-1 mt-2">
                <TextInput
                    className="flex-1 text-base font-roboto-light text-secondary"
                    secureTextEntry={!isPasswordVisible}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="p-1">
                    <Ionicons 
                        name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                        size={20} 
                        color="#C91843" 
                        style={{ opacity: 0.5 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PasswordUpdateCard;
