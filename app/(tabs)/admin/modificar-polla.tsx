import ListadoDePollas from "@/components/ListadoDePollas";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ModificarPollaScreen = () => {
  return <SafeAreaView style={{ flex: 1 }}>
    <ListadoDePollas condicion={0}/>
  </SafeAreaView>;
};

export default ModificarPollaScreen;
