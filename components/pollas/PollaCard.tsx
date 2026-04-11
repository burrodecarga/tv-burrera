import { CONDICION_DE_POLLA } from "@/constants/Values";
import { TypeFetchPolla } from "@/lib/api_pollas";
import { getFecha } from "@/utils/date";
import { router } from "expo-router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { View } from "react-native";
import Carreras from "../Carreras";
import { ThemedText } from "../themed-text";
import ThemedButton from "../ThemedButton";
import ThemeText from "../ThemeText";
import Card from "../ui/Card";

type Props = {
  data: TypeFetchPolla;
  actualizar: boolean;
  setActualizar: Dispatch<SetStateAction<boolean>>;
  ver:number
};

const PollaCard = ({ data, actualizar = false, setActualizar,ver }: Props) => {
  const [visible, setVisible] = useState(false);
  const [ganadorV, setGanadorV] = useState(false);
  const [verRetirados, setVerRetirados] = useState(false);
  const [carrera, setCarrera] = useState("");
  const [caballo, setCaballo] = useState("");
  const [posicion, setPosicion] = useState("");
  const [loading, setLoading] = useState(false);

 if(ver !==-1){
   if(ver!==data.condicion){
    return null
   }
 }
  

  return (
    <Card
      style={{
        flex:1,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "column",
        gap:2,
      }}
    >
      <ThemeText>XX{CONDICION_DE_POLLA[ver]}</ThemeText>
      <ThemedText style={{ fontSize: 13 }} type="title">
        {CONDICION_DE_POLLA[data?.condicion!]}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="title">
        Precio de la Polla: {data?.precio!} fichas
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="title">
        {data?.nombre}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        País: {data?.pais}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        Hipódromo: {data?.hipodromo}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        Fecha de Evento: {getFecha(data?.fecha!)}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        Fecha de Cierre de Apuestas: {getFecha(data?.fecha_de_cierre!)}
      </ThemedText>
      <ThemedText style={{ fontSize: 13 }} type="defaultSemiBold">
        Hora de Cierre de Apuestas: {(data?.hora_de_cierre!)}
      </ThemedText>
      <Card>
        <Carreras values={data}/>
      </Card>
      <View style={{display:ver==1?'contents':'none'}}>
       <ThemedButton
          icon="list-circle-outline"
          onPress={() => {}}
          disabled={false}
        >
         Ganadores
        </ThemedButton>
      </View>
       <View style={{display:ver<=1?'contents':'none'}}>
      <ThemedButton
          icon="list-circle-outline"
          onPress={() => router.replace({pathname:'/(tabs)/admin/retirados',params:{id:data.id}})}
          disabled={false}
        >
          Retirados
        </ThemedButton>
        </View>
    </Card>
  );
};

export default PollaCard;
