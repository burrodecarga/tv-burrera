import ThemedButton from "@/components/ThemedButton";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ThemedButton
          onPress={() => {
            router.replace("/(tabs)/admin/crear-polla");
          }}
          icon="add-circle-outline"
        >
          Crear Polla
        </ThemedButton>
        <ThemedButton
          onPress={() => {
            router.replace("/(tabs)/admin/confirmar-polla");
          }}
          icon="checkmark-circle-outline"
        >
          Confirmar Polla
        </ThemedButton>
        <ThemedButton
          icon="list-circle-outline"
          onPress={() => router.replace("/(tabs)/admin/modificar-polla")}
          disabled={false}
        >
          Vender Pollas y Retirados
        </ThemedButton>
        <ThemedButton
          icon="newspaper-outline"
          onPress={() => router.replace("/(tabs)/admin/pollas-ganadores")}
          disabled={false}
        >
          Pollas Activas y resultados
        </ThemedButton>
        <ThemedButton
          icon="calendar-outline"
          onPress={() => router.replace("/(tabs)/admin/listado-de-pollas")}
          disabled={false}
        >
          Listado de Pollas
        </ThemedButton>
        <ThemedButton
          icon="arrow-forward-outline"
            onPress={() => router.replace("/(tabs)/admin/confirmar-polla")}
          disabled={false}
        >
          Conf Ingresar
        </ThemedButton>
      </View>
    </SafeAreaView>
  );
};

export default AdminScreen;
