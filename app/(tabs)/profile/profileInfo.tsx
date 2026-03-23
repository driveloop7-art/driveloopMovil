import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import InfoCard from "../../../components/InfoCard";
import ScreenLayout from "../../../components/ScreenLayout";


export default function ProfileInfo() {
  const router = useRouter();
  return (
    <ScreenLayout paddingHorizontal={8}>
      {/*Boton Volver */}
      <View className="flex-row items-center mt-4">
        <CustomButton
          variant="textOnly"
          iconLeft={<MaterialIcons name="arrow-back" size={24} color="#111111" />}
          onPress={() => router.back()}
        />
        <View className="flex-1 items-center mr-8">
          <Text className="text-xl font-roboto-bold text-secondary">Información de perfil</Text>
        </View>
      </View>

      {/*Tarjetas de Información*/}
      <View className="flex-1 justify-center pb-12">

        {/* Nombre (Sin botón) */}
        <InfoCard
          title="Nombre"
          info="Juan Camilo"
        />
        {/* Apellido (Sin botón) */}
        <InfoCard
          title="Apellido"
          info="Gonzalez Giraldo"
        />
        {/* Teléfono (Con botón) */}
        <InfoCard
          title="Teléfono"
          info="+57 305 8191471"
          showButton={true}
          buttonTitle="MODIFICAR"
          onPressButton={() => {
            console.log("Modificar Teléfono");
            // Aquí logica para modificar
          }}
        />
        {/* Correo (Con botón y ajustando un margen adicional si lo deseas) */}
        <View className="mb-6">
          <InfoCard
            title="Correo electrónico"
            info="juanvelez@gmail.com"
            showButton={true}
            buttonTitle="MODIFICAR"
            onPressButton={() => {
              console.log("Modificar Correo");
              // Aquí logica para modificar
            }}
          />
        </View>

      </View>
    </ScreenLayout>
  );
}
