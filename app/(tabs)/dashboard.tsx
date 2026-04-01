import * as WebBrowser from 'expo-web-browser'; // Permite abrir web internamente
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../api/axiosConfig';

export default function Dashboard() {
  const [recommendedCars, setRecommendedCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get('/vehicles');
        if (response.data && response.data.data) {
          setRecommendedCars(response.data.data);
        }
      } catch (error) {
        console.error("Error al obtener los vehículos recomendados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Función que se encarga de abrir la Web dentro de la app
  const openCarUrl = async (codVehiculo: string) => {
    // Al parecer tu plataforma web no tiene una ruta de 'detalle único de vehículo'
    // Por lo que lo mandaremos a la pantalla de búsqueda y reserva general.
    const url = `https://driveloop.ddns.net/busqueda-reserva`;
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 pt-6" showsVerticalScrollIndicator={false}>

        {/* Header Atractivo */}
        <View className="mb-6 px-5">
          <Text className="text-3xl font-roboto-bold text-secondary">
            Descubre tu
          </Text>
          <Text className="text-4xl font-roboto-bold text-primary mt-1">
            próximo viaje
          </Text>
          <Text className="text-gray-500 mt-2 font-roboto-light">
            Alquila fácil, rápido y seguro, elige el que más te guste.
          </Text>
        </View>

        {/* Carrusel de Autos */}
        <View className="pb-28">
          {loading ? (
            <View className="py-10 justify-center items-center">
              <ActivityIndicator size="large" color="#C91843" />
              <Text className="mt-4 text-gray-400 font-roboto-medium">Cargando autos destacados...</Text>
            </View>
          ) : recommendedCars.length === 0 ? (
            <View className="px-5 py-6">
              <Text className="text-gray-500 font-roboto-medium">No hay vehículos registrados temporalmente.</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              snapToInterval={280 + 16} // card width (280) + marginRight (16)
              decelerationRate="fast"
            >
              {recommendedCars.map((car) => (
                <TouchableOpacity
                  key={car.cod || Math.random().toString()}
                  activeOpacity={0.9}
                  onPress={() => openCarUrl(car.cod)}
                  className="bg-white rounded-2xl mr-4 border border-gray-100 shadow-sm"
                  style={{ width: 280, elevation: 3 }}
                >
                  <View className="overflow-hidden rounded-2xl">
                    {/* Imagen del Auto */}
                    <Image
                      source={{ uri: car.imagen }}
                      className="w-full h-44 bg-gray-100"
                      resizeMode="cover"
                    />

                    {/* Info de la tarjeta */}
                    <View className="p-4">
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center flex-1">
                          <Text className="font-bold text-gray-900 mr-1 text-sm">Marca:</Text>
                          <Text className="text-gray-700 uppercase text-xs flex-shrink">{car.marca}</Text>
                        </View>
                        <View className="flex-row items-center justify-end flex-1" style={{ marginLeft: 8 }}>
                          <Text className="font-bold text-gray-900 mr-1 text-sm">Modelo:</Text>
                          <Text className="text-gray-700 text-xs" numberOfLines={1}>{car.modelo}</Text>
                        </View>
                      </View>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                          <Text className="font-bold text-gray-900 mr-1 text-sm">Línea:</Text>
                          <Text className="text-gray-700 uppercase text-xs flex-shrink" numberOfLines={1}>{car.linea}</Text>
                        </View>
                        <View className="flex-row items-center justify-end flex-1" style={{ marginLeft: 8 }}>
                          <Text className="font-bold text-gray-900 mr-1 text-sm">Color:</Text>
                          <Text className="text-gray-700 text-xs" numberOfLines={1}>{car.color}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Barra inferior separada (Precio / Rentar) */}
                    <View className="flex-row mt-2">
                      <View className="bg-slate-900 px-3 py-3 flex-1 justify-center items-center">
                        <Text className="text-white font-extrabold text-sm">${car.precio_renta} / DÍA</Text>
                      </View>
                      <View className="bg-[#C91843] px-3 py-3 flex-1 justify-center items-center">
                        <Text className="text-white font-extrabold text-sm">RENTAR</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
