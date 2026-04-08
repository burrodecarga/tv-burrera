import { CONDICION_DE_POLLA } from "@/constants/Values";
import { Polla } from "@/lib/types";
import { getFecha } from "@/utils/date";
import React from "react";
import { ThemedText } from "./themed-text";
import Card from "./ui/Card";
import PollaRetirados from "./POllaRetirados";

type Props = {
  data: Polla | null;
};

const PollaCard = ({ data }: Props) => {
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
        <ThemedText style={{ fontSize: 13 }} type="title">
          RETIRADOS
        </ThemedText>
        <PollaRetirados pollaID={data!.id!}/>
      </Card>
    </Card>
  );
};

export default PollaCard;
