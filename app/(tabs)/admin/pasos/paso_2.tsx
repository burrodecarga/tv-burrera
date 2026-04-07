import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const paso_2 = () => {
  return (
    <View>
      <Text>paso_2</Text>
      <Link href="../pasos/paso_3">Ir al paso 3</Link>
    </View>
  )
}

export default paso_2