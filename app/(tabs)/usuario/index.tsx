import Confirm from '@/components/Confirm'
import ListadoDeApuestas from '@/components/ListadoDeApuestas'
import Perfil from '@/components/Perfil'
import { useUserInfo } from '@/hooks/userContext'
import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const UsuarioScreen = () => {
  const { height,width }=useWindowDimensions()
  const titulo='Confirmar Apuesta'
  const textBody='Confirmar Pago de Polla'
  const buttonText='Pagar Polla'
  const handleCancel =()=>{
    //console.log('CANCLENDO')
  }
   const handleOk =()=>{
    //console.log('ON OK')
   }
    const { profile, loading } = useUserInfo()
  return (
    <SafeAreaView style={{flex:1}}>
        <Perfil profile={profile} uri={profile?.avatar_url} size={140}  />
              <View style={{flex:2, backgroundColor:'#fff'}}>
  
        <ListadoDeApuestas profile={profile}/>
        </View>
        <View style={{flex:1, backgroundColor:'#fff'}}>
  
<Confirm 
titulo={titulo}
textBody={textBody}
buttonText={buttonText}
onCancel={handleCancel}
onOk={handleOk}

 />
</View>
      </SafeAreaView>
  )
}

export default UsuarioScreen