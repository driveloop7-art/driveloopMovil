<<<<<<< main
import * as WebBrowser from 'expo-web-browser'; // Permite abrir web internamente
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Simulación de tu Base de Datos o API conectada a tu plataforma Web
const recommendedCars = [
  {
    id: 1,
    name: 'Tesla Model 3 - 2023',
    price: '$150,000 COP / día',
    rating: '⭐ 4.9',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop',
    url: 'https://google.com' // Aquí pondrás la URL del alquiler real de tu web
  },
  {
    id: 2,
    name: 'Jeep Wrangler Rubicon',
    price: '$200,000 COP / día',
    rating: '⭐ 5.0',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop',
    url: 'https://google.com'
  },
];

export default function Dashboard() {

  // Función que se encarga de abrir la Web dentro de la app
  const openCarUrl = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>

        {/* Header Atractivo */}
        <View className="mb-6">
          <Text className="text-3xl font-roboto-bold text-secondary">
            Descubre tu
          </Text>
          <Text className="text-4xl font-roboto-bold text-primary mt-1">
            próximo viaje
          </Text>
          <Text className="text-gray-500 mt-2 font-roboto-light">
            Los autos mejor calificados de Driveloop.
          </Text>
        </View>

        {/* Vitrina de Autos */}
        {/* El pd-28 (padding bottom) es vital para que la isla flotante no tape el último auto */}
        <View className="pb-28">
          {recommendedCars.map((car) => (
            <TouchableOpacity
              key={car.id}
              activeOpacity={0.9}
              onPress={() => openCarUrl(car.url)}
              className="bg-white rounded-[28px] mb-6 border border-gray-100 overflow-hidden shadow-sm"
              style={{ elevation: 3 }} // Le da una ligera sombra al auto en Android
            >
              {/* Imagen del Auto */}
              <Image
                source={{ uri: car.image }}
                className="w-full h-48 bg-gray-200"
                resizeMode="cover"
              />

              {/* Info de la tarjeta */}
              <View className="p-5">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-lg font-roboto-bold text-secondary">
                    {car.name}
                  </Text>
                  <Text className="text-sm font-roboto-medium text-gray-500">
                    {car.rating}
                  </Text>
                </View>

                <Text className="text-primary font-roboto-bold text-xl mt-1">
                  {car.price}
                </Text>

                {/* Botón Falso que incentiva a abrir la web */}
                <View className="bg-primary/10 rounded-2xl mt-4 py-3 items-center">
                  <Text className="text-primary font-roboto-bold text-sm">
                    Ver disponibilidad y Alquilar
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
=======
import { router } from "expo-router";
import { FileText, User } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import Logo from "../../components/Logo";
import MenuCard from "../../components/MenuCard";
import ScreenLayout from "../../components/ScreenLayout";

const Dashboard = () => {
  return (
    <ScreenLayout paddingHorizontal={4}>
      <Logo className="mt-8 mb-12" />

      {/* Opciones del menú */}
      <View className="space-y-4">
        <View className="flex-row">
          <MenuCard
            title="Configuración de cuenta"
            Icon={User}
            onPress={() => router.push('/accountSettings' as any)}
          />
        </View>

        <View className="flex-row">
          <MenuCard
            title="Documentos"
            Icon={FileText}
            onPress={() => router.push('/documents' as any)}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default Dashboard;
>>>>>>> main
