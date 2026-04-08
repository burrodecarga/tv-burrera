import { CARRERAS } from "@/constants/Values";
import { fetchRetiradosByPolla } from "@/lib/api";
import { Retirado } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import Toast from "react-native-toast-message";
import Loading from "./Loading";

export default function ListadoDeRetiradosByPolla({
  pollaID,
}: {
  pollaID: string;
}) {
  const [retirados, setRetirados] = useState<Retirado[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRetiradosByPolla = async (pollaID: string) => {
      try {
        setLoading(true);
        const res = await fetchRetiradosByPolla(pollaID);
        if (!res) {
          setRetirados([]);
        }
        setRetirados(res);
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Error en servidor",
          text2: "Intentar más tarde.",
        });
        return [];
      } finally {
        setLoading(false);
      }
    };
    getRetiradosByPolla(pollaID);
  }, [pollaID]);

  if (loading) {
    return <Loading />;
  }

  //console.log("XXXX", pollas);
  return (
    <FlatList
      data={retirados}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text>
          Retirado {CARRERAS[item.carrera!] + " Caballo N°" + item.caballo}
        </Text>
      )}
      ListEmptyComponent={<Text>No Hay Retirados</Text>}
    />
  );
}
