import Loading from "@/components/Loading";
import PollaInfo from "@/components/PollaInfo";
import { ThemedText } from "@/components/themed-text";
import ThemedButton from "@/components/ThemedButton";
import ThemeTextInput from "@/components/ThemeTextInput";
import { PollaInicial, TypePolla } from "@/constants/valores-iniciales";
import { DATOS_POLLA, VALIDAS, VALIDAS_CORTAS } from "@/constants/Values";
import { useThemeColor } from "@/hooks/use-theme-color";
import { fetchHipodromos, Hipodromo, Hipodromos } from "@/lib/api";
import { TIPO } from "@/lib/types";
import { obtenerDiaYMes } from "@/utils/date";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DatePickerExample = () => {
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState<TIPO>("FECHA_DE_POLLA");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<any | undefined>("date");
  const [polla, setPolla] = useState<TypePolla>(PollaInicial);
  const [hipodromos, setHipodromos] = useState<Hipodromos>();
  const [hipodromo, setHipodromo] = useState<Hipodromo>();
  const [carrera, setCarrera] = useState("0");
  const [distancia, setDistancia] = useState("1200");
  const [ejemplares, setEjemplares] = useState("12");
  const [verModalPrecio, setVerModalPrecio] = useState(false);
  const [verModalCarrera, setVerModalCarrera] = useState(false);

  const color = useThemeColor({}, "tint");
  const [loading, setLoading] = useState(false);

  const handleCarrera = () => {
    //console.log('LLEGUE')
    setMode("time");
    setType("CARRERA");
    showDatePicker();
    setShow(false);
  };

  const handleSelecthipodromo = (itemValue: any, itemIndex: number) => {
    setPolla({ ...polla, hipodromo: itemValue });
  };
  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
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

  const handleConfirm = (_event: any, selectedDate: any) => {
    console.log("HANDLE CONFIRM", selectedDate);
    switch (type) {
      case "FECHA_DE_POLLA":
        const { nombreDePolla } = obtenerDiaYMes(selectedDate);
        setPolla((polla) => ({
          ...polla,
          fecha: new Date(selectedDate),
          nombre: nombreDePolla,
        }));
        break;
      case "FECHA_DE_CIERRE":
        setPolla((polla) => ({
          ...polla,
          fecha_de_cierre: new Date(selectedDate),
        }));
        // Handle fecha de polla logic
        break;

      case "HORA_DE_CIERRE":
        const res = selectedDate;
        setPolla((polla) => ({
          ...polla,
          hora_de_cierre: new Date(selectedDate),
        }));
        // Handle fecha de polla logic
        break;

      default:
        break;
    }
    hideDatePicker();
  };

  const datosDePolla = (i: number) => {
    console.log(i);
    switch (i) {
      case i:
        0;
        //console.log("FECHA DE POLLA");
        setType("FECHA_DE_POLLA");
        setMode("date");
        showDatePicker();
        break;
      case i:
        1;
        setType((prev) => "FECHA_DE_CIERRE");
        setMode("date");
        showDatePicker();
        break;
      case i:
        2;
        setType((prev) => "HORA_DE_CIERRE");
        setMode("time");
        showDatePicker();
        break;

      default:
        break;
    }
  };

  // const onChange = (_event: any, selectedDate: any) => {
  //   const currentDate = selectedDate || date;
  //   //console.log(event)
  //   // On Android, the picker closes itself after selection.
  //   // On iOS, it remains visible until dismissed.
  //   setShow(Platform.OS === "ios");
  //   setDate(currentDate);
  //   //handleConfirm(currentDate)
  // };

  useEffect(() => {
    const getHipodromos = async () => {
      const data = await fetchHipodromos();
      setHipodromos(data);
    };
    getHipodromos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff",  }}>
      <ScrollView 
      style={{ flex: 1 }}>
        <PollaInfo data={polla} />
        <View style={{ padding: 20, width: "100%", backgroundColor: "#fff",}}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            CONFIGURACIÓN DE POLLA
          </Text>
          <View
            style={{
              padding: 20,
              gap: 8,
              display:verModalCarrera?'none':'contents'
            }}
          >
            <View style={{ borderWidth: 1, borderRadius: 8, marginVertical:10 }}>
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

            <View
              style={{
                flexDirection: "row",
                gap: 15,
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <ThemedButton
                style={[styles.btn_polla, { backgroundColor: color }]}
                onPress={fechaPolla}
              >
                Fecha de Polla
              </ThemedButton>
              <ThemedButton
                style={[styles.btn_polla, { backgroundColor: color }]}
                onPress={fechaCierrePolla}
              >
                Fecha de Cierre
              </ThemedButton>
              <ThemedButton
                style={[styles.btn_polla, { backgroundColor: color }]}
                onPress={horaCierrePolla}
              >
                {DATOS_POLLA[2]}
              </ThemedButton>
              <ThemedButton
                style={[styles.btn_polla, { backgroundColor: color }]}
                onPress={() => setVerModalPrecio(true)}
              >
                {DATOS_POLLA[3]}
              </ThemedButton>
            </View>
          </View>
          <Text style={{ textAlign: "center", fontWeight: "bold", marginVertical:10 }}>
            CONFIGURACIÓN DE CARRERAS
          </Text>
            {/* /*carreras*/}

        <View
          style={{
            display: verModalCarrera ? "flex" : "none" ,
            flexDirection: "column",
            borderWidth: 0.5,
            marginHorizontal: 10,
            borderColor: color,
            padding: 9,
            borderRadius: 8,
         
          }}
        >
          <View style={{ }}>
            <Text style={{ textAlign: "center", fontWeight: "700" }}>
              {VALIDAS[Number(carrera)]}
            </Text>
            <View>              
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline', gap:10}}>
                <View>
                 <Text>Distancia :</Text>
                </View>
                <View style={{flex:1}}>                  
                <ThemeTextInput
                style={{}}
                  keyboardType="numeric"
                  placeholder="Dist. de carrera"
                  value={distancia}
                  onChangeText={(text) => setDistancia(text)}
                />
                </View>
                <View>
                <Text style={{}}>mts</Text>
                </View>
              </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline', gap:10}}>
                <View>
                 <Text style={{fontSize:10}}>N° de Competidores :</Text>
                </View>
                <View style={{flex:1}}>                  
                <ThemeTextInput
                style={{}}
                  keyboardType="numeric"
                  placeholder="Ejemplares"
                  value={ejemplares}
                  onChangeText={(text) => setEjemplares(text)}
                />
                </View>
                <View>
                <Text style={{fontSize:9}}>Ejemplares</Text>
                </View>
              </View>

              </View>
              <View>              
              <View style={{flexDirection:'row', flex:1, justifyContent:'center',  alignItems:'center', }}>
                <View style={{ alignItems:'center',width:120}}>
                <ThemedButton
                  icon="time-outline"
                  disabled={
                    ejemplares === "0" ||
                    distancia === "0" ||
                    ejemplares.length === 0 ||
                    distancia.length === 0
                  }
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
                >
                  Hora
                </ThemedButton>
                </View>
                <View style={{ alignItems:'center',width:130}}>

                <ThemedButton
                  icon="log-out-outline"
                  onPress={()=>{
                    setVerModalCarrera(false)
                  }}
                >Cancelar</ThemedButton>
                </View>
              </View>
            </View>
          </View>
        </View>
          <View
            style={{
              padding: 20,
              gap: 8,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", gap: 5,display: !verModalCarrera ? "flex" : "none"  }}>
              {VALIDAS.map(
                (v, i) =>
                  i !== 0 && (
                    <ThemedButton
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: color,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                      }}
                      key={v as string}
                      onPress={() => {
                        setCarrera(i.toString());
                        setVerModalCarrera(true);
                        setMode("date");
                      }}
                    >
                      {VALIDAS_CORTAS[i]}
                    </ThemedButton>
                  ),
              )}
            </View>
            {/* <ThemedButton
              icon="calendar-outline"
              onPress={() => {
                (setShow(true), setMode("date"));
              }}
            >
              Seleccione Fecha
            </ThemedButton>
            <ThemedButton
              icon="time-outline"
              onPress={() => {
                (setShow(true), setMode("time"));
              }}
            >
              Seleccione Hora
            </ThemedButton> */}
          </View>
          {/* <Text>Selected: {date.toLocaleDateString()}</Text>
          <Text>Selected: {date.toLocaleTimeString()}</Text>
          <Text>Selected: {date.toISOString()}</Text> */}

          <View style={{height:100, flex:1}}/>

          {show && (
            <DateTimePicker
              value={date}
              mode={mode} // Options: "date", "time", "datetime" (iOS), "countdown" (iOS)
              is24Hour={true}
              display="default" // Options: "default", "spinner", "calendar", "clock"
              onChange={handleConfirm}
            />
          )}
        </View>      
     
      <View>
        <Modal visible={verModalPrecio} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 8,
                marginHorizontal: 10,
              }}
            >
              <ThemedText
                style={{ fontSize: 13, textAlign: "center" }}
                type="defaultSemiBold"
              >
                {polla?.nombre}
              </ThemedText>
              <ThemedText style={{ textAlign: "center", fontSize: 11 }}>
                Registrar Precio de Polla
              </ThemedText>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <Text>Precio de Polla</Text>
                <ThemeTextInput
                  keyboardType="numeric"
                  placeholder="Costo de la jugada"
                  onChangeText={(text) =>
                    setPolla({ ...polla, precio: parseFloat(text) || 0 })
                  } // Updates state as user types
                  value={polla.precio?.toString()}
                />

                <View style={{ gap: 10 }}>
                  <View>
                    <ThemedButton onPress={() => setVerModalPrecio(false)}>
                      Aceptar
                    </ThemedButton>
                  </View>
                  <View>
                    <ThemedButton
                      onPress={() => {
                        setPolla({ ...polla, precio: 0 });
                        setVerModalPrecio(false);
                      }}
                    >
                      Cancelar
                    </ThemedButton>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
       </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn_polla: {
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
export default DatePickerExample;
