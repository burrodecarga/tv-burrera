import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const paso_4 = () => {
  return (
    <View>
      <Text>paso_4</Text>
      <Link href="/(tabs)/admin/pasos/paso_1">Ir al paso 1</Link>
    </View>
  )
}

export default paso_4