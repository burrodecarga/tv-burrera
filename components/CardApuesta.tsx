import { ApuestaById } from '@/lib/api'
import React from 'react'
import { Text } from 'react-native'
import Card from './ui/Card'

type ApuestaProps={
    apuesta:ApuestaById|null
}

const CardApuesta = ({apuesta}:ApuestaProps) => {
  return (
    <Card>
      <Text>CardApuesta</Text>
    </Card>
  )
}

export default CardApuesta