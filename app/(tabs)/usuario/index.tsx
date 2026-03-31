import ListadoDeApuestas from '@/components/ListadoDeApuestas'
import Perfil from '@/components/Perfil'
import { useThemeColor } from '@/hooks/use-theme-color'
import { useUserInfo } from '@/hooks/userContext'
import { Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
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
        <Text style={{ color: color, fontSize: 18, fontWeight: 'bold', margin:0 }}>Mis Apuestas</Text>
      </View>
      <View style={{ flex: 2, backgroundColor: '#fff' }}>

        <ListadoDeApuestas profile={profile} />
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff', borderWidth:1, margin:10, borderColor:color}}>
      <View style={{ flexDirection: 'row', marginLeft: 10,justifyContent:'space-around',alignItems:'center',flex:1 }}>
<TouchableOpacity style={{flexDirection:'row', borderRadius:100,borderWidth:1,borderColor:color, width:50, height:50, justifyContent:'center',alignItems:'center'}}>
  <Entypo name="price-ribbon" size={18} color={color} />
  <FontAwesome6 name="users-rectangle" size={18} color={color} />
</TouchableOpacity>
<TouchableOpacity onPress={()=>router.push('/(tabs)/usuario/user')}>
  <Ionicons name="settings-outline" size={44} color={color} />
</TouchableOpacity>

<TouchableOpacity onPress={()=>router.push('/(tabs)/usuario/cartera')}>
<FontAwesome6 name="money-check-dollar" size={44} color={color} />
</TouchableOpacity>
      </View>  
      </View>
    </SafeAreaView>
  )
}

export default UsuarioScreen