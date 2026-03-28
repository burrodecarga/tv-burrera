import { Feather } from '@expo/vector-icons';
import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast';
import React from 'react';
import { TouchableOpacity } from 'react-native';


type ConfirmProps={
    boton?:string
    color?: string
    size?:number
    titulo:string
    textBody:string|undefined
    buttonText:string
    onCancel:()=>void
    onOk:()=>void
    
}
const Confirm = ({boton='Confirmar',color='#fff',titulo,textBody,buttonText,onCancel,onOk,size=40}:ConfirmProps) => {
  return (
        <TouchableOpacity
         style={{justifyContent:'center', alignItems:'center',  }}
            onPress={() =>
                Popup.show({
                    type: 'confirm',
                    title: titulo,
                    textBody: textBody,
                    buttonText: buttonText,
                    confirmText: 'Cancelar',
                    callback: () => {
                      //  alert('Okey Callback && hidden');
                        onOk()
                        Popup.hide();
                    },
                    cancelCallback: () => {
                     //   alert('Cancel Callback && hidden');
                        onCancel()
                        Popup.hide();
                    },
                })
            }
        >
            <Feather name="check-circle" size={size} color={color} />
            {/* <Text style={{fontSize:10, justifyContent:'center', alignItems:'center', textAlign:'center',  margin:'auto', borderRadius:8,  color:color}}>{boton}</Text> */}
        </TouchableOpacity>
  )
}

export default Confirm