import Loading from "@/components/Loading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { addPolla } from "@/lib/api";
import { POLLA } from "@/lib/types";
import { getFecha, getHora } from "@/utils/date";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

const PageModal = () => {
  const [polla, setPolla] = React.useState<POLLA | null>(null);
  const [loading, setLoading] = useState(false);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log("Done.");
  };

  const confirmarPolla = async (polla: POLLA) => {
    const newPolla: any = {
      ...polla,
      nombre: polla.nombre,
      hipodromo: polla.hipodromo,
      fecha: polla.fecha,
      fecha_de_cierre: polla.fecha_de_cierre,
      hora_de_cierre: getHora(polla.hora_de_cierre!.toString()),
      precio: polla.precio,
    };
    const res = await addPolla(newPolla as any);
    //console.log(JSON.stringify(polla, null, 2));
    // const hora = new Date(polla.hora_de_cierre!);
    // console.log(polla.hora_de_cierre, hora.getMinutes());
    // console.log(hora.getHours());
    clearAll();
    router.replace("/(tabs)/admin/pollas-borrador");
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("newPolla");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    setLoading(true);
    const getNewPolla = async () => {
      try {
        const res = await getData();
        if (!res) {
          Toast.show({
            type: "error",
            text1: "Polla no válida",
            text2: "Se redirigirá al Menú de polla.",
          });
          router.replace("/(tabs)/admin");
        }
        if (res) {
          setPolla(res);
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Polla no válida",
          text2: "Se redirigirá a Creación de polla.",
        });
        router.replace("/(tabs)/admin/crear-polla");
      } finally {
        setLoading(false);
      }
    };
    getNewPolla();
  }, []);

  if (loading) {
    return <Loading />;
  }

  //console.log(polla?.nombre)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Card
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 12,
          flexDirection: "column",
          padding: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 10, fontWeight: 700 }} disabled>
          {polla?.nombre}
        </Text>
        <Text style={{ fontSize: 9 }}>Hipódromo:{polla?.hipodromo}</Text>
        <Text style={{ fontSize: 9 }}>
          Fecha de Polla :{" "}
          {polla?.fecha ? getFecha(polla.fecha.toString()) : ""}
        </Text>
        <Text style={{ fontSize: 9 }}>
          Fecha de cierre:{" "}
          {polla?.fecha_de_cierre
            ? getFecha(polla.fecha_de_cierre.toString())
            : ""}
        </Text>
        <Text style={{ fontSize: 9 }}>
          Hora de cierre:{" "}
          {polla?.hora_de_cierre
            ? getFecha(polla.hora_de_cierre.toString())
            : ""}
        </Text>
        <Text style={{ fontSize: 10 }}>
          Precio de la Polla : {polla?.precio?.toFixed(0)} fichas
        </Text>
      </Card>
      <Card
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 12,
          flexDirection: "column",
          padding: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: 700 }} disabled>
          CARRERAS
        </Text>
        <Text style={{ fontSize: 8 }} disabled>
          1ra Carrera, distancia: {polla?.carrera1_dist} mts, hora:{" "}
          {polla?.carrera1_hor} {polla?.carrera1_ejem} ejemplares{" "}
        </Text>
        <Text style={{ fontSize: 8 }}>
          2da Carrera, distancia: {polla?.carrera2_dist} mts, hora:{" "}
          {polla?.carrera2_hor} {polla?.carrera2_ejem} ejemplares{" "}
        </Text>
        <Text style={{ fontSize: 8 }}>
          3ra Carrera, distancia: {polla?.carrera3_dist} mts, hora:{" "}
          {polla?.carrera3_hor} {polla?.carrera3_ejem} ejemplares{" "}
        </Text>
        <Text style={{ fontSize: 8 }}>
          4ta Carrera, distancia: {polla?.carrera4_dist} mts, hora:{" "}
          {polla?.carrera4_hor} {polla?.carrera4_ejem} ejemplares{" "}
        </Text>
        <Text style={{ fontSize: 8 }}>
          5ta Carrera, distancia: {polla?.carrera5_dist} mts, hora:{" "}
          {polla?.carrera5_hor} {polla?.carrera5_ejem} ejemplares{" "}
        </Text>
        <Text style={{ fontSize: 8 }}>
          6ta Carrera, distancia: {polla?.carrera6_dist} mts, hora:{" "}
          {polla?.carrera6_hor} {polla?.carrera6_ejem} ejemplares{" "}
        </Text>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Button
          title="Regresar"
          size="small"
          onPress={() => router.push("/(tabs)/admin/crear-polla")}
          icon={
            <Ionicons
              name="arrow-back-circle-outline"
              size={24}
              color="white"
            />
          }
        />
        <Button
          size="small"
          title="Confirmar"
          onPress={() => confirmarPolla(polla!)}
          icon={
            <Ionicons
              name="checkmark-done-circle-outline"
              size={24}
              color="white"
            />
          }
        />
      </View>
    </View>
  );
};

export default PageModal;
