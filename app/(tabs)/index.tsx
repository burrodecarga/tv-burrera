import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import Perfil from '@/components/Perfil';
import ThemedButton from '@/components/ThemedButton';
import { useUserInfo } from '@/hooks/userContext';
import { fetchBilleteras, TypeFectchBilletera } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { Billetera } from '@/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export type UserInfo = {
  billetera: Billetera | null
}

export default function HomeScreen() {

  const { session, loading, profile } = useUserInfo()
  const [billetera, setBilletera] = useState<TypeFectchBilletera | undefined>()

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-billetera', jsonValue);
    } catch (e) {
      // saving error
    }
  };



  useEffect(() => {
    if (!session) return
    const getDisponibilidad = async () => {

      const res = await fetchBilleteras(session.user.id)
      if (res) setBilletera(res[0])

    }
    getDisponibilidad()
  }, [session, billetera])

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    )
  }
  //console.log('Billeteras',billetera)
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/carrera.jpg')}
          style={styles.reactLogo}
          contentFit="cover"
        />
      }>
      <Perfil profile={profile} uri={profile?.avatar_url} disponibilidad={billetera ? billetera.fichas! : 0} />
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 12, fontWeight: '600' }}>Bienvenido a Pollas TvBurrera!</Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 12, fontWeight: '800' }}>Paso 1: Carreras</Text>
        <Text style={{ wordWrap: 'true', textAlign: 'justify', fontSize: 11 }}>
          {`En la pestaña de Carreras, podrás seleccionar tus caballos favoritos para cada carrera. Simplemente haz clic en los botones correspondientes a cada caballo para elegir tu apuesta. ¡Buena suerte!`}
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 12, fontWeight: '800' }}>Paso 2: Crea tú Polla Ganadora</Text>
        <Text style={{ wordWrap: 'true', textAlign: 'justify', fontSize: 11 }}>
          {`Selecciona un caballo para cada carrera pulsando en el número de cabaloo de tú elección`}
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 12, fontWeight: '800' }}>Paso 3: Enviar Polla Ganadora</Text>
        <Text style={{ wordWrap: 'true', textAlign: 'justify', fontSize: 11 }}>
          {`Una vez seleccionados los caballos ganadores procesa tú polla ganadora de forma automática si dispones de suficientes fichas y en caso contrario recarga tú cartera con la cantidad de fichas que cuesta tú polla ganadora`}
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 12, fontWeight: '800' }}>Paso 4: Polla Ganadora</Text>
        <Text style={{ wordWrap: 'true', textAlign: 'justify', fontSize: 11 }}>
          {`Cada carrera genera puntos acumulativos,`}
        </Text>
        <Text style={{ wordWrap: 'true', textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
          {`primer lugar (1° lugar) :5 puntos`}
        </Text>
        <Text style={{ wordWrap: 'true', textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
          {`segundo lugar (2° lugar) :3 puntos`}
        </Text>
        <Text style={{ wordWrap: 'true', textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
          {`tercer lugar (3° Lugar) :1 punto`}
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 12, fontWeight: '800' }}>Paso 5: Premios</Text>
        <Text style={{ wordWrap: 'true', textAlign: 'justify', fontSize: 11 }}>
          {`Cada carrera genera puntos acumulativos,`}
        </Text>
        <Text style={{ wordWrap: 'true', textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
          {`primer lugar (1° lugar) :5 puntos`}
        </Text>
        <Text style={{ wordWrap: 'true', textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
          {`segundo lugar (2° lugar) :3 puntos`}
        </Text>
        <Text style={{ wordWrap: 'true', textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
          {`tercer lugar (3° Lugar) :1 punto`}
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 12, fontWeight: '800' }}>Paso 6: Transferencia de Fichas</Text>
        <Text style={{ wordWrap: 'true', textAlign: 'justify', fontSize: 11 }}>
          {`Cada carrera genera puntos acumulativos,`}
        </Text>
        <Text style={{ wordWrap: 'true', textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
          {`primer lugar (1° lugar) :5 puntos`}
        </Text>
        <Text style={{ wordWrap: 'true', textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
          {`segundo lugar (2° lugar) :3 puntos`}
        </Text>
        <Text style={{ wordWrap: 'true', textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
          {`tercer lugar (3° Lugar) :1 punto`}
        </Text>
      </View>
      <ThemedButton onPress={() => supabase.auth.signOut()} >Salir</ThemedButton>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 420,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
