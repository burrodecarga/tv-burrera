import { useUserInfo } from "@/hooks/userContext";
import { Stack } from "expo-router";
import React from "react";
import Feather from '@expo/vector-icons/Feather';

const PasosLayout = () => {
  const { isAdmin } = useUserInfo();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Configuración de Pollas",
        headerTitleStyle: { fontWeight: "bold", fontSize: 13 },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Menú Principal de Polla",
          headerTitleStyle: { fontWeight: "bold", fontSize: 13 },
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="crear-polla"
        options={{
          headerShown: true,
          title: "Creación de Polla",
          headerTitleStyle: { fontWeight: "bold", fontSize: 13 },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="confirmar-polla"
        options={{
          headerShown: true,
          title: "Confirmación de Polla",
          headerTitleStyle: { fontWeight: "bold", fontSize: 13 },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="modificar-polla"
        options={{
          headerShown: true,
          title: "Configuración de Polla",
          headerTitleStyle: { fontWeight: "bold", fontSize: 13 },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="pollas-borrador"
        options={{
          headerShown: true,
          title: "Listado de Pollas BORRADOR",
          headerTitleStyle: { fontWeight: "bold", fontSize: 13 },
          headerTitleAlign: "center",
          
        }}
      />
      <Stack.Screen
        name="pollas-ganadores"
        options={{
          headerShown: true,
          title: "Ganadores de Pollas",
          headerTitleStyle: { fontWeight: "bold", fontSize: 13 },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="listado-de-pollas"
        options={{
          headerShown: true,
          title: "Listado  de Pollas",
          headerTitleStyle: { fontWeight: "bold", fontSize: 13 },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="add-retirados"
        options={{
          headerShown: true,
          title: "Configurar Retirados",
          headerTitleStyle: { fontWeight: "bold", fontSize: 13 },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default PasosLayout;
