import { globalStyles } from '@/styles/global-styles';
import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';


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
         style={{justifyContent:'center', alignItems:'center', backgroundColor:'#0e5717', borderRadius:8}}
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
            {/* <Feather name="check-circle" size={size} color={color} /> */}
            <ThemedText style={[globalStyles.buttonText, { fontSize: 9, color:color }]}>Apostar</ThemedText>
        </TouchableOpacity>
  )
}

export default Confirm