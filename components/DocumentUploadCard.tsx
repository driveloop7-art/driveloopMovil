import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

interface DocumentUploadCardProps {
    label: string; // Ej: "Licencia de Conducción"
    // Esta función le avisará a la pantalla padre cuando las fotos estén listas para enviarse al servidor
    onImagesSelected?: (frontUri: string | null, backUri: string | null) => void;
}

const DocumentUploadCard = ({ label, onImagesSelected }: DocumentUploadCardProps) => {
    // Aquí guardamos temporalmente la URL de la foto que acaba de tomar la cámara
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);

    // Lógica para abrir la cámara nativa
    const openCamera = async (side: 'front' | 'back') => {
        // 1. Pedir permisos de cámara (Obligatorio en iOS y Android)
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Driveloop necesita usar tu cámara para validar el documento.');
            return;
        }

        // 2. Lanzar la cámara
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.1, // Calidad mínima para evitar el límite de 2MB de PHP
            allowsEditing: true, // Permite al usuario recortar solo el documento
        });

        // 3. Si tomó la foto y no canceló...
        if (!result.canceled) {
            const uri = result.assets[0].uri;

            // Guardamos la foto en el lado correspondiente
            if (side === 'front') {
                setFrontImage(uri);
            } else {
                setBackImage(uri);
            }

            // Le avisamos al componente padre (si requiere enviar a Laravel luego)
            if (onImagesSelected) {
                onImagesSelected(side === 'front' ? uri : frontImage, side === 'back' ? uri : backImage);
            }
        }
    };

    return (
        <View className="mb-8">
            <Text className="text-secondary font-roboto-bold mb-3 text-base">{label}</Text>

            {/* Contenedor de las dos miniaturas */}
            <View className="flex-row justify-between" style={{ gap: 12 }}>

                {/* 1. Botón / Miniatura del Anverso */}
                <TouchableOpacity
                    onPress={() => openCamera('front')}
                    activeOpacity={0.8}
                    className="flex-1 bg-white border-2 border-dashed border-primary/40 rounded-2xl h-32 items-center justify-center overflow-hidden"
                >
                    {frontImage ? (
                        // Si ya tomó la foto, mostramos la miniatura cubriendo toda la caja
                        <Image source={{ uri: frontImage }} className="w-full h-full" resizeMode="cover" />
                    ) : (
                        // Si está vacío, mostramos el botón de cámara
                        <View className="items-center">
                            <Camera size={32} color="#C91843" />
                            <Text className="text-gray-400 font-roboto-medium text-xs mt-2">Tomar Anverso</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* 2. Botón / Miniatura del Reverso */}
                <TouchableOpacity
                    onPress={() => openCamera('back')}
                    activeOpacity={0.8}
                    className="flex-1 bg-white border-2 border-dashed border-primary/40 rounded-2xl h-32 items-center justify-center overflow-hidden"
                >
                    {backImage ? (
                        <Image source={{ uri: backImage }} className="w-full h-full" resizeMode="cover" />
                    ) : (
                        <View className="items-center">
                            <Camera size={32} color="#C91843" />
                            <Text className="text-gray-400 font-roboto-medium text-xs mt-2">Tomar Reverso</Text>
                        </View>
                    )}
                </TouchableOpacity>

            </View>

            {/* Mensaje de ayuda dinámico */}
            {(frontImage || backImage) && (
                <Text className="text-xs text-gray-500 mt-3 text-center">
                    Toca la imagen si necesitas volver a tomarla
                </Text>
            )}
        </View>
    );
};

export default DocumentUploadCard;
