import { useThemeColor } from '@/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import React from 'react'

const PollasLayout = () => {
    const color = useThemeColor({}, 'tint' )
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='user' />
            <Stack.Screen name='cartera' />
            <Stack.Screen name='recargar_cartera' />
            <Stack.Screen name='retirar_cartera' />
            <Stack.Screen name='apuestas' options={{headerTitleStyle:{ color: color }, headerShown:true, title: 'Mis Apuestas', headerTitleAlign:'center',
            headerLeft: () => (
            <Ionicons 
              name="arrow-back-circle-outline" 
              size={24} 
              color={color} 
              onPress={() => router.replace('/usuario')} 
            />)}}
            />


        </Stack>
    )
}

export default PollasLayout