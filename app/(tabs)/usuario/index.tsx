import Perfil from '@/components/Perfil'
import Button from '@/components/ui/Button'
import { useThemeColor } from '@/hooks/use-theme-color'
import { useUserInfo } from '@/hooks/userContext'
import { Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const UsuarioScreen = () => {
    const color = useThemeColor({},'tint')
  
  const { height, width } = useWindowDimensions()
  const titulo = 'Confirmar Apuesta'
  const textBody = 'Confirmar Pago de Polla'
  const buttonText = 'Pagar Polla'
  const handleCancel = () => {
    //console.log('CANCLENDO')
  }
  const handleOk = () => {
    //console.log('ON OK')
  }
  const { profile, loading } = useUserInfo()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
      <Perfil profile={profile} uri={profile?.avatar_url} size={140} />
      <View style={{ flex: 1/3, backgroundColor: '#fff', borderWidth:1, margin:10, borderColor:color,   justifyContent:'center', alignItems:'center' }}>
        <Text style={{ color: color, fontSize: 18, fontWeight: 'bold', margin:0 }}>Configuración</Text>
      </View>
      <View style={{ flex: 2, backgroundColor: '#eee4e4',flexDirection:'column', gap:10, padding:10, borderRadius:10, margin:10, marginHorizontal:10 }}>
        

        <Button title='Recargar Cartera' onPress={()=>router.replace('/(tabs)/usuario/recargar_cartera')} icon={<Entypo name="text-document-inverted" size={20} color='white'  />}   variant= 'primary'
  size= 'small'/>

  <Button title='Retirar de Cartera' onPress={()=>router.replace('/(tabs)/usuario/retirar_cartera')} icon={<Entypo name="text-document-inverted" size={20} color='white'  />}   variant= 'primary'
  size= 'small'/>

  <Button title='Mis Apuestas' onPress={()=>router.replace('/(tabs)/usuario/apuestas')} icon={<Entypo name="text-document-inverted" size={20} color='white'  />}   variant= 'primary'
  size= 'small'/>
  
  
        <Button title='Modificar Perfil de Usuario' onPress={()=>router.replace('/(tabs)/usuario/user')} icon={<Entypo name="cog" size={20} color='white'  />}   variant= 'secondary'
  size= 'small'/>

      </View>
        </SafeAreaView>
  )
}

export default UsuarioScreen