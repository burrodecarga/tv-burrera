import { ApuestasById, fetchApuestasById, fetchBilleteras, TypeFectchBilletera } from '@/lib/api'
import { Profile } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardApuesta from './CardApuesta'

type ProfileProps = {
  profile: Profile | null
 
}
const ListadoDeApuestas = ({profile}:ProfileProps) => {
            const [billetera, setBilletera] = useState<TypeFectchBilletera|undefined>()
  const [apuestas, setApuestas] = useState<ApuestasById>()  
  const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(true)


      useEffect(() => {
      if(!profile)return
         setLoading(true)
          const getDisponibilidad = async  ()=> {
            
            const res = await fetchBilleteras(profile.id)
            if(res) setBilletera(res[0])
              setLoading(false)
      
          }
          getDisponibilidad()
        }, [])

  useEffect(() => {
      if(!profile)return
      setLoading1(true)
          const getApuestas = async  ()=> {
            
            const res = await fetchApuestasById(profile.id)
            if(res) setApuestas(res)
              setLoading1(false)
      
          }
          getApuestas()
        }, [])
      
  if (loading1||loading) {
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Cargando...</Text>
        </SafeAreaView>
      )
    }
            
  return (
    <View>
      <FlatList
      data={apuestas}
      keyExtractor={item=>item.id}
      renderItem={({item})=><CardApuesta apuesta={item}/>}
      />
    </View>
  )
}

export default ListadoDeApuestas