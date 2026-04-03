import { KeyboardAvoidingView, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import IndicadorDeDisponibilidad from '@/components/IndicadorDeDisponibilidad';
import RetiraCard from '@/components/RetiraCard';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useUserInfo } from '@/hooks/userContext';
import { fetchBilleteras, TypeFectchBilletera } from '@/lib/api';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const color = useThemeColor({}, 'tint')
  const [billetera, setBilletera] = useState<TypeFectchBilletera>()
  const { profile, session, loading, saveProfile, disponibilidad,setActualizar,actualizar } = useUserInfo()
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
        <IndicadorDeDisponibilidad disponibilidad={disponibilidad} monto={montoAProcesar} tipo='retiro' altura={width} />
      
<View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 10 }}>
          <RetiraCard disponibilidad={disponibilidad} userId={session?.user.id!} profile={profile!} billetera={billetera!} actualizar={actualizar} setActualizar={setActualizar!}   />

        </View>

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

