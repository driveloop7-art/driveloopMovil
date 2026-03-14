import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomButton";

export default function ProfileInfo() {
  return (
    <ScrollView className="flex-1 px-5 pt-10">
      <View className="flex-row  justify-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-0"
        >
          <Image
            source={require("../assets/images/icon-regre.png")}
            style={{ width: 60, height: 30 }}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-roboto-bold text-center mb-8">
          Información de perfil
        </Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="mt-24 border border-red-500 rounded-xl p-4 mb-4 bg-white">
          <Text className="text-center font-roboto-bold mb-1">Nombre</Text>
          <Text className="text-center text-gray-700">Juan Camilo</Text>
        </View>

        <View className="border border-red-500 rounded-xl p-4 mb-4 bg-white">
          <Text className="text-center font-roboto-bold mb-1">Apellido</Text>
          <Text className="text-center text-gray-700">Gonzalez Giraldo</Text>
        </View>

        <View className="mt-14 border border-red-500 rounded-xl p-4 mb-4 bg-white">
          <Text className="text-center font-roboto-bold mb-2">Teléfono</Text>
          <Text className="text-center text-gray-700 mb-3">
            +57 305 8191471
          </Text>

          <View className="border-t border-gray-300 pt-3">
            <CustomButton title="MODIFICAR" />
          </View>
        </View>

        <View className="border border-red-500 rounded-xl p-4 mb-10 bg-white">
          <Text className="text-center font-roboto-bold mb-2">
            Correo electrónico
          </Text>

          <Text className="text-center text-gray-700 mb-3">
            juanvelez@gmail.com
          </Text>

          <View className="border-t border-gray-300 pt-3">
            <CustomButton title="MODIFICAR" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
