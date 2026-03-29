import { Database } from '@/db_types'
import { useThemeColor } from '@/hooks/use-theme-color'
import { addTransaccion } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import { Billetera, Profile } from '@/lib/types'
import { Image } from 'expo-image'
import * as ImagePicker from "expo-image-picker"
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import ThemeTextInput from './ThemeTextInput'
import ThemedButton from './ThemedButton'


type CardProps = {
  ancho?: number,
  alto?: number,
  disponibilidad?:number,
  userId:string,
  profile:Profile
  billetera:Billetera
}
const RetiraCard = ({ alto = 171, ancho = 300,disponibilidad=0,userId,profile,billetera }: CardProps) => {
  const [phone, setPhone] = useState('')
  const [monto, setMonto] = useState('')
  const [imagen, setImagen] = useState('')
  const [imagenUpdated, setImagenUpdated] = useState(false)
  const color = useThemeColor({}, 'tint')

  const visible = monto.length > 0 && imagen.length > 0

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
    });
    if (!result.canceled) {
      setImagen(result.assets[0].uri);
      setImagenUpdated(true);
    }
  };

  const procesar = async () => {

    if (monto.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Error en Procesamiento',
        text2: 'Debe enviar un monto y una imagen del pago movil 👋'
      });}

  const resta = disponibilidad-Number(monto)
  if(resta<0){
Toast.show({
        type: 'error',
        text1: 'Error en Procesamiento',
        text2: 'Sólo puede retirar una cantida menor o iguial a sú disponibilidad 👋'
      });

  } 
const {error} =await supabase.rpc('restar_de_billetera',{
  monto:Number(monto),
  usuario:userId})
    
if(error){
Toast.show({
        type: 'error',
        text1: 'Retiro en Proceso',
        text2: 'Se ha producido un error 👋'
      });
if(!error){
  const transaccion:Database['public']['Tables']['transacciones']['Insert'] ={
    confirmado: Number(0),
    fichas: Number(monto),
    id_billetera: billetera.id,
    imagen: '',
    plataforma: '',
    referencia: '',
    responsable: '',
    tasa: 0,
    tipo: -1,
  }
  const result =await addTransaccion(transaccion)
  if(result.length===0){
    Toast.show({
      type: 'error',
      text1: 'Retiro en Proceso',
      text2: 'Se ha producido un error 👋'
    });
  }
}
}
  
     
Toast.show({
        type: 'success',
        text1: 'Retiro en Proceso',
        text2: 'Se revisará sú petición y será atendido en muy poco tiempo 👋'
      });
      setMonto('')
      setImagen('')
      setImagenUpdated(false) 
router.push('/usuario')
  }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('@/assets/images/credito.png')}
          style={[styles.image, { width: ancho, height: alto }]}
        >
          <View style={[styles.cardContainer, ]}>
            <View style={[styles.visa,{height:alto*0.2}]}>
              <View>
                <Text style={styles.cardHolder}>
                  Visa TvBurrera
                </Text>
                <Text style={styles.info}>{profile.full_name}</Text>
                {/* <Text style={styles.info}>edwinhenriquezh@gmail.com</Text> */}
                <Text style={styles.info}>{profile.phone}</Text>
              </View>
              <Image style={styles.tv} source={require('@/assets/images/tvburrera.jpg')} />
            </View>
            <View style={styles.dispo}>
              <Text style={styles.cardNumber}>Disponibilidad</Text>
              <Text style={styles.cardNumber}>{disponibilidad}</Text>
              <Text style={styles.cardNumber}>fichas</Text>

            </View>
            <View style={styles.dispo}>
              <Text style={styles.cardNumber}>Por Confirmar</Text>
              <Text style={styles.cardNumber}>17</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={{ marginTop: 10 }} />
      {/* Email y Password */}
      <View style={{ marginTop: 0 }}>
        <ThemeTextInput
          placeholder="Monto a Retirar"
          keyboardType='numeric'
          icon="cash-outline"
          value={monto}
          onChangeText={setMonto}
        />
      </View>

      {/* Spacer */}
      <View style={{ marginTop: 10 }} />


      <ThemedButton icon="cloud-upload-outline"
        onPress={() => procesar()}
      >Procesar Retiro </ThemedButton>

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

  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',
    resizeMode: 'cover',   // Centra horizontalmente
    borderRadius: 8, // Fondo semitransparente para mejor legibilidad


  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,.5)',

  },
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

  cardContainer: {
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,.5)',// O usar LinearGradient
    elevation: 10, // Sombra en Android
    shadowColor: '#000', // Sombras en iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardNumber: {
    color: 'white',
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 40,
  },
  cardHolder: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  visa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'trasparent',
    width:'100%',
    height:'auto',
    marginVertical:0
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

export default RetiraCard