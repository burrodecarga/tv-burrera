import Carreras from "@/components/Carreras";
import ThemeTextInput from "@/components/ThemeTextInput";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { VALIDAS } from "@/constants/Values";
import { Hipodromo, Hipodromos, fetchHipodromos } from "@/lib/api";
import { MODO, TIPO } from "@/lib/types";
import { isDateValid, isTimeValid, obtenerDiaYMes } from "@/utils/date";
import { validarCarrera } from "@/utils/validador";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export type POLLA = {
  nombre: string;
  fecha: Date;
  fecha_de_cierre: Date;
  hora_de_cierre: Date;
  hipodromo?: string;
  precio?: number;
  carrera1_dist: number | null;
  carrera1_ejem: number | null;
  carrera1_hor: string | null;
  carrera2_dist: number | null;
  carrera2_ejem: number | null;
  carrera2_hor: string | null;
  carrera3_dist: number | null;
  carrera3_ejem: number | null;
  carrera3_hor: string | null;
  carrera4_dist: number | null;
  carrera4_ejem: number | null;
  carrera4_hor: string | null;
  carrera5_dist: number | null;
  carrera5_ejem: number | null;
  carrera5_hor: string | null;
  carrera6_dist: number | null;
  carrera6_ejem: number | null;
  carrera6_hor: string | null;
};
const CrearPollaSCreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState<MODO>("date");
  const [type, setType] = useState<TIPO>("FECHA_DE_POLLA");
  const [hipodromos, setHipodromos] = useState<Hipodromos>();
  const [hipodromo, setHipodromo] = useState<Hipodromo>();
  const [carrera, setCarrera] = useState("0");
  const [distancia, setDistancia] = useState("1200");
  const [ejemplares, setEjemplares] = useState("12");
  const [visible, setVisible] = useState(false);

  const [polla, setPolla] = useState<POLLA>({
    nombre: "",
    fecha: new Date(),
    fecha_de_cierre: new Date(),
    hora_de_cierre: new Date(),
    hipodromo: "",
    precio: 0,
    carrera1_dist: null,
    carrera1_ejem: null,
    carrera1_hor: null,
    carrera2_dist: null,
    carrera2_ejem: null,
    carrera2_hor: null,
    carrera3_dist: null,
    carrera3_ejem: null,
    carrera3_hor: null,
    carrera4_dist: null,
    carrera4_ejem: null,
    carrera4_hor: null,
    carrera5_dist: null,
    carrera5_ejem: null,
    carrera5_hor: null,
    carrera6_dist: null,
    carrera6_ejem: null,
    carrera6_hor: null,
  });

  const storeData = async (value: POLLA) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("newPolla", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const fv = isDateValid(polla.fecha.toString());
  const fcv = isDateValid(polla.fecha_de_cierre.toString());
  const hv = isTimeValid(polla.hora_de_cierre.toString());
  const pollaValida =
    fv &&
    fcv &&
    hv &&
    polla.hipodromo !== "" &&
    polla.precio !== undefined &&
    polla.precio > 0;
  //console.log("pollaValida", fv, fcv, hv);
  const carrera1Valida = validarCarrera(
    polla.carrera1_ejem,
    polla.carrera1_dist,
    polla.carrera1_hor,
  );
  const carrera2Valida = validarCarrera(
    polla.carrera2_ejem,
    polla.carrera2_dist,
    polla.carrera2_hor,
  );
  const carrera3Valida = validarCarrera(
    polla.carrera3_ejem,
    polla.carrera3_dist,
    polla.carrera3_hor,
  );
  const carrera4Valida = validarCarrera(
    polla.carrera4_ejem,
    polla.carrera4_dist,
    polla.carrera4_hor,
  );
  const carrera5Valida = validarCarrera(
    polla.carrera5_ejem,
    polla.carrera5_dist,
    polla.carrera5_hor,
  );
  const carrera6Valida = validarCarrera(
    polla.carrera6_ejem,
    polla.carrera6_dist,
    polla.carrera6_hor,
  );

  const updateCarrera = (date: Date) => {
    switch (carrera) {
      case "1":
        setPolla({
          ...polla,
          carrera1_dist: parseInt(distancia),
          carrera1_ejem: parseInt(ejemplares),
          carrera1_hor: date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        setCarrera("0");
        setEjemplares("12");
        setDistancia("1200");
        break;
      case "2":
        setPolla({
          ...polla,
          carrera2_dist: parseInt(distancia),
          carrera2_ejem: parseInt(ejemplares),
          carrera2_hor: date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        setCarrera("0");
        setEjemplares("12");
        setDistancia("1200");
        break;
      case "3":
        setPolla({
          ...polla,
          carrera3_dist: parseInt(distancia),
          carrera3_ejem: parseInt(ejemplares),
          carrera3_hor: date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        setCarrera("0");
        setEjemplares("12");
        setDistancia("1200");
        break;
      case "4":
        setPolla({
          ...polla,
          carrera4_dist: parseInt(distancia),
          carrera4_ejem: parseInt(ejemplares),
          carrera4_hor: date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        setCarrera("0");
        setEjemplares("12");
        setDistancia("1200");
        break;
      case "5":
        setPolla({
          ...polla,
          carrera5_dist: parseInt(distancia),
          carrera5_ejem: parseInt(ejemplares),
          carrera5_hor: date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        setCarrera("0");
        setEjemplares("12");
        setDistancia("1200");
        break;
      case "6":
        setPolla({
          ...polla,
          carrera6_dist: parseInt(distancia),
          carrera6_ejem: parseInt(ejemplares),
          carrera6_hor: date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        setCarrera("0");
        setEjemplares("12");
        setDistancia("1200");
        break;

      default:
        break;
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    switch (type) {
      case "FECHA_DE_POLLA":
        const { nombreDePolla } = obtenerDiaYMes(date);
        setPolla({ ...polla, fecha: date, nombre: nombreDePolla });
        // Handle fecha de polla logic
        break;
      case "FECHA_DE_CIERRE":
        setPolla({ ...polla, fecha_de_cierre: date });
        // Handle fecha de polla logic
        break;

      case "HORA_DE_CIERRE":
        const res = date;
        setPolla({ ...polla, hora_de_cierre: new Date(res) });
        // Handle fecha de polla logic
        break;
      case "CARRERA":
        updateCarrera(date);
        break;

      default:
        break;
    }
    hideDatePicker();
  };

  const fechaPolla = () => {
    setMode("date");
    setType("FECHA_DE_POLLA");
    showDatePicker();
  };

  const fechaCierrePolla = () => {
    setMode("date");
    setType("FECHA_DE_CIERRE");
    showDatePicker();
  };

  const horaCierrePolla = () => {
    setMode("time");
    setType("HORA_DE_CIERRE");
    showDatePicker();
  };

  const handleSelecthipodromo = (itemValue: any, itemIndex: number) => {
    setPolla({ ...polla, hipodromo: itemValue });
  };

  const handleCarrera = () => {
    //console.log('LLEGUE')
    setMode("time");
    setType("CARRERA");
    showDatePicker();
    setVisible(false);
  };

  useEffect(() => {
    const getHipodromos = async () => {
      const data = await fetchHipodromos();
      setHipodromos(data);
    };
    getHipodromos();
  }, []);

  //const { diaSemana, mes, diaNumero } = obtenerDiaYMes(new Date());
  //console.log(diaSemana, diaNumero, mes)
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingBottom: 20,
          }}
        >
          <Card
            style={{
              width: "90%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 2,
              display: polla.nombre.length > 0 ? "flex" : "none",
              flexDirection: "column",
              padding: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: 700 }} disabled>
              {polla.nombre}
            </Text>
            <Text style={{ fontSize: 9 }}>Hipódromo:{polla.hipodromo}</Text>
            <Text style={{ fontSize: 9 }}>
              Fecha de Polla : {polla.fecha.toLocaleDateString()}
            </Text>
            <Text style={{ fontSize: 9 }}>
              Fecha de Cierre de la Polla :{" "}
              {polla.fecha_de_cierre.toLocaleDateString()}
            </Text>
            <Text style={{ fontSize: 9 }}>
              Hora de Cierre de la Polla :{" "}
              {polla.hora_de_cierre?.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
            <Text style={{ fontSize: 10 }}>
              Precio de la Polla : {polla.precio?.toFixed(0)} fichas
            </Text>
          </Card>
          <View style={{ borderWidth: 1, borderRadius: 8, width: "90%" }}>
            <Picker
              selectedValue={hipodromo}
              onValueChange={(itemValue, itemIndex) =>
                handleSelecthipodromo(itemValue, itemIndex)
              }
            >
              <Picker.Item
                label="Seleccionar hipodromo"
                value={0}
                style={{ fontSize: 13 }}
              />
              {hipodromos &&
                hipodromos.map((p) => (
                  <Picker.Item
                    label={p.name as string}
                    value={p.name}
                    style={{ fontSize: 14 }}
                  />
                ))}
            </Picker>
          </View>
          <View style={{ width: "90%", flexDirection: "column", gap: 20 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                flex: 1,
                alignItems: "center",
                width: "80%",
                justifyContent: "space-between",
              }}
            >
              <ThemeTextInput
                keyboardType="numeric"
                placeholder="Precio de la polla"
                style={{}}
                icon="logo-usd"
                value={polla.precio?.toString()}
                onChangeText={(text) =>
                  setPolla({ ...polla, precio: parseFloat(text) || 0 })
                }
              />
              <Text style={{ fontSize: 10, wordWrap: "true" }}> Precio</Text>
            </View>
            <Button title="Fecha de la Polla" onPress={fechaPolla} />
            <Button
              title="Fecha de cierre de Polla"
              onPress={fechaCierrePolla}
            />
            <Button title="Hora de cierre de Polla" onPress={horaCierrePolla} />
            <View style={{ display: visible ? "flex" : "none" }}>
              <Text style={{ textAlign: "center", fontWeight: "700" }}>
                {VALIDAS[Number(carrera)]}
              </Text>
              <Card
                style={{
                  flex: 1,
                  flexDirection: "row",
                  gap: 3,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 0,
                  width: "100%",
                  margin: "auto",
                  backgroundColor: "#c37373",
                  padding: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <ThemeTextInput
                    keyboardType="numeric"
                    placeholder="Dist. de carrera"
                    value={distancia}
                    onChangeText={(text) => setDistancia(text)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemeTextInput
                    keyboardType="numeric"
                    placeholder="Ejemplares"
                    value={ejemplares}
                    onChangeText={(text) => setEjemplares(text)}
                  />
                </View>
              </Card>
              <Button
                disabled={
                  ejemplares === "0" ||
                  distancia === "0" ||
                  ejemplares.length === 0 ||
                  distancia.length === 0
                }
                title="Hora de Carrera"
                onPress={() => {
                  if (
                    ejemplares === "0" ||
                    distancia === "0" ||
                    ejemplares.length === 0 ||
                    distancia.length === 0
                  )
                    return;
                  handleCarrera();
                }}
              />
            </View>
            <View
              style={{
                padding: 4,
                borderWidth: 0.5,
                borderRadius: 8,
                width: "100%",
              }}
            >
              <Carreras values={polla} />
            </View>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                width: "100%",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <Button
                title="1ra"
                onPress={() => {
                  setCarrera("1");
                  setVisible(true);
                }}
              />
              <Button
                title="2da"
                onPress={() => {
                  setCarrera("2");
                  setVisible(true);
                }}
              />
              <Button
                title="3ra"
                onPress={() => {
                  setCarrera("3");
                  setVisible(true);
                }}
              />
            </View>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                width: "100%",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <Button
                title="4ta"
                onPress={() => {
                  setCarrera("4");
                  setVisible(true);
                }}
              />
              <Button
                title="5ta"
                onPress={() => {
                  setCarrera("5");
                  setVisible(true);
                }}
              />
              <Button
                title="6ta"
                onPress={() => {
                  setCarrera("6");
                  setVisible(true);
                }}
              />
            </View>
          </View>

          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode={mode}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
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
              onPress={() => router.push("/(tabs)/admin")}
              icon={
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={24}
                  color="white"
                />
              }
            />

            <Button
              title="Crear Polla"
              icon={
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={24}
                  color="white"
                />
              }
              onPress={() => {
                if (!pollaValida) {
                  Toast.show({
                    type: "error",
                    text1: "Polla no válida",
                    text2:
                      "Por favor, completa todos los campos correctamente.",
                  });
                  return;
                }
                // console.log(
                //   "CARRERAS",
                //   carrera1Valida,
                //   carrera2Valida,
                //   carrera3Valida,
                //   carrera4Valida,
                //   carrera5Valida,
                //   carrera6Valida,
                // );
                if (
                  !carrera1Valida ||
                  !carrera2Valida ||
                  !carrera3Valida ||
                  !carrera4Valida ||
                  !carrera5Valida ||
                  !carrera6Valida
                ) {
                  Toast.show({
                    type: "error",
                    text1: "Hay carrera que no es válida",
                    text2:
                      "Por favor, completa todos los campos correctamente.",
                  });
                  return;
                }
                storeData(polla);
                console.log("llegue");
                router.replace("/(tabs)/admin/confirmar-polla");
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CrearPollaSCreen;
