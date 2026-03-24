import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';

interface DocumentUploadCardProps {
    label: string;
    onPressUpload: () => void;
    selectedFileName?: string;
}

const DocumentUploadCard = ({ label, onPressUpload, selectedFileName }: DocumentUploadCardProps) => {
    return (
        <View className="border border-primary/40 rounded-xl p-4 mb-4 bg-white">
            <Text className="text-secondary font-roboto-bold mb-3 text-sm">{label}</Text>

            <CustomButton
                title={selectedFileName ? 'CAMBIAR ARCHIVO' : 'SELECCIONAR ARCHIVO'}
                onPress={onPressUpload}
                style={{ borderRadius: 12 }}
                textClassName="text-white text-xs font-roboto-bold"
            />

            {selectedFileName && (
                <Text className="text-gray-500 text-xs mt-2 text-center" numberOfLines={1}>
                    {selectedFileName}
                </Text>
            )}
        </View>
    );
};

export default DocumentUploadCard;
