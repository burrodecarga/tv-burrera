import { Database } from '@/db_types'
import { useThemeColor } from '@/hooks/use-theme-color'
import { addTransaccion } from '@/lib/api'
import { Billetera } from '@/lib/types'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { router } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import ThemedButton from './ThemedButton'
import ThemeTextInput from './ThemeTextInput'
import Pago from './ui/Pago'


type CardProps = {
  ancho?: number,
  alto?: number,
  billetera:Billetera
}
const RecargaCard = ({ alto = 171, ancho = 300,billetera }: CardProps) => {
  const [phone, setPhone] = useState('')
  const [referencia, setReferencia] = useState('')
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
    if (imagen.length === 0 || monto.length === 0 || referencia.length===0) {
      Toast.show({
        type: 'error',
        text1: 'Error en Procesamiento',
        text2: 'Debe enviar un monto y una imagen del pago movil 👋'
      });
    return
    }
   
      const transaccion:Database['public']['Tables']['transacciones']['Insert'] ={
        confirmado: Number(0),
        fichas: Number(monto),
        id_billetera: billetera.id!,
        imagen: imagen,
        plataforma: '',
        referencia: referencia,
        responsable: '',
        tasa: 0,
        tipo: 1,
      }
      const result = await addTransaccion(transaccion)     
      //console.log('INSERT',billetera,imagen, monto, referencia)
      
      Toast.show({
              type: 'success',
              text1: 'Recarga en Proceso',
              text2: 'Se revisará sú petición y será atendido en muy poco tiempo 👋'
            });

            setMonto('')
            setReferencia('')
            setImagen('')
            setImagenUpdated(false)       
        router.push('/usuario')

  }

  //console.log(imagen)
  return (
    <View>

      <Text style={{textAlign:'center', fontSize:18, fontWeight: 'bold', marginVertical: 10 }}>Recarga de Cartera</Text>
      
      <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: imagen.length > 0 ? 'flex' : 'none' }} >
        {/* evidencia*/}
        {imagen.length > 0 && <Pago uri={imagen} size={150} />}
        <TouchableOpacity style={{ borderWidth: 1, borderColor: color, borderRadius: 100 }} onPress={() => setImagen("")}>
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
         <ThemeTextInput
          placeholder="N° de Referencia"
          keyboardType='numeric'
          icon="cash-outline"
          value={referencia}
          onChangeText={setReferencia}
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
    </View>
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