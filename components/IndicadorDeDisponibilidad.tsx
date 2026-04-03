import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CircularProps {
  disponibilidad?: number,
  monto?: number,
  tipo?: string,
  altura:number
}
const IndicadorDeDisponibilidad: FC<CircularProps> = ({ disponibilidad = 0, monto = 0, tipo = 'retiro',altura }) => {

  const [title, setTitle] = useState('Retiro de Cartera')
  const [confirmar, setConfirmar] = useState(0)



  useEffect(() => {
    if (tipo !== 'retiro') {
      setTitle('Depósito a Cartera')
      setConfirmar(prev => prev - monto);
    } else {
      setConfirmar(prev => prev + monto);
    }
  }, [monto])
  return (
    <View style={[styles.container,{height:altura*0.3}]}>
      <Text style={[styles.text, { fontWeight: 'bold', fontSize:22 }]}>{title}</Text>
      <View>
        <Text style={styles.text}>Disponibilidad</Text>
        <Text style={[styles.text, { fontWeight: 'bold', fontStyle: 'italic' }]}>{disponibilidad} $</Text>
      </View>

      <View>
       </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#4b4949',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: '#a39b9b', fontSize: 16,fontWeight: 'bold', textAlign: 'center'
  }
});


export default IndicadorDeDisponibilidad