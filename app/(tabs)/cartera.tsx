import { StyleSheet } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { Fonts } from '@/constants/theme';
import { Image } from 'expo-image';

export default function TabTwoScreen() {
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
        Mi Cartera
        </ThemedText>
      </ThemedView>
      <ThemedText>Edwin Henriquez.</ThemedText>
      <Collapsible title="Disponibilidad">
        <ThemedText>         
          <ThemedText type="defaultSemiBold">350 </ThemedText> 
          <ThemedText type="defaultSemiBold">Unidades de Apuesta</ThemedText>
        </ThemedText>
        <ThemedText>
          Unidades de Apuesta por Apuesta <ThemedText type="defaultSemiBold">50</ThemedText>          
        </ThemedText>
        <ThemedText>
          Cantidad de apuestas disponibles <ThemedText type="defaultSemiBold">7</ThemedText>          
        </ThemedText>
         <ThemedText>
          Cantidad de apuestas por certificar <ThemedText type="defaultSemiBold">3</ThemedText>          
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Leer más</ThemedText>
        </ExternalLink>
      </Collapsible>
       <Collapsible title="Recargar Cartera Digital">
        <ThemedText>         
          <ThemedText type="defaultSemiBold">Agregas unidades de Apuesta a tú cartera digital </ThemedText> 
         </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Recargar Cartera Digital</ThemedText>
        </ExternalLink>
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
