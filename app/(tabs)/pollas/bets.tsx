import CarreraButton22 from '@/components/carrera-buttons-22';
import { ThemedText } from '@/components/themed-text';
import { useApuesta } from '@/hooks/useApuesta';
import { useUserInfo } from '@/hooks/userContext';
import { addApuesta } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { Apuesta, Polla } from '@/lib/types';
import { globalStyles } from '@/styles/global-styles';
import { getFecha, getHora } from '@/utils/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type MiApuesta={
      carrera_1:number,
      carrera_2:number,
      carrera_3:number,
      carrera_4:number,
      carrera_5:number,
      carrera_6:number,
      id_polla:string,
      id_user:string
  
}
const Bets = () => {

  const { carrera1, setCarrera1, carrera2, setCarrera2, carrera3, setCarrera3, carrera4, setCarrera4, carrera5, setCarrera5, carrera6,
    setCarrera6 } = useApuesta()

  const [errores, setErrores] = useState<string[]>([])
  const [miPolla, setMiPolla] = useState<Polla | null>()

  const {session}=useUserInfo()

  const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('my-polla')
  } catch(e) {
    // remove error
  }
  console.log('Done.')
}


  const onSeleccion = (carrera: number, caballo: number) => {
    console.log(carrera, caballo)
    if (carrera === 1) {
      setCarrera1(caballo)
    }
    if (carrera === 2) {
      setCarrera2(caballo)
    }
    if (carrera === 3) {
      setCarrera3(caballo)
    }
    if (carrera === 4) {
      setCarrera4(caballo)
    }
    if (carrera === 5) {
      setCarrera5(caballo)
    }

    if (carrera === 6) {
      setCarrera6(caballo)
    }
  }



  const apostar = () => {

    if (carrera1 === 0) {
      setErrores(prev => [...prev, 'debe seleccionar caballo para carrera 1'])
    }
    if (carrera2 === 0) {
      setErrores(prev => [...prev, 'debe seleccionar caballo para carrera 2'])
    }
    if (carrera3 === 0) {
      setErrores(prev => [...prev, 'debe seleccionar caballo para carrera 3'])
    }
    if (carrera4 === 0) {
      setErrores(prev => [...prev, 'debe seleccionar caballo para carrera 4'])
    }
    if (carrera5 === 0) {
      setErrores(prev => [...prev, 'debe seleccionar caballo para carrera 5'])
    }
    if (carrera6 === 0) {
      setErrores(prev => [...prev, 'debe seleccionar caballo para carrera 6'])
    }

    if (carrera1 === 0 || carrera2 === 0 || carrera3 === 0 || carrera4 === 0 || carrera5 === 0 || carrera6 === 0) {
      console.log(errores)
      Alert.alert('Hay un Error en la Polla', 'Debe seleccionar un caballo para cada carrera')
      return
    }
    console.log('apostando')
    registrarApuesta(carrera1,carrera2,carrera3,carrera4,carrera5,carrera6)
  }

  const limpiar =async() => {
    setCarrera1(0)
    setCarrera2(0)
    setCarrera3(0)
    setCarrera4(0)
    setCarrera5(0)
    setCarrera6(0)

    if(session){
        
  const { data, error } = await supabase.rpc('restar_de_billetera', { 
  user_id: session?.user.id!,
  monto:miPolla!.fichas? miPolla!.fichas:0
});

if(error){
  console.log(error)
}
console.log('LIMPIANDO',data)

  }}

  const cancelar = () => {
    setCarrera1(0)
    setCarrera2(0)
    setCarrera3(0)
    setCarrera4(0)
    setCarrera5(0)
    setCarrera6(0)

    router.push('/(tabs)/pollas')
  }

  const registrarApuesta = async (a:number,b:number,c:number,d:number,e:number,f:number) => {
    const apuesta:MiApuesta={
      carrera_1:a,
      carrera_2:b,
      carrera_3:c,
      carrera_4:d,
      carrera_5:e,
      carrera_6:f,
      id_polla:miPolla?.id!,
      id_user:session?.user.id!
    }

    const resultado =await addApuesta(apuesta as Apuesta)
    removeValue()
    limpiar()
    cancelar()

console.log('APUESTA', resultado)
  }


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-polla');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };


  useEffect(() => {
    getData().then(data => {
      //console.log(JSON.stringify(data, null, 2))
      setMiPolla(data)
    })

  }, [])

  return (

    <SafeAreaView style={{ flex: 1, marginVertical: 20 }}>

      <View style={{
        flex: 2 / 12, backgroundColor: '#fff', padding: 10,
        justifyContent: 'center', alignContent: 'center',
        borderRadius: 8, borderColor: '#5a5555', borderWidth: 1, marginHorizontal: 20
      }}>
        {/* Resultados */}
        <ThemedText style={{ fontWeight: '600', fontSize: 13 }}>Polla N° {miPolla?.id}</ThemedText>
        <ThemedText style={{ fontWeight: '600' }}>Fecha: {getFecha(miPolla?.fecha!)} --- hora:{getHora(miPolla?.fecha!)}</ThemedText>
        <ThemedText style={{ fontWeight: '600',fontSize:13 }}>Fecha Cierre: {getFecha(miPolla?.cierre!)} --- hora Cierre:{getHora(miPolla?.cierre!)}</ThemedText>

        <ThemedText style={{ fontWeight: '600' }}>Jugadores {miPolla?.apuestas} </ThemedText>
        <ThemedText style={{ fontWeight: '600' }}>Unidades a Repartir {miPolla?.fichas} UA </ThemedText>
      </View>
      <View style={{ flex: 9 / 12, marginVertical: 5 }}>
        {/* Filas de botones */}

        <View style={[globalStyles.carrerasContainer, { flex: 1 }]}>
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={6} carrera={1} selected={carrera1} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={12} carrera={2} selected={carrera2} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={10} carrera={3} selected={carrera3} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={8} carrera={4} selected={carrera4} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={12} carrera={5} selected={carrera5} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={15} carrera={6} selected={carrera6} />

        </View>
      </View>
      <View style={{
        width: '100%', flexDirection: 'row', marginHorizontal: 0,
        justifyContent: 'space-between', alignContent: 'center', flex: 1 / 12, marginBottom: 0
      }}>
        <TouchableOpacity onPress={() => apostar()} style={{
          ...globalStyles.button, alignSelf: 'center',
          width: '25%', borderRadius: 5, paddingHorizontal: 10, backgroundColor: '#226d04'
        }}>
          <ThemedText style={[globalStyles.buttonText, { fontSize: 16 }]}>Enviar</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => limpiar()} style={{
          ...globalStyles.button, alignSelf: 'center',
          width: '25%', borderRadius: 5, paddingHorizontal: 10, backgroundColor: '#3f68ee'
        }}>
          <ThemedText style={[globalStyles.buttonText, { fontSize: 16 }]}>Limpiar</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => cancelar()} style={{
          ...globalStyles.button, alignSelf: 'center',
          width: '25%', borderRadius: 5, paddingHorizontal: 10, backgroundColor: '#ad0808'
        }}>
          <ThemedText style={[globalStyles.buttonText, { fontSize: 16 }]}>Cancelar</ThemedText>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

export default Bets