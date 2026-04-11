import React from "react";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./ui/ThemedView";

const Carrera = ({carrera,distancia,hora, ejemplares}:
    { carrera: string,
        distancia: number,
        hora: Date,
        ejemplares: number }
) => {
    return (
        <ThemedView
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <ThemedText>{carrera}</ThemedText>
            <ThemedView>
                <ThemedText
                    style={{ fontSize: 10, marginVertical: 0, margin: 0, padding: 0 }}
                >
                    distancia:{distancia} mts
                </ThemedText>
                <ThemedText
                    style={{ fontSize: 10, marginVertical: 0, margin: 0, padding: 0 }}
                >
                    hora:{hora.toLocaleTimeString()}
                </ThemedText>
                <ThemedText
                    style={{ fontSize: 10, marginVertical: 0, margin: 0, padding: 0 }}
                >
                    competidores:{ejemplares}
                </ThemedText>
            </ThemedView>
        </ThemedView>
    );
};

export default Carrera;
