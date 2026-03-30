import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import Perfil from '@/components/Perfil';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useApuesta } from '@/hooks/useApuesta';
import { useUserInfo } from '@/hooks/userContext';
import { Polla } from '@/lib/types';
import { usePollas } from '@/provider/PollasProvider';
import { getFecha, getHora } from '@/utils/date';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function PollasScreen() {

  const { height, width } = useWindowDimensions()
  const color =useThemeColor({},'tint')

  const { profile, loading,disponibilidad } = useUserInfo()
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
    //router.push('/(tabs)/pollas/bets')
    router.push({
      pathname: '/(tabs)/pollas/bets',
      params: { idPolla: value.id, precio: value.precio, polla:value.polla }
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
        <Perfil profile={profile} uri={profile?.avatar_url} />
        <Text
          style={{
            fontFamily: Fonts.rounded,
            fontSize: 17,
            fontWeight: 'bold',
            color: color,
            textAlign: 'center',
            padding:6
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
              borderWidth: 1, borderColor: '#9df3f3',
              backgroundColor: '#9fcdf8', width: '100%',
              marginVertical: 10
            }}>
              <Text >{item.polla}</Text>
              <Text >Fecha:{item.fecha ? getFecha(item.fecha.toString()) : 'xx/xx/xxxx'}</Text>
              <Text >Hora:{item.fecha ? getHora(item.fecha.toString()) : 'xx/xx/xxxx'}</Text>
              <Text >Hora de Cierre:{item.cierre ? getHora(item.cierre.toString()) : 'xx/xx/xxxx'}</Text>
              <Text >Fichas Acumuladas:{item.fichas}</Text>
              <Text >Jugadores:{item.apuestas}</Text>
              <Text >Precio de Jugada:{item.precio}</Text>
              <Text style={{color:item.precio!>disponibilidad!? 'red':'black'}}>Fichas Disponibles para Jugada:{disponibilidad}</Text>

              <TouchableOpacity
               disabled={item.precio!>disponibilidad!}
                onPress={() => crearPolla(item)}
                style={{
                  marginTop: 10, backgroundColor: color, padding: 10,
                  borderRadius: 8, alignItems: 'center'
                }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>CREAR POLLA</Text>
              </TouchableOpacity>
            </ThemedView>

          )}
          ListFooterComponent={<View style={{ justifyContent:'center', alignItems: 'center' }} ><Text>No hay registro de Apuestas</Text></View>}
        />

        <TouchableOpacity
          onPress={() => router.push('/')}
          style={{
            marginTop: 10, backgroundColor: color, padding: 10,
            borderRadius: 100, alignItems: 'center',
            marginHorizontal: 20, marginBottom: 20,width:50,height:50
          }}>
         <AntDesign name="home" size={24} color="white" />
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
