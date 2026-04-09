import { CONDICION_DE_POLLA } from "@/constants/Values";
import {
  activarPollaById,
  addGanador,
  addRetirado,
  RetiradoByPollaId,
} from "@/lib/api";
import { Retirado } from "@/lib/types";
import { getFecha } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import ListadoDeGanadoresByPolla from "./ListadoDeGanadoresByPolla";
import ListadoDeRetiradosByPolla from "./ListadoDeRetiradosByPolla";
import { ThemedText } from "./themed-text";
import ThemeTextInput from "./ThemeTextInput";
import Button from "./ui/Button";
import Card from "./ui/Card";

type Props = {
  data: RetiradoByPollaId;
  actualizar: boolean;
  setActualizar: Dispatch<SetStateAction<boolean>>;
};

const PollaCard = ({ data, actualizar = false, setActualizar }: Props) => {
  const [visible, setVisible] = useState(false);
  const [ganadorV, setGanadorV] = useState(false);
  const [carrera, setCarrera] = useState("");
  const [caballo, setCaballo] = useState("");
  const [posicion, setPosicion] = useState("");
  const [loading, setLoading] = useState(false);

  const registrarCaballoGanador = async () => {
    if (!data || !carrera || !caballo || !posicion) return;
    let puntos = 0;
    if (posicion === "1") {
      puntos = 5;
    } else if (posicion === "2") {
      puntos = 3;
    } else if (posicion === "3") {
      puntos = 1;
    }
    const newGanador = {
      polla_id: data.id,
      carrera: Number(carrera),
      caballo: Number(caballo),
      posicion: Number(posicion),
      puntos: puntos,
    };

    console.log("registrando");

    try {
      const res = await addGanador(newGanador);
      console.log(res);
      setCaballo("");
      setCarrera("");
      setGanadorV(false);
      setActualizar(!actualizar);
    } catch (error) {
      console.log(error);
    }
  };

  const retirarCaballo = async () => {
    if (!data || !carrera || !caballo) return;

    const newRetirado: Omit<Retirado, "id" | "created_at"> = {
      polla_id: data.id,
      carrera: Number(carrera),
      caballo: Number(caballo),
    };
    try {
      const res = await addRetirado(newRetirado);
      //console.log(res);
      setCaballo("");
      setCarrera("");
      setVisible(false);
      setActualizar(!actualizar);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (
      carrera.length === 0 ||
      caballo.length === 0 ||
      Number(caballo) === 0 ||
      Number(carrera) === 0 ||
      Number(carrera) >= 7
    ) {
      Toast.show({
        type: "error",
        text1: "Debe seleccionar valores válidos",
      });
      setCaballo("");
      setCarrera("");
      return;
    }
    Alert.alert("Está seguro?", "Quiere retirar caballo de carrera?", [
      // The "No" button
      {
        text: "Cancelar",
        onPress: () => {
          setCaballo("");
          setCarrera("");
          setVisible(false);
        },
        style: "cancel", // On iOS, this identifies it as the 'out' action
      },
      // The "Yes" button
      {
        text: "Retirar",
        onPress: () => retirarCaballo(),
        style: "destructive", // On iOS, this turns the text red
      },
    ]);
    setVisible(false);
  };

  const handleSubmitG = () => {
    if (
      posicion.length === 0 ||
      carrera.length === 0 ||
      caballo.length === 0 ||
      Number(caballo) === 0 ||
      Number(carrera) === 0 ||
      Number(carrera) >= 7 ||
      Number(posicion) >= 4 ||
      Number(posicion) === 0
    ) {
      Toast.show({
        type: "error",
        text1: "Debe seleccionar valores válidos",
      });
      setCaballo("");
      setCarrera("");
      setPosicion("");
      return;
    }
    Alert.alert("Está seguro?", "Quiere registrar caballo ganador?", [
      // The "No" button
      {
        text: "Cancelar",
        onPress: () => {
          setCaballo("");
          setCarrera("");
          setVisible(false);
        },
        style: "cancel", // On iOS, this identifies it as the 'out' action
      },
      // The "Yes" button
      {
        text: "Registrar",
        onPress: () => registrarCaballoGanador(),
        style: "destructive", // On iOS, this turns the text red
      },
    ]);
    setGanadorV(false);
  };

  const activarPolla = async () => {
    try {
      setLoading(true);
      const res = await activarPollaById(data.id!, 1);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      router.replace("/(tabs)/admin");
    }
  };

  console.log("DATA POLLACARD", data);

  return (
    <Card
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "column",
      }}
    >
      <ThemedText style={{ fontSize: 13 }} type="title">
        {CONDICION_DE_POLLA[data?.condicion!]}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="title">
        Precio de la Polla: {data?.precio!} fichas
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        {data?.nombre}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        {data?.hipodromo}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        Fecha de Evento: {getFecha(data?.fecha!)}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        Fecha de Cierre de Apuestas: {getFecha(data?.fecha_de_cierre!)}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        Hora de Cierre de Apuestas: {data?.hora_de_cierre!}
      </ThemedText>
      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText style={{ fontSize: 13 }} type="title">
            RETIRADOS
          </ThemedText>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Ionicons name="add-circle-outline" color="black" size={32} />
          </TouchableOpacity>
        </View>
        {/* TODO: Render retirados or carreras here if available */}
        {<ListadoDeRetiradosByPolla retirados={data.retirados} />}
      </Card>
      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText style={{ fontSize: 13 }} type="title">
            GANADORES
          </ThemedText>
          <TouchableOpacity onPress={() => setGanadorV(true)}>
            <Ionicons name="add-circle-outline" color="black" size={32} />
          </TouchableOpacity>
        </View>
        {/* TODO: Render retirados or carreras here if available */}
        {<ListadoDeGanadoresByPolla ganadores={data.ganadores} />}
      </Card>
      <View style={{ marginVertical: 8, gap: 10 }}>
        {data.condicion === 0 && (
          <Button
            disabled={loading}
            title="Vender Polla"
            onPress={() => activarPolla()}
          />
        )}
        {data.condicion === 1 && (
          <Button disabled={loading} title="Cerrar Polla" onPress={() => {}} />
        )}

        <Button
          variant="secondary"
          disabled={loading}
          title="Regresar"
          onPress={() => router.replace("/(tabs)/admin")}
        />
      </View>
      <View>
        <Modal visible={visible} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View style={{ backgroundColor: "#fff", padding: 8 }}>
              <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
                {data?.nombre}
              </ThemedText>
              <ThemedText style={{ textAlign: "center" }}>
                Retiro de Ejemplar
              </ThemedText>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text>Carrera</Text>
                  <ThemeTextInput
                    keyboardType="numeric"
                    placeholder="N° de Carrera"
                    onChangeText={setCarrera} // Updates state as user types
                    value={carrera}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text>Caballo</Text>
                  <ThemeTextInput
                    keyboardType="numeric"
                    placeholder="N° de Ejemplar"
                    onChangeText={setCaballo} // Updates state as user types
                    value={caballo}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button title="Retirar Ejemplar" onPress={handleSubmit} />
                <Button title="Cancelar" onPress={() => setVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* /*ganadores*/}
      <View>
        <Modal visible={ganadorV} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View style={{ backgroundColor: "#fff", padding: 8 }}>
              <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
                {data?.nombre}
              </ThemedText>
              <ThemedText style={{ textAlign: "center" }}>
                Registrar Ganadores
              </ThemedText>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text>Carrera</Text>
                  <ThemeTextInput
                    keyboardType="numeric"
                    placeholder="N° 1,2,3.6"
                    onChangeText={setCarrera} // Updates state as user types
                    value={carrera}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text>Caballo</Text>
                  <ThemeTextInput
                    keyboardType="numeric"
                    placeholder="N° 1...24"
                    onChangeText={setCaballo} // Updates state as user types
                    value={caballo}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text>Posicion</Text>
                  <ThemeTextInput
                    keyboardType="numeric"
                    placeholder="N° 1,2,3"
                    onChangeText={setPosicion} // Updates state as user types
                    value={posicion}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button title="Registrar Resultado" onPress={handleSubmitG} />
                <Button title="Cancelar" onPress={() => setGanadorV(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Card>
  );
};

export default PollaCard;
