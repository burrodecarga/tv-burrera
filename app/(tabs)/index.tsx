import { Image } from 'expo-image';
import { StyleSheet, Text } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ThemedButton from '@/components/ThemedButton';
import { useUserInfo } from '@/hooks/userContext';
import { fetchBilletera } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { Billetera } from '@/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export type UserInfo = {
  billetera: Billetera | null
}

export default function HomeScreen() {

  const { session, loading } = useUserInfo()

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-billetera', jsonValue);
    } catch (e) {
      // saving error
    }
  };



  useEffect(() => {

    if (session) {
      fetchBilletera(session.user.id).then((data) => storeData(data))
    }
  }, [session])

if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    )
  }

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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Bienvenido a Pollas TvBurrera!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Paso 1: Carreras</ThemedText>
        <ThemedText>
          {`En la pestaña de Carreras, podrás seleccionar tus caballos favoritos para cada carrera. Simplemente haz clic en los botones correspondientes a cada caballo para elegir tu apuesta. ¡Buena suerte!`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Paso 2: Crea tú Polla Ganadora</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
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
