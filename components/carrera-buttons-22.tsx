import { BANDERAS, Caballos } from '@/constants/Values'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CaballoButton22 from './CaballoButton2'

type Props = {
  carrera: number
  num_caballos: number
  selected?:number
  
  onSeleccion: (carrera: number, caballo: number) => void
  }
const CarreraButton22 = ({ carrera, selected =0,num_caballos,onSeleccion}: Props) => {
 
  return (
<View style={{flex:1, }}>
     <Text style={{fontWeight:'bold',textAlign:'center', marginTop:20,marginBottom:5, borderTopWidth:1,fontSize:12}}>Carrera N° {carrera}</Text>     
    <View style={{}}>
      <View style={{ flexDirection: 'row', alignItems: 'center'  }}>
     
      <ScrollView style={{backgroundColor:'#979090', borderWidth:0}} horizontal showsHorizontalScrollIndicator={false}>
        {Caballos.slice(0,num_caballos).map((caballo, index) => (
          <CaballoButton22 key={index} label={String(caballo)} onPress={() =>onSeleccion(carrera, caballo)} 
           color={selected === caballo ? '#031804' : BANDERAS[index+1]} 
            checked={selected === caballo ? true : false} 
          
           />
        ))}

      </ScrollView>
      </View>
    </View>
    </View>
  )
}

export default CarreraButton22

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the ScrollView has a bounded height
    padding: 10,
    height:100,
    backgroundColor:'#55c03f',
    borderWidth:0,
    margin:10
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width:'100%',
     height:100,
     marginVertical:10

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