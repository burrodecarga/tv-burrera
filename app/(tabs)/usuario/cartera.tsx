import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import Perfil from '@/components/Perfil';
import RecargaCard from '@/components/RecargaCard';
import RecargaCardImage from '@/components/RecargaCardImage';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useUserInfo } from '@/hooks/userContext';
import { fetchBilleteras, TypeFectchBilletera } from '@/lib/api';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const color = useThemeColor({}, 'tint')
  const [billetera, setBilletera] = useState<TypeFectchBilletera>()
  const { profile, session, loading, saveProfile } = useUserInfo()
  const { height, width } = useWindowDimensions()
  const [recargar, setRecargar] = useState(false)


  const ancho = width * 0.7
  const alto = ancho * 0.57
  const pos = 10
  const icono = recargar ? 'cloud-download-outline' : 'cloud-upload-outline'
  const titulo = !recargar ? 'Acción : Recargar Cartera' : 'Acción Retirar'



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
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
          headerImage={
            <Image
              source={require('@/assets/images/dinero.jpg')}
              style={styles.reactLogo}
              contentFit="cover"
            />
          }>

          <Perfil profile={profile} size={130} uri={profile?.avatar_url} />
          <View style={{alignItems:'center', justifyContent:'center',marginHorizontal:20}}>
              <TouchableOpacity onPress={() => setRecargar(!recargar)} style={{backgroundColor:color, paddingVertical:6, paddingHorizontal:20, borderRadius:8, width:'100%', }}>
                <Text style={{color:'#fff', textAlign:'center'}}>{titulo}</Text>
              </TouchableOpacity>
          </View>

          {/* <RecargaCardImage /> */}
          <View style={{ display: recargar ? 'flex' : 'none' }}>
            <RecargaCardImage />
          </View>
          <View style={{ display: recargar ? 'none' : 'flex', margin: 'auto', }}>
            <RecargaCard alto={alto} ancho={ancho} />
          </View>


        </ParallaxScrollView>
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

