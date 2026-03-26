import { Stack } from 'expo-router'
import React from 'react'

const PollasLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='bets' />
    </Stack>
  )
}

export default PollasLayout