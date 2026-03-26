import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import Perfil from '@/components/Perfil';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import { useUserInfo } from '@/hooks/userContext';
import { fetchBilleteras, TypeFectchBilletera } from '@/lib/api';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const [billetera, setBilletera] = useState<TypeFectchBilletera>()

  const { profile, session, loading, saveProfile } = useUserInfo()



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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/dinero.jpg')}
          style={styles.reactLogo}
          contentFit="cover"
        />
      }>

     <Perfil profile={profile} size={130} uri={profile?.avatar_url}/>

      <Collapsible title="Disponibilidad">
        <ThemedText>
          <ThemedText type="defaultSemiBold">{billetera ? billetera.fichas : 0} </ThemedText>
          <ThemedText type="defaultSemiBold" style={{ fontSize: 10 }}>Unidades de Apuesta</ThemedText>
        </ThemedText>
      </Collapsible>
      <Collapsible title="Perfil de Usuario">
        <TouchableOpacity style={{borderWidth:1, borderRadius:8,padding:10}} onPress={()=>router.replace('/(tabs)/pollas/user')}><Text style={{textAlign:'center'}}>Modificar Perfil de Usuario</Text></TouchableOpacity>
      </Collapsible>
    </ParallaxScrollView>
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
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
