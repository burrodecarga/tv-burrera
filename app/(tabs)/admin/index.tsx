import ThemedButton from "@/components/ThemedButton";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#154090" }}>
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
          icon="arrow-forward-outline"
          onPress={() => {}}
          disabled={true}
        >
          Ingresar
        </ThemedButton>
        <ThemedButton
          icon="arrow-forward-outline"
          onPress={() => {}}
          disabled={true}
        >
          Ingresar
        </ThemedButton>
      </View>
    </SafeAreaView>
  );
};

export default AdminScreen;
