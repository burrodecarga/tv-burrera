import { useThemeColor } from '@/hooks/use-theme-color'
import { MaterialIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import * as ImagePicker from "expo-image-picker"
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import ThemedButton from './ThemedButton'
import ThemeTextInput from './ThemeTextInput'
import Pago from './ui/Pago'


type CardProps = {
  ancho?: number,
  alto?: number
}
const RecargaCard = ({ alto = 171, ancho = 300 }: CardProps) => {
  const [phone, setPhone] = useState('')
  const [monto, setMonto] = useState('')
  const [imagen, setImagen] = useState('')
  const [imagenUpdated, setImagenUpdated] = useState(false)
  const color = useThemeColor({},'tint')

  const visible = monto.length>0 && imagen.length>0

  const handlePickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
            });
      if (!result.canceled) {
        setImagen(result.assets[0].uri);
        setImagenUpdated(true);
      }
    };

    const procesar = ()=>{
      if(imagen.length===0 || monto.length===0){
Toast.show({
      type: 'error',
      text1: 'Error en Procesamiento',
      text2: 'Debe enviar un monto y una imagen del pago movil 👋'
    });
        
      }
    }
 return (
    <>
    <View style={[styles.cardContainer, { width: ancho, height: alto }]}>
      <View style={styles.visa}>
        <View>
          <Text style={styles.cardHolder}>
            Visa TvBurrera
          </Text>
          <Text style={styles.info}>Edwin Henriquez</Text>
          <Text style={styles.info}>edwinhenriquezh@gmail.com</Text>
          <Text style={styles.info}>04144753555</Text>
        </View>
        <Image style={styles.tv} source={require('@/assets/images/tvburrera.jpg')} />
      </View>
      <View style={styles.dispo}>
        <Text style={styles.cardNumber}>Disponibilidad</Text>
        <Text style={styles.cardNumber}>73</Text>
        <Text style={styles.cardNumber}>fichas</Text>

      </View>
      <View style={styles.dispo}>
        <Text style={styles.cardNumber}>Por Confirmar</Text>
        <Text style={styles.cardNumber}>17</Text>
      </View>
      <Text style={styles.titleContainer}>Visa TvBurrera</Text>
    </View>
            <View style={{ marginTop: 10, flexDirection:'row', justifyContent:'center',alignItems:'center',display:imagen.length>0?'flex':'none' }} >
             {/* evidencia*/}
             {imagen.length>0 &&   <Pago uri={imagen} size={150} />}
             <TouchableOpacity style={{borderWidth:1, borderColor:color, borderRadius:100}} onPress={()=>setImagen("")}>
                    <MaterialIcons name="clear" size={24} color={color} />
             </TouchableOpacity>
</View>
                    <View style={{ marginTop: 10 }} />

    {/* Email y Password */}
        <View style={{ marginTop: 0 }}>
          <ThemeTextInput
            placeholder="Monto a Recargar"
            keyboardType='numeric'
            icon="cash-outline"
            value={monto}
            onChangeText={setMonto}
          />          
        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Botón */}
        <ThemedButton icon="reader-outline"
           onPress={handlePickImage}
        >Agregar Evidencia</ThemedButton>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />
        <ThemedButton icon="log-in-outline"
          onPress={() => procesar()}
        >Procesar Recarga</ThemedButton>

        {/* Enlace a registro */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

        </View>
    </>
  )
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
    color: '#fff'
  },

  cardContainer: {
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#9d08aa', // O usar LinearGradient
    elevation: 10, // Sombra en Android
    shadowColor: '#000', // Sombras en iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardNumber: {
    color: 'white',
    fontSize: 12,
    letterSpacing: 0,
    marginTop: 4,
  },
  cardHolder: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  visa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  tv: {
    width: 60,
    height: 60
  },
  info: {
    fontSize: 10,
    color: '#fff'
  },
  dispo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16
  }

});


export default RecargaCard