import CarreraButton22 from '@/components/carrera-buttons-22';
import Confirm from '@/components/Confirm';
import Seleccionados from '@/components/pollas/Seleccionados';
import { ThemedText } from '@/components/themed-text';
import { BANDERAS, BG, TEXTO } from '@/constants/Values';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useApuesta } from '@/hooks/useApuesta';
import { useUserInfo } from '@/hooks/userContext';
import { addApuesta, CarrerasByPollaId } from '@/lib/api';
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
  polla_id: string,
  user_id: string,
  polla: string

}
const Bets = () => {
  const { idPolla, precio, polla, fecha } = useLocalSearchParams();
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
  const [carreras, setCarreras] = useState<CarrerasByPollaId>()
  const [loading, setLoading] = useState(false)



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
      Alert.alert('Error en servidor: ', error.message)
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
      polla_id: idPolla as string,
      user_id: session?.user.id!,
      polla: polla as string
    }
    descontarDeBilleter()
    const resultado = await addApuesta(apuesta as Apuesta)
    limpiar()
    ListadoDeApuestas()
    //console.log('APUESTA', resultado,polla)
    setActualizar?.(!actualizar)

  }




  return (
    <SafeAreaView style={{ flex: 1, marginVertical: height * 0.01, backgroundColor: '#fff', justifyContent:'space-between' }}>
      <View style={{ flex: 1, marginHorizontal: width * 0.05, backgroundColor: BG, justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 10, borderWidth:0.5, borderColor:'#ccc' }}>
        {/* Resultados */}
       
         
            <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '700', color: color, backgroundColor: BG, marginBottom: 1, padding: 1 }}>
            {polla}
            </Text>
         
          <Text style={{ textAlign: 'center', fontSize: 11, fontWeight: '700', color: color, backgroundColor: BG, marginBottom: 6, padding: 6 }}>Ejemplares Seleccionados
          </Text>
        
        <View style={{ flexDirection: 'row', borderRadius: 8, justifyContent: 'space-between', alignItems: 'center' }}>
          <Seleccionados carrera={'1ra'} caballo={carrera1} />
          <Seleccionados carrera={'2da'} caballo={carrera2} />
          <Seleccionados carrera={'3ra'} caballo={carrera3} />
          <Seleccionados carrera={'4ta'} caballo={carrera4} />
          <Seleccionados carrera={'5ta'} caballo={carrera5} />
          <Seleccionados carrera={'6ta'} caballo={carrera6} />
        </View>
        <View style={{ flexDirection: 'row', borderRadius: 8, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.cuadro1, { backgroundColor: carrera1 === 0 ? BG : BANDERAS[carrera1], color: carrera1 === 0 ? BG : TEXTO[carrera1] }]}>{carrera1}</Text>
          <Text style={[styles.cuadro1, { backgroundColor: carrera2 === 0 ? BG : BANDERAS[carrera2], color: carrera2 === 0 ? BG : TEXTO[carrera1] }]}>{carrera2}</Text>
          <Text style={[styles.cuadro1, { backgroundColor: carrera3 === 0 ? BG : BANDERAS[carrera3], color: carrera3 === 0 ? BG : TEXTO[carrera1] }]}>{carrera3}</Text>
          <Text style={[styles.cuadro1, { backgroundColor: carrera4 === 0 ? BG : BANDERAS[carrera4], color: carrera4 === 0 ? BG : TEXTO[carrera1] }]}>{carrera4}</Text>
          <Text style={[styles.cuadro1, { backgroundColor: carrera5 === 0 ? BG : BANDERAS[carrera5], color: carrera5 === 0 ? BG : TEXTO[carrera1] }]}>{carrera5}</Text>
          <Text style={[styles.cuadro1, { backgroundColor: carrera6 === 0 ? BG : BANDERAS[carrera6], color: carrera6 === 0 ? BG : TEXTO[carrera1] }]}>{carrera6}</Text>
        </View>
        {/* Filas de botones */}

        <View style={[globalStyles.carrerasContainer, { flex: 1, width: '100%', marginHorizontal: 0, borderWidth: 0, gap: 10, height: 'auto' }]}>

          <CarreraButton22 onSeleccion={onSeleccion} num_caballos={24} carrera={1} selected={carrera1} />
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
    fontWeight: '600', fontSize: 12, textAlign: 'center', width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center'
  },
  cuadro1: {
    fontWeight: '600', fontSize: 13, textAlign: 'center', width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center'
  },
  boton: {
    ...globalStyles.button, alignSelf: 'center',
    borderRadius: 5, paddingHorizontal: 6, backgroundColor: '#3f68ee'
  }
})