import { useUserInfo } from '@/hooks/userContext'
import { ApuestasById, fetchApuestasById } from '@/lib/api'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ApuestasScreen = () => {
    const [apuestas, setApuestas] = useState<ApuestasById>()

const { session, loading } = useUserInfo()



if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    )
  }

  useEffect(() => {
    if(!session) return
    if (session.user.id) {
     const getApuestas = async () => {
        try {          const response = await fetchApuestasById(session.user.id).then((data) => {
            setApuestas(data)       })  ;
          } catch (error) {
          console.error('Error fetching apuestas:', error);
        }
     }
     getApuestas()
    }
  }, [])

console.log(apuestas)
  return (
    <SafeAreaView>
      <Text>ApuestasScreen</Text>
      <StatusBar/>
    </SafeAreaView>
  )
}

export default ApuestasScreen