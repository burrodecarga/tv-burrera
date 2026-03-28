import { Image } from 'expo-image'
import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

type CardProps={
    ancho?:number,
    alto?:number
}
const RecargaCardImage = ({alto=171,ancho=300}:CardProps) => {
  return (
     <View style={styles.container}>
            <ImageBackground
              source={require('@/assets/images/credito.png')}
              style={[styles.image,{width:ancho,height:alto}]}
            >
               <View style={[styles.cardContainer,{width:ancho,height:alto}]}>
                   <View style={[styles.visa]}>
                       <View>            
                        <Text style={styles.cardHolder}>
                          Visa TvBurrera
                        </Text>
                        <Text style={styles.info}>Edwin Henriquez</Text>
                        <Text style={styles.info}>edwinhenriquezh@gmail.com</Text>
                        <Text style={styles.info}>04144753555</Text>
                       </View>            
                       <Image style={styles.tv} source={require('@/assets/images/tvburrera.jpg')}/>
                   </View>
                    <View style={styles.dispo}>
                        <Text style={styles.cardNumber}>Disponibilidad</Text>
                        <Text style={styles.cardNumber}>73</Text>
                                   <Text style={styles.cardNumber}>fichas</Text>
             
                    </View>
                    <View style={styles.dispo}>
                        <Text style={styles.cardNumber}>Por Confirmar</Text>
                        <Text style={styles.cardNumber}>17</Text>
                    </View>
                        <Text style={styles.titleContainer}>Visa TvBurrera</Text>
                      </View>
            </ImageBackground>
          </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',
    resizeMode: 'cover' ,   // Centra horizontalmente
 borderRadius:8, // Fondo semitransparente para mejor legibilidad


  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 10,
        backgroundColor: 'rgba(0,0,0,.5)',

  },
  headerImage: {
    color: '#b45050',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  
  cardContainer: {
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,.5)',// O usar LinearGradient
    elevation: 10, // Sombra en Android
    shadowColor: '#000', // Sombras en iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardNumber: {
    color: 'white',
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 40,
  },
  cardHolder: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  visa:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    backgroundColor:'trasparent'
  },
  tv:{
    width:60,
    height:60
  },
  info:{
    fontSize:10,
    color:'#fff'
  },
  dispo:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    gap:16
  }
 
});

export default RecargaCardImage