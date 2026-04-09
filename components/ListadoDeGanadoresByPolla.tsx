import { CARRERAS } from "@/constants/Values";
import { Ganador } from "@/lib/types";
import React from "react";
import { FlatList, Text } from "react-native";

export default function ListadoDeGanadoresByPolla({
  ganadores,
}: {
  ganadores: Ganador[];
}) {
  console.log("LISTADO DE Ganadores", ganadores);

  return (
    <FlatList
      data={ganadores}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text>
          Ganador {CARRERAS[item["carrera"]!] + " Caballo N°" + item["caballo"]}
        </Text>
      )}
      ListEmptyComponent={<Text>No Hay Ganadores</Text>}
    />
  );
}
