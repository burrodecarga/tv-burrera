import ListadoDePollas from "@/components/ListadoDePollas";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const GanadoresDePolla = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ListadoDePollas condicion={1} />
    </SafeAreaView>
  );
};

export default GanadoresDePolla;
