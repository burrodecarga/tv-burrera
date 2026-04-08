import { fetchPollasByCond } from "@/lib/api";
import { Polla } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Toast from "react-native-toast-message";
import Loading from "./Loading";
import PollaCard from "./PollaCard";

export default function ListadoDePollas({ condicion }: { condicion: number }) {
  const [pollas, setPollas] = useState<Polla[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPollasByCondicion = async (condicion: number) => {
      try {
        setLoading(true);
        const res = await fetchPollasByCond(condicion);
        if (res) {
          setPollas(res);
        }
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
    getPollasByCondicion(condicion);
  }, [condicion]);

  if (loading) {
    return <Loading />;
  }

  //console.log("XXXX", pollas);
  return (
    <FlatList
      data={pollas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PollaCard data={item} />}
    />
  );
}
