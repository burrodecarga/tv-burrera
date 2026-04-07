import { Stack } from 'expo-router'
import React from 'react'

const PollasLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }} initialRouteName='index'>
      <Stack.Screen name="index" options={{ title: 'Pollas' }} />
      <Stack.Screen name="page" options={{ title: 'Datos de Carrera' , presentation: 'modal', animation: 'slide_from_bottom', }} />
    </Stack>
     
  )
}

export default PollasLayout