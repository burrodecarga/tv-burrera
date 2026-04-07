import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const paso_1 = () => {
  return (
    <View>
      <Text>paso_1</Text>
      <Link href="../pasos/paso_2">Ir al paso 2</Link>
    </View>
  )
}

export default paso_1