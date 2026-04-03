import { KeyboardAvoidingView, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import IndicadorDeDisponibilidad from '@/components/IndicadorDeDisponibilidad';
import RecargaCard from '@/components/RecargaCard';
import Button from '@/components/ui/Button';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useUserInfo } from '@/hooks/userContext';
import { fetchBilleteras, TypeFectchBilletera } from '@/lib/api';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const color = useThemeColor({}, 'tint')
  const [billetera, setBilletera] = useState<TypeFectchBilletera>()
  const { profile, session, loading, saveProfile, disponibilidad } = useUserInfo()
  const { height, width } = useWindowDimensions()
  const [recargar, setRecargar] = useState(true)
    const [montoAProcesar, setMontoAProcesar] = useState(0)



  const ancho = width * 0.7
  const alto = ancho * 0.57
  const pos = 10
  const icono = recargar ? 'cloud-download-outline' : 'cloud-upload-outline'
  const titulo = !recargar ? 'Acción : Pulse si desea RETIRAR DE CARTERA' : 'Pulse si desea RECARGAR CARTERA'



  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    )
  }

  useEffect(() => {
    const getDisponibilidad = async () => {
      if (session?.user.id) {
        const result = await fetchBilleteras(session.user.id)
        if (result) setBilletera(result[0])
      }
    }
    getDisponibilidad()
  }, [])

  //console.log(billetera)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >   
             <IndicadorDeDisponibilidad disponibilidad={disponibilidad} monto={montoAProcesar} tipo='retiro' altura ={width}  />


        {/* <RecargaCardImage /> */}
        <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 10 }}>
          {billetera && <RecargaCard alto={alto} ancho={ancho} billetera={billetera!} />}
          <Button title='Regresar' onPress={() => router.replace('/(tabs)/usuario')} style={{ marginVertical: 20 }} variant='danger' icon={<Entypo name="arrow-long-left" size={20} color='white' />} /> 
        </View>

        <View style={{ height: 5, backgroundColor: '#fff' }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  reactLogo: {
    height: 178,
    width: 420,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

});

