import { Stack } from 'expo-router'
import React from 'react'

const PollasLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='user' />
            <Stack.Screen name='recarga' />
            <Stack.Screen name='cartera' />


        </Stack>
    )
}

export default PollasLayout