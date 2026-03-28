import CarreraButton22 from '@/components/carrera-buttons-22';
import Confirm from '@/components/Confirm';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useApuesta } from '@/hooks/useApuesta';
import { useUserInfo } from '@/hooks/userContext';
import { addApuesta } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { Apuesta } from '@/lib/types';
import { globalStyles } from '@/styles/global-styles';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type MiApuesta = {
  carrera_1: number,
  carrera_2: number,
  carrera_3: number,
  carrera_4: number,
  carrera_5: number,
  carrera_6: number,
  id_polla: string,
  id_user: string,
  polla:string

}
const Bets = () => {
  const { idPolla, precio,polla } = useLocalSearchParams();
  const { height, width } = useWindowDimensions()
  const titulo = 'Confirmar Apuesta'
  const textBody = 'Si Confirma se le descontará el costo de sú Billetera'
  const buttonText = 'Confirmar'
  const { carrera1, setCarrera1, carrera2, setCarrera2, carrera3,
    setCarrera3, carrera4, setCarrera4, carrera5, setCarrera5, carrera6,
    setCarrera6 } = useApuesta()
  const color = useThemeColor({}, 'tint')
  const [errores, setErrores] = useState<string[]>([])
  const { session, actualizar, setActualizar } = useUserInfo()



  const onSeleccion = (carrera: number, caballo: number) => {
    //console.log(carrera, caballo)
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


  const descontarDeBilleter = async () => {
    if (!session) return
    //console.log('ENTRANDO')

    const userId = session?.user.id!
    const monto = Number(precio)
    const { data, error } = await supabase.rpc('restar_de_billetera', {
      usuario: userId,
      monto: monto
    })

    if (error) {
      Alert.alert('Error en servidor: ',error.message)
    }
    //console.log('DESCONTANDO',userId,monto)
    setActualizar?.(!actualizar)
    router.push('/(tabs)/pollas')

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
      Alert.alert('Hay un Error en la Polla', 'Debe seleccionar un caballo para cada carrera')
      return
    }
    //console.log('apostando')
    registrarApuesta(carrera1, carrera2, carrera3, carrera4, carrera5, carrera6)
  }

  const limpiar = async () => {
    setCarrera1(0)
    setCarrera2(0)
    setCarrera3(0)
    setCarrera4(0)
    setCarrera5(0)
    setCarrera6(0)

  }

  const cancelar = () => {
    setCarrera1(0)
    setCarrera2(0)
    setCarrera3(0)
    setCarrera4(0)
    setCarrera5(0)
    setCarrera6(0)

    router.push('/(tabs)/pollas')

  }

  const ListadoDeApuestas = () => {
    setCarrera1(0)
    setCarrera2(0)
    setCarrera3(0)
    setCarrera4(0)
    setCarrera5(0)
    setCarrera6(0)

    router.push('/(tabs)/pollas')
  }


  const registrarApuesta = async (a: number, b: number, c: number, d: number, e: number, f: number) => {
    const apuesta: MiApuesta = {
      carrera_1: a,
      carrera_2: b,
      carrera_3: c,
      carrera_4: d,
      carrera_5: e,
      carrera_6: f,
      id_polla: idPolla as string,
      id_user: session?.user.id!,
      polla:polla as string
    }
    descontarDeBilleter()
    const resultado = await addApuesta(apuesta as Apuesta)
    limpiar()
    ListadoDeApuestas()
    //console.log('APUESTA', resultado,polla)
    setActualizar?.(!actualizar)

  }


  const bg = '#979090'
  const te = '#33f914'
  const ne = '#000000'
  return (

    <SafeAreaView style={{ flex: 1, marginVertical: height * 0.08, backgroundColor: bg }}>
      <View style={{
        flex: 1, paddingHorizontal: 15,
        justifyContent: 'center', alignContent: 'center',
        borderRadius: 8, marginHorizontal: 0, width: '100%'
      }}>
        {/* Resultados */}
        <View><Text style={{textAlign:'center', fontSize:16,fontWeight:'700',color:color, backgroundColor:'#fff', marginBottom:6,padding:6}}>Números Seleccionados</Text></View>
        <View style={{ flexDirection: 'row',  borderRadius: 8, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.cuadro, { backgroundColor: carrera1 === 0 ? bg : ne, color: carrera1 === 0 ? bg : te }]}>{carrera1}</Text>
          <Text style={[styles.cuadro, { backgroundColor: carrera2 === 0 ? bg : ne, color: carrera2 === 0 ? bg : te }]}>{carrera2}</Text>
          <Text style={[styles.cuadro, { backgroundColor: carrera3 === 0 ? bg : ne, color: carrera3 === 0 ? bg : te }]}>{carrera3}</Text>
          <Text style={[styles.cuadro, { backgroundColor: carrera4 === 0 ? bg : ne, color: carrera4 === 0 ? bg : te }]}>{carrera4}</Text>
          <Text style={[styles.cuadro, { backgroundColor: carrera5 === 0 ? bg : ne, color: carrera5 === 0 ? bg : te }]}>{carrera5}</Text>
          <Text style={[styles.cuadro, { backgroundColor: carrera6 === 0 ? bg : ne, color: carrera6 === 0 ? bg : te }]}>{carrera6}</Text>


        </View>
        {/* Filas de botones */}

        <View style={[globalStyles.carrerasContainer, { flex: 1, width: '100%', marginHorizontal: 0, borderWidth: 0 }]}>
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={6} carrera={1} selected={carrera1} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={12} carrera={2} selected={carrera2} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={10} carrera={3} selected={carrera3} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={8} carrera={4} selected={carrera4} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={12} carrera={5} selected={carrera5} />
          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={15} carrera={6} selected={carrera6} />
        </View>
        <View style={{
          width: '100%', flexDirection: 'row', marginHorizontal: 0,
          justifyContent: 'space-between', alignContent: 'center', marginTop: 10, borderTopWidth: 1, padding: 10
        }}>

            <Confirm titulo={titulo} textBody={textBody} onOk={apostar} buttonText={buttonText} onCancel={() => { }} />

          <TouchableOpacity onPress={() => limpiar()} style={[styles.boton, { backgroundColor: '#0b9bbe', width: '26%' }]}>
            <ThemedText style={[globalStyles.buttonText, { fontSize: 9 }]}>Limpiar</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cancelar()} style={[styles.boton, { backgroundColor: 'red', width: '26%' }]}>
            <ThemedText style={[globalStyles.buttonText, { fontSize: 9 }]}>Cancelar</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

export default Bets

const styles = StyleSheet.create({
  cuadro: {
    fontWeight: '600', fontSize: 20, textAlign: 'center', width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center'
  },
  boton: {
    ...globalStyles.button, alignSelf: 'center',
    borderRadius: 5, paddingHorizontal: 6, backgroundColor: '#3f68ee'
  }
})