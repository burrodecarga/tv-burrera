import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'


type Props={
    item:string,
    index:number,
    selected:number,
    recargar:(value:number)=>void
}
const MetdoPago = (pago:Props) => {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor:pago.selected==pago.index? '#0d5549':'#08a88e'}]} onPress={()=>pago.recargar(pago.index)}>
      <Text style={styles.text}>{pago.item}</Text>
    </TouchableOpacity>
  )
}

export default MetdoPago

const styles = StyleSheet.create({
    container:{
flex:1,
marginHorizontal:30,
justifyContent:'center',
alignItems:'center',
backgroundColor:'#fff',
marginVertical:8
    },
    text:{
        width:'90%',       
        textAlign:'center',
        color:'#fff',
        fontSize:14,
        fontWeight:'bold',
        marginVertical:0,
        padding:5,
        borderRadius:10
    }
})