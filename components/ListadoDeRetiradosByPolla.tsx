import { CARRERAS } from "@/constants/Values";
import { Retirado } from "@/lib/types";
import React from "react";
import { FlatList, Text } from "react-native";

export default function ListadoDeRetiradosByPolla({
  retirados,
}: {
  retirados: Retirado[];
}) {
  console.log("LISTADO DE RETIRADOS", retirados);
  //const result = retirados.map((r) => r);

  //console.log("BBBB Result", result);
  return (
    <FlatList
      data={retirados}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text>
          Retirado{" "}
          {CARRERAS[item["carrera"]!] + " Caballo N°" + item["caballo"]}
        </Text>
      )}
      ListEmptyComponent={<Text>No Hay Retirados</Text>}
    />
  );
}
