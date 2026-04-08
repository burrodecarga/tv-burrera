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
          style={{ width: 190 }}
        >
          Crear Polla
        </ThemedButton>
        <ThemedButton
          onPress={() => {
            router.replace("/(tabs)/admin/confirmar-polla");
          }}
          icon="checkmark-circle-outline"
          style={{ width: 190 }}
        >
          Confirmar Polla
        </ThemedButton>
      </View>
    </SafeAreaView>
  );
};

export default AdminScreen;
