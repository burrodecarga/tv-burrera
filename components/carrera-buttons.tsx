import { COLORES } from '@/constants/hexadecimales'
import { Caballos } from '@/constants/Values'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CaballoButton1 from './CaballoButton_1'
import { ThemedText } from './themed-text'

type Props = {
  carrera: number
  num_caballos: number
  selected?:number
  onSeleccion: (carrera: number, caballo: number) => void
}
const CarreraButton = ({ carrera, selected =0,num_caballos,onSeleccion}: Props) => {
  return (

    <View style={styles.col}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <ThemedText style={{fontWeight:'bold'}}>Carrera N° {carrera}</ThemedText>
      <View style={styles.view}>
       <ThemedText lightColor='#fff'>{selected}</ThemedText>
      </View>
      <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
        {Caballos.slice(0,num_caballos).map((caballo, index) => (
          <CaballoButton1 key={index} label={String(caballo)} onPress={() =>onSeleccion(carrera, caballo)} 
           color={selected === caballo ? '#ff0000' : COLORES[index]} 
           />
        ))}

      </ScrollView>
      </View>
    </View>
  )
}

export default CarreraButton

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the ScrollView has a bounded height
    padding: 10,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,

  },
  view:{
 flex:1/6,
        width: 50,
        height: 60,
        backgroundColor: '#3069d1',
        borderRadius: 5,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
  }

})