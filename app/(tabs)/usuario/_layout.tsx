import { Stack } from 'expo-router'
import React from 'react'

const PollasLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='user' />
            <Stack.Screen name='cartera' />
            <Stack.Screen name='recargar_cartera' />
            <Stack.Screen name='retirar_cartera' />

        </Stack>
    )
}

export default PollasLayout