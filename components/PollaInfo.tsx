import { CONDICION_DE_POLLA } from "@/constants/Values";
import { TypePolla } from "@/constants/valores-iniciales";
import { supFecha, supHora } from "@/utils/date";
import React from "react";
import { Text, View } from "react-native";
import { ThemedText } from "./themed-text";
import Card from "./ui/Card";
import { Collapsible } from "./ui/collapsible";

const PollaInfo = ({ data }: { data: TypePolla }) => {
  return (
    <Card
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "column",
      }}
    >
      <ThemedText style={{ fontSize: 11 }} type="defaultSemiBold">
        POLLA : {CONDICION_DE_POLLA[data?.condicion!]}
      </ThemedText>
      <View style={{ borderWidth: 0.5, borderRadius: 8, padding: 4 }}>
        <Collapsible title="Detalles Básicos">
          <ThemedText style={{ fontSize: 11 }} type="defaultSemiBold">
            Precio de la Polla: {data?.precio!} fichas
          </ThemedText>
          <ThemedText style={{ fontSize: 11 }} type="defaultSemiBold">
            {data?.nombre}
          </ThemedText>
          <ThemedText style={{ fontSize: 11 }} type="defaultSemiBold">
            Hipódromo:{data?.hipodromo}
          </ThemedText>
          <ThemedText style={{ fontSize: 11 }} type="defaultSemiBold">
            Fecha de Evento: {supFecha(data?.fecha!)}
          </ThemedText>
          <ThemedText style={{ fontSize: 11 }} type="defaultSemiBold">
            Fecha de Cierre de Apuestas: {supFecha(data?.fecha_de_cierre!)}
          </ThemedText>
          <ThemedText style={{ fontSize: 11 }} type="defaultSemiBold">
            Hora de Cierre de Apuestas: {supHora(data?.hora_de_cierre!)}
          </ThemedText>
        </Collapsible>
      </View>
      <View style={{ borderWidth: 0.5, borderRadius: 8, padding: 4 }}>
        <Collapsible title="Detalle de Carreras">
          <Text style={{ fontSize: 10 }}>
            1ra Dist. {data?.carrera1_dist} mts, Hora: {data?.carrera1_hor},{" "}
            {data?.carrera1_ejem} Caballos
          </Text>
          <Text style={{ fontSize: 10 }}>
            2da Dist. {String(data?.carrera2_dist ?? "")} mts, Hora:{" "}
            {String(data?.carrera2_hor ?? "")},{" "}
            {String(data?.carrera2_ejem ?? "")} Caballos
          </Text>
          <Text style={{ fontSize: 10 }}>
            3ra Dist. {data?.carrera3_dist} mts, Hora: {data?.carrera3_hor},{" "}
            {data?.carrera3_ejem} Caballos
          </Text>
          <Text style={{ fontSize: 10 }}>
            4ta Dist. {data?.carrera4_dist} mts, Hora: {data?.carrera4_hor},{" "}
            {data?.carrera4_ejem} Caballos
          </Text>
          <Text style={{ fontSize: 10 }}>
            5ta Dist. {data?.carrera5_dist} mts, Hora: {data?.carrera5_hor},{" "}
            {data?.carrera5_ejem} Caballos
          </Text>
          <Text style={{ fontSize: 10 }}>
            6ta Dist. {data?.carrera6_dist} mts, Hora: {data?.carrera6_hor},{" "}
            {data?.carrera6_ejem} Caballos
          </Text>
        </Collapsible>
      </View>
    </Card>
  );
};

export default PollaInfo;
