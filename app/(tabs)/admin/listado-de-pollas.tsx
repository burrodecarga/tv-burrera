import Loading from "@/components/Loading";
import PollaCard from "@/components/pollas/PollaCard";
import { CONDICION_DE_POLLA } from "@/constants/Values";
import { useThemeColor } from "@/hooks/use-theme-color";
import { fetchPollas, TypeFtchPollas } from "@/lib/api_pollas";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ListadoDePollasScreen = () => {
  const [pollas, setPollas] = useState<null | TypeFtchPollas>(null);
  const [loading, setLoading] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [ver, setVer] = useState(0);
  const color = useThemeColor({}, "tint");

  useEffect(() => {
    const getPollasByRelaciones = async () => {
      try {
        setLoading(true);
        const res = await fetchPollas();
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
    getPollasByRelaciones();
  }, [actualizar]);

  if (loading) {
    return <Loading />;
  }
console.log(ver)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ height: 100 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false} // Opcional: oculta la barra
      >
<View
            style={{
              backgroundColor: color,
              marginHorizontal: 10,
              width: 120,
              padding: 10,
              borderRadius: 8,
              height: 40,
            }}
            key={"bdc"}
          >
        <TouchableOpacity  style={{ margin: "auto" }} onPress={()=>router.replace('/(tabs)/admin')}>
              <Text
                style={{ color: "#fff", textAlign: "center", margin: "auto" }}
              >
                Regresar
              </Text>
            </TouchableOpacity>

          </View>
        {CONDICION_DE_POLLA.map((c,index) => (
          <View
            style={{
              backgroundColor: ver!==index? color:'green',
              marginHorizontal: 10,
              width: 120,
              padding: 10,
              borderRadius: 8,
              height: 40,
            }}
            key={c}
          >
            <TouchableOpacity  style={{ margin: "auto" }} onPress={(prev)=>setVer(index)}>
              <Text
                style={{ color: "#fff", textAlign: "center", margin: "auto" }}
              >
                {c}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <FlatList
        data={pollas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PollaCard
            data={item}
            actualizar={actualizar}
            setActualizar={setActualizar}
            ver={ver}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ListadoDePollasScreen;
