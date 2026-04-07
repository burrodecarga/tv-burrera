import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { POLLA } from '.'

const PageModal = (polla:POLLA) => {
  return (
    <View>
      <Link href="/(tabs)/admin" style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 5 }}>
        Volver a Admin
      </Link>
      <Text>{polla.polla}</Text>
    </View>
  )
}

export default PageModal