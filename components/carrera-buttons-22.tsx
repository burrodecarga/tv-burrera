import { BANDERAS, CABALLOS } from '@/constants/Values'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CaballoButton22 from './CaballoButton2'

type Props = {
  carrera: number
  num_caballos: number
  selected?: number
  distancia?: number
  hora?: string

  onSeleccion: (carrera: number, caballo: number) => void
}
const CarreraButton22 = ({ carrera, selected = 0, num_caballos, onSeleccion }: Props) => {

  return (
   <View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 5, }} >

          <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 12 }}>Carrera N° {carrera}</Text>
<Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 10 }}>Distancia {carrera}</Text>
<Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 10 }}>Hora {carrera}</Text>
          </View>
          <ScrollView style={{   }} horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{   }}
          
          >
            {CABALLOS.slice(0, num_caballos).map((caballo, index) => (
              <CaballoButton22 key={index} label={String(caballo)} onPress={() => onSeleccion(carrera, caballo)}
                color={selected === caballo ? BANDERAS[index + 1] : BANDERAS[index + 1]}
                checked={selected === caballo ? true : false}

              />
            ))}

          </ScrollView>
        </View>      
   </View>
   
  )
}

export default CarreraButton22

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the ScrollView has a bounded height
    padding: 10,
    height: 100,
    backgroundColor: '#55c03f',
    borderWidth: 0,
    margin: 10
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%',
    height: 100,
    marginVertical: 10

  },
  //   view:{
  //  flex:1/6,
  //         width: 50,
  //         height: 60,
  //         backgroundColor: '#3069d1',
  //         borderRadius: 5,
  //         marginHorizontal: 10,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //   }

})