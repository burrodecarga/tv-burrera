import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import LineaHorizontal from '@/components/LineaHorizontal';
import Perfil from '@/components/Perfil';
import { ThemedView } from '@/components/themed-view';
import Card from '@/components/ui/Card';
import { Fonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useApuesta } from '@/hooks/useApuesta';
import { useUserInfo } from '@/hooks/userContext';
import { Polla } from '@/lib/types';
import { usePollas } from '@/provider/PollasProvider';
import { getFecha, getHora, getHoraT } from '@/utils/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function PollasScreen() {

  const { height, width } = useWindowDimensions()
  const color = useThemeColor({}, 'tint')

  const { profile, loading, disponibilidad } = useUserInfo()
  const { pollas, loading: cargando } = usePollas()
  const [miBilletera, setMiBilletera] = useState()
  const { setPollaInfo, pollaInfo } = useApuesta()



  const storeData = async (value: Polla) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-polla', jsonValue);
    } catch (e) {
      // saving error
    }
  };


  const crearPolla = (value: Polla) => {
     storeData(value)
     router.push('/(tabs)/pollas/bets')
     router.push({
       pathname: '/(tabs)/pollas/bets',
       params: { idPolla: value.id, precio: value.precio, polla:value.nombre, fecha:value.fecha }
     });
  }


  if (cargando) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    )
  }

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    )
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-billetera');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };


  //console.log('PROFILE',profile)

  //console.log(disponibilidad)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, width: width, }}>
        <Image
          source={require('@/assets/images/baneer.jpg')}
          style={styles.reactLogo}
          contentFit="cover"
        />
        <View style={{ paddingHorizontal: 10, gap: 10, marginBottom: 10 }}>

        <Perfil profile={profile} uri={profile?.avatar_url} />
        </View>
        <Text
          style={{
            fontFamily: Fonts.rounded,
            fontSize: 17,
            fontWeight: 'bold',
            color: color,
            textAlign: 'center',
            padding: 6
          }}>
          Listado de Pollas
        </Text>

        <FlatList
          style={{ flex: 2 }}
          showsVerticalScrollIndicator={false}
          data={pollas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView style={{
              padding: 10, borderRadius: 8,
              borderWidth: 1, borderColor: '#3ab3b3',
              backgroundColor: '#9fcdf8', width: '100%',
              marginVertical: 10
            }}>
              <Card><Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.nombre}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'semibold' }}>Fecha:{item.fecha ? getFecha(item.fecha.toString()) : 'xx/xx/xxxx'}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'semibold' }}>Hora:{item.fecha ? getHora(item.fecha.toString()) : 'xx/xx/xxxx'}</Text>
                <LineaHorizontal />

                <Text style={{ fontSize: 14, fontWeight: 'semibold' }}>Hora de Cierre:{item.hora_de_cierre ? getHoraT(item.hora_de_cierre.toString()) : 'xx/xx/xxxx'}</Text>
                <LineaHorizontal />

                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Precio de Jugada:{item.precio} fichas</Text>
                <LineaHorizontal />


                <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: 'center' }}>Premios</Text>
                <Text style={{fontWeight:'700'}} >1er Premio:{Math.round(item.apostadores!*item.precio! * 0.5).toLocaleString()} <Text style={{fontSize:8}}>fichas</Text></Text>
                <Text style={{fontWeight:'700'}} >2do Premio:{Math.round(item.apostadores!*item.precio!* 0.15).toLocaleString()} <Text style={{fontSize:8}}>fichas</Text></Text>
                <Text style={{fontWeight:'700'}} >1er Premio:{Math.round(item.apostadores!*item.precio!* 0.1).toLocaleString()}  <Text style={{fontSize:8}}>fichas</Text></Text>
<LineaHorizontal/>
                <Text style={{ color: item.precio! > disponibilidad! ? 'red' : 'black' }}>Usted dispone de :{disponibilidad} fichas</Text>

                <TouchableOpacity
                  disabled={item.precio! > disponibilidad!}
                  onPress={() => crearPolla(item)}
                  style={{
                    marginTop: 10, backgroundColor: color, padding: 10,
                    borderRadius: 8, alignItems: 'center'
                  }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>CREAR POLLA</Text>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>{item.nombre}</Text>
                </TouchableOpacity>
              </Card>

            </ThemedView>

          )}
        />

      </View>
      <View>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} style={{ backgroundColor: color, padding: 10, borderRadius: 8, alignItems: 'center', margin: 10 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ir a Inicio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#b45050',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 420,
    marginBottom: 10
  },

});
