import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast'

type AlertProps={
    boton?:string
    color?: string
    titulo:string
    textBody:string|undefined
    buttonText:string
   
}
const Alert = ({titulo,textBody,buttonText,color='#fff',boton='Ok'}:AlertProps) => {
  return (
    <TouchableOpacity
        onPress={() =>
          Popup.show({
            type: 'success',
            title: titulo,
            textBody: textBody,
            buttonText: 'OK',
            callback: () => Popup.hide()
          })
        }
    >
      <Text style={{padding:6, justifyContent:'center', alignItems:'center', textAlign:'center', backgroundColor:'#269405', margin:'auto', borderRadius:8, width:'100%',color:color}}>{boton}</Text>
    </TouchableOpacity>
  )
}

export default Alert