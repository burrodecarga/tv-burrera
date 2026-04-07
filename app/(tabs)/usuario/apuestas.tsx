import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useUserInfo } from '@/hooks/userContext'
import { ApuestasById, fetchApuestasById } from '@/lib/api'
import { Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ApuestasScreen = () => {
  const [apuestas, setApuestas] = useState<ApuestasById>()

  const { session, loading, disponibilidad } = useUserInfo()



  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    )
  }

  useEffect(() => {
    if (!session) return
    if (session.user.id) {
      const getApuestas = async () => {
        try {
          const response = await fetchApuestasById(session.user.id).then((data) => {
            setApuestas(data)
          });
        } catch (error) {
          console.error('Error fetching apuestas:', error);
        }
      }
      getApuestas()
    }
  }, [disponibilidad, session?.user.id])

  //console.log(apuestas)
  return (
    <SafeAreaView style={{ flex: 1 }}>  
    <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 10 }}>
      <FlatList
   
        data={apuestas}
        renderItem={({ item }) =>
        (<Card style={{ margin: 10, padding: 10 }}>
          <Text style={[styles.text,{fontSize:16, fontWeight:'bold'}]}>{item.polla}</Text>
           <Text style={[styles.text,{fontSize:12, fontWeight:'bold'}]}>Precio: {item.fichas} ficha(s)</Text>
          <Card style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}> 
            <View>
             <Text>Carrera</Text>
            <Text style={styles.text}>1ra Carrera : </Text>
            <Text style={styles.text}>2da Carrera : </Text>
            <Text style={styles.text}>3ra Carrera : </Text>
            <Text style={styles.text}>4ta Carrera : </Text>
            <Text style={styles.text}>5ta Carrera : </Text>
            <Text style={styles.text}>6ta Carrera : </Text>
          </View>
          <View>
              <Text>Ejemplar</Text>
            <Text style={styles.text}> {item.carrera_1}</Text>
            <Text style={styles.text}> {item.carrera_2}</Text>
            <Text style={styles.text}> {item.carrera_3}</Text>
            <Text style={styles.text}> {item.carrera_4}</Text>
            <Text style={styles.text}> {item.carrera_5}</Text>
            <Text style={styles.text}> {item.carrera_6}</Text>
          </View>
          <View>
            <Text>Puntos</Text>
            <Text  style={styles.text}> {item.puntos}</Text>
            <Text  style={styles.text}> {item.puntos}</Text>
            <Text  style={styles.text}> {item.puntos}</Text>
            <Text  style={styles.text}> {item.puntos}</Text>
            <Text  style={styles.text}> {item.puntos}</Text>
            <Text  style={styles.text}> {item.puntos}</Text>
          </View>
           </Card>
           <Button title='Ver Resultado' onPress={()=>{}} icon={<Entypo name="eye" size={20} color="white" />} />
        </Card>)}
      />
    </View>
   
          <Button title='Regresar' onPress={() => router.replace('/(tabs)/usuario')} style={{ marginHorizontal:10, }} variant='danger' icon={<Entypo name="arrow-long-left" size={20} color='white' />}  />  
    <View style={{ height: 0 }} />
      <StatusBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text:{
    textAlign:'center',
    fontSize: 12,
    fontWeight: '700',
  }
})

export default ApuestasScreen