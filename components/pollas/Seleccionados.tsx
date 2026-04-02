import { BANDERAS, BG, TEXTO } from '@/constants/Values'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

const bg = '#979090'
  const te = '#000000'
  const ne = '#000000'

type Props = {caballo:number, carrera:string}  
const Seleccionados = ({caballo,carrera}:Props) => {
  return (
              <Text style={[styles.cuadro, {  backgroundColor: caballo === 0 ? BG : BANDERAS[caballo], color: caballo === 0 ? BG:TEXTO[caballo] }]}>{carrera}</Text>
    
  )
}

const styles = StyleSheet.create({
  cuadro: {
    fontWeight: '600', fontSize: 12, textAlign: 'center', width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center'
  },})
  
export default Seleccionados