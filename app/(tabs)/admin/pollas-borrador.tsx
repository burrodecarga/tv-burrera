import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const PollasBorradorScreen = () => {
  return (
    <View>
      <Link href={'/(tabs)/admin/crear-polla'}>
      
      <Text>PollasBorradorScreen</Text>
      </Link>      
    </View>
  )
}

export default PollasBorradorScreen