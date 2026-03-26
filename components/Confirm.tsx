import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


type ConfirmProps={
    boton?:string
    color?: string
    titulo:string
    textBody:string|undefined
    buttonText:string
    onCancel:()=>void
    onOk:()=>void
    
}
const Confirm = ({boton='Confirmar',color='#fff',titulo,textBody,buttonText,onCancel,onOk}:ConfirmProps) => {
  return (
        <TouchableOpacity
            onPress={() =>
                Popup.show({
                    type: 'confirm',
                    title: titulo,
                    textBody: textBody,
                    buttonText: buttonText,
                    confirmText: 'Cancelar',
                    callback: () => {
                        alert('Okey Callback && hidden');
                        onOk()
                        Popup.hide();
                    },
                    cancelCallback: () => {
                        alert('Cancel Callback && hidden');
                        onCancel()
                        Popup.hide();
                    },
                })
            }
        >
            <Text style={{padding:6, justifyContent:'center', alignItems:'center', textAlign:'center', backgroundColor:'#269405', margin:'auto', borderRadius:8, width:'100%',color:color}}>{boton}</Text>
        </TouchableOpacity>
  )
}

export default Confirm