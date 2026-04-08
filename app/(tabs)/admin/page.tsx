import Loading from '@/components/Loading'
import Card from '@/components/ui/Card'
import { POLLA } from '@/lib/types'
import { getFecha } from '@/utils/date'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const PageModal = () => {
  const [polla, setPolla] = React.useState<POLLA | null>(null)
  const [loading, setLoading] = useState(false)


  const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('newPolla');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

useEffect(() => {
  setLoading(true)
  const getNewPolla=async ()=>{
  try {
   const res= await getData()
   if (res) {
     setPolla(res)
   }
  } catch (error) {
    console.log(error)
  }finally {
    setLoading(false)
  }}
  getNewPolla()
}, [])

if (loading) {
  return <Loading/>
}

console.log(polla?.nombre)
  return (
    <View>
      <Link href="/(tabs)/admin" style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 5 }}>
        Volver a Admin
      </Link>
        <Card style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2,  flexDirection: 'column', padding: 10, marginTop: 20 }}>
                  <Text style={{ fontSize: 10, fontWeight: 700 }} disabled>{polla?.nombre}</Text>
                  <Text style={{ fontSize: 9 }}>Hipódromo:{polla?.hipodromo}</Text>
                  <Text style={{ fontSize: 9 }}>
                    Fecha de Polla : {polla?.fecha ? getFecha(polla.fecha.toString()) : ''}
                  </Text>
                  <Text style={{ fontSize: 9 }}>
                    Fecha de Polla : {polla?.fecha_de_cierre ? getFecha(polla.fecha_de_cierre.toString()) : ''}
                  </Text>
                  <Text style={{ fontSize: 9 }}>
                    Fecha de Polla : {polla?.hora_de_cierre ? getFecha(polla.hora_de_cierre.toString()) : ''}
                  </Text>
                 <Text style={{ fontSize: 10 }}>Precio de la Polla : {polla?.precio?.toFixed(0)} fichas</Text> 
      
                </Card>
    </View>
  )
}

export default PageModal