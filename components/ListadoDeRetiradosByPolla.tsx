import { VALIDAS } from "@/constants/Values";
import { TypeFetchRetiradosByPollaId } from "@/lib/api_pollas";
import React from "react";
import { FlatList, Text } from "react-native";
import { ThemedText } from "./themed-text";
import Card from "./ui/Card";
import { ThemedView } from "./ui/ThemedView";

export default function ListadoDeRetiradosByPolla({
  retirados,
}: {
  retirados: TypeFetchRetiradosByPollaId|undefined;
}) {
  //console.log("LISTADO DE RETIRADOS", retirados);

  return (
  
  
      <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{}}
      style={{margin:'auto', }}
        data={retirados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{}}>
          <ThemedText style={{marginHorizontal:5}}>
            {VALIDAS[item["carrera"]!] + ", ejemplar N°" + item["caballo"]}
          </ThemedText>
          </Card>
        )}
        ListEmptyComponent={
          <Card>
          <ThemedView style={{}}>
            <Text>No Hay Retirados</Text>
          </ThemedView>
          </Card>
        }
      />
   
  );
}
