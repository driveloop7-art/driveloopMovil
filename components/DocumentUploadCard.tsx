import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DocumentUploadCardProps {
    label: string;
    onPressUpload: () => void;
    selectedFileName?: string;
}

const DocumentUploadCard = ({ label, onPressUpload, selectedFileName }: DocumentUploadCardProps) => {
    return (
        <View className="border border-primary/40 rounded-xl p-4 mb-4 bg-white">
            <Text className="text-secondary font-roboto-bold mb-3 text-sm">{label}</Text>

            <TouchableOpacity
                onPress={onPressUpload}
                className="bg-primary rounded-lg py-3 items-center active:opacity-80"
            >
                <Text className="text-white text-sm font-roboto-bold">
                    {selectedFileName ? 'CAMBIAR ARCHIVO' : 'SELECCIONAR ARCHIVO'}
                </Text>
            </TouchableOpacity>

            {selectedFileName && (
                <Text className="text-gray-500 text-xs mt-2 text-center" numberOfLines={1}>
                    {selectedFileName}
                </Text>
            )}
        </View>
    );
};

export default DocumentUploadCard;
