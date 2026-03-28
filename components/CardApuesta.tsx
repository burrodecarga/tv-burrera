import { useThemeColor } from '@/hooks/use-theme-color'
import { ApuestaById } from '@/lib/api'
import { Entypo } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ApuestaProps = {
  apuesta: ApuestaById | null
}

const CardApuesta = ({ apuesta }: ApuestaProps) => {
  const color = useThemeColor({},'tint')
  return (
    <View style={{borderWidth:1,}}>
       <Text style={styles.polla} adjustsFontSizeToFit={true}
numberOfLines={1}>{apuesta?.polla}</Text>
    <View style={styles.container}>
      <Image source={require('../assets/images/tvburrera.jpg')} style={styles.coverImage} />
      
      <View style={{ flexDirection: 'column', marginLeft: 10,flex:1 }}>
         <Text style={styles.title}>Apuesta</Text>
        <Text style={styles.apuesta}>1ra : {apuesta?.carrera_1}</Text>
        <Text style={styles.apuesta}>2da : {apuesta?.carrera_2}</Text>
        <Text style={styles.apuesta}>3ra : {apuesta?.carrera_3}</Text>
        <Text style={styles.apuesta}>4ta : {apuesta?.carrera_4}</Text>
        <Text style={styles.apuesta}>5ta : {apuesta?.carrera_5}</Text>
        <Text style={styles.apuesta}>6ta : {apuesta?.carrera_6}</Text>
      </View>
      <View style={{ flexDirection: 'column', marginLeft: 10,justifyContent:'center',alignItems:'center',flex:1}}>
        <Text style={styles.apuesta}>PTOS</Text>
        <Text style={styles.apuesta}>27</Text>
        <Text style={styles.apuesta}>POS</Text>
        <Text style={styles.apuesta}>3</Text>
         <Text style={styles.apuesta}>Gana</Text>
        <Text style={styles.apuesta}>73</Text>
      </View>
        <View style={{ flexDirection: 'column', marginLeft: 10,justifyContent:'center',alignItems:'center',flex:1 }}>
<TouchableOpacity>
  <Entypo name="price-ribbon" size={44} color={color} />
</TouchableOpacity>
      </View>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: .1,
    shadowRadius: 4,
    elevation: 10,
    margin: 10
  },
  coverImage: {
    height: 90,
    width: '30%',
    borderRadius: 8
  },
  detailContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10

  },
  polla: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '700',
    marginLeft:10

  },
  title: {
    fontSize: 10,
    textAlign: 'justify',
    fontWeight: '700',
    marginLeft:10

  },
  apuesta: {
    fontSize: 10,
    textAlign: 'justify',
    fontWeight: '700',
    marginLeft:10

  }
})
export default CardApuesta