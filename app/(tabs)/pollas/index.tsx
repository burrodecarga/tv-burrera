import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { useApuesta } from '@/hooks/useApuesta';
import { Polla } from '@/lib/types';
import { usePollas } from '@/provider/PollasProvider';
import { getFecha, getHora } from '@/utils/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserInfo } from '@/hooks/userContext';


export default function PollasScreen() {


  const { profile, loading } = useUserInfo()
  const { pollas, loading: cargando } = usePollas()
  const [miBilletera,setMiBilletera]=useState()
  const {setPollaInfo,pollaInfo}=useApuesta()

  const {disponibilidad}=useApuesta()

  const storeData = async (value:Polla) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-polla', jsonValue);
  } catch (e) {
    // saving error
  }
};


  const crearPolla = (value: Polla)=>{
    storeData(value)
    router.push('/(tabs)/pollas/bets')
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
  
useEffect(()=>{
  getData().then(data=>{
    console.log(JSON.stringify(data, null, 2))
    setMiBilletera(data)
  })

},[])

console.log(disponibilidad)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 / 5, }}>
        <Image
          source={require('@/assets/images/baneer.jpg')}
          style={styles.reactLogo}
          contentFit="cover"
        />
      </View>
      <View style={{
        flex: 1 / 5, justifyContent: 'center', alignItems: 'center',
        marginTop: 20,
      }}>
        <Text
          style={{
            fontFamily: Fonts.rounded,
            fontSize: 24,
            fontWeight: 'bold',
            color: '#0e0e0e',
          }}>
          Listado de Pollas
        </Text>
        <Text>{profile?.username}</Text>
        <Text>Disponibilidad :   fichas</Text>

      </View>
      <View style={{ flex: 3 / 5, backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 8, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
        showsVerticalScrollIndicator={false}
          data={pollas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView style={{
              padding: 10, borderRadius: 8,
              borderWidth: 1, borderColor: '#9df3f3',
              backgroundColor: '#9fcdf8', width: '100%',
              marginVertical:20
            }}>
              <Text >{item.polla}</Text>
              <Text >Fecha:{item.fecha ? getFecha(item.fecha.toString()) : 'xx/xx/xxxx'}</Text>
              <Text >Hora:{item.fecha ? getHora(item.fecha.toString()) : 'xx/xx/xxxx'}</Text>
              <Text >Hora de Cierre:{item.cierre ? getHora(item.cierre.toString()) : 'xx/xx/xxxx'}</Text>
              <Text >Fichas Acumuladas:{item.fichas}</Text>
              <Text >Jugadores:{item.apuestas}</Text>
              <Text >Precio de Jugada:{item.precio}</Text>
              <TouchableOpacity
                onPress={() => crearPolla(item)}
                style={{
                  marginTop: 10, backgroundColor: '#098d61', padding: 10,
                  borderRadius: 8, alignItems: 'center',
                }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>CREAR POLLA</Text>
              </TouchableOpacity>
            </ThemedView>

          )}
        />
      </View>
      <TouchableOpacity
                onPress={() => router.push('/')}
                style={{
                  marginTop: 10, backgroundColor: '#2f60e9', padding: 10,
                  borderRadius: 8, alignItems: 'center',
                  marginHorizontal:30,marginVertical:20
                }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Home</Text>
              </TouchableOpacity>
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
  },

});
