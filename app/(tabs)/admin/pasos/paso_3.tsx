import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const paso_3 = () => {
  return (
    <View>
      <Text>paso_3</Text>
      <Link href="../pasos/paso_4">Ir al paso 4</Link>
    </View>
  )
}

export default paso_3