import ThemeTextInput from '@/components/ThemeTextInput';
import Card from '@/components/ui/Card';
import { Hipodromos, fetchHipodromos } from '@/lib/api';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from 'react-native-safe-area-context';

type MODO = 'date' | 'time' | 'datetime'
type TIPO = 'FECHA_DE_POLLA' | 'FECHA_DE_CIERRE' | 'HORA_DE_CIERRE'
type POLLA = {
  polla: string
  fecha: Date
  fecha_de_cierre: Date,
  hora_de_cierre?: Date,
  hipodromo?: string,
  precio?: number
}
const CrearPollaSCreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState<MODO>('date')
  const [type, setType] = useState<TIPO>('FECHA_DE_POLLA')
  const [hipodromos, setHipodromos] = useState<Hipodromos>()
  const [polla, setPolla] = useState<POLLA>({
    polla: '',
    fecha: new Date(),
    fecha_de_cierre: new Date(),
    hora_de_cierre: new Date(),
    hipodromo: '',
    precio: 0
  })

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    switch (type) {
      case 'FECHA_DE_POLLA':
        setPolla({ ...polla, fecha: date })
        // Handle fecha de polla logic
        break;
      case 'FECHA_DE_CIERRE':
        setPolla({ ...polla, fecha_de_cierre: date })
        // Handle fecha de polla logic
        break;

      case 'HORA_DE_CIERRE':
        setPolla({ ...polla, hora_de_cierre: date })
        // Handle fecha de polla logic
        break;

      default:
        break;
    }
    hideDatePicker();
  };

  const fechaPolla = () => {
    setMode('date')
    setType('FECHA_DE_POLLA')
    showDatePicker()
  }

  const fechaCierrePolla = () => {
    setMode('date')
    setType('FECHA_DE_CIERRE')
    showDatePicker()
  }

  const horaCierrePolla = () => {
    setMode('time')
    setType('HORA_DE_CIERRE')
    showDatePicker()
  }

  useEffect(() => {
    const getHipodromos = async () => {
      const data = await fetchHipodromos()
      setHipodromos(data)
    }
    getHipodromos()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', gap: 20, paddingVertical: 20 }}>
      <Card style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, }}>
        <Text style={{fontSize:10}}>Polla:{polla.polla}</Text>
        <Text style={{fontSize:10}}>Fecha de Polla : {polla.fecha.toLocaleDateString()}</Text>
        <Text style={{fontSize:10}}>Fecha de Cierre de la Polla : {polla.fecha_de_cierre.toLocaleDateString()}</Text>
        <Text style={{fontSize:10}}>Hora de Cierre de la Polla : {polla.hora_de_cierre?.toLocaleTimeString('es-ES', {
  hour: '2-digit',
  minute: '2-digit',
  hour12:true
})}</Text>
              <Text style={{fontSize:10}}>Precio de la Polla : {polla.precio?.toFixed(0)} fichas</Text>
  
      </Card>
      <View style={{ width: '70%', flexDirection: 'column', gap: 20 }}>
        <ThemeTextInput placeholder='Nombre de la polla' style={{ width: '100%' }} icon='newspaper-outline'
          value={polla.polla}
          onChangeText={(text) => setPolla({ ...polla, polla: text })}
        />
         <ThemeTextInput
         keyboardType='numeric' 
           placeholder='Precio de la polla' 
           style={{ width: '100%' }} 
           icon='newspaper-outline'
          value={polla.precio?.toString()}
          onChangeText={(text) => setPolla({ ...polla, precio: parseFloat(text) || 0 })}
        />
        <Button title="Fecha de la Polla" onPress={fechaPolla} />
        <Button title="Fecha de cierre de Polla" onPress={fechaCierrePolla} />
        <Button title="Hora de cierre de Polla" onPress={horaCierrePolla} />

        <View style={{flexWrap:'wrap', flexDirection: 'row', flex: 1, justifyContent: 'space-between', width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}>
          <Button title="1ra" onPress={()=>router.replace('/modal')} />
          <Button title="2da" onPress={fechaCierrePolla} />
          <Button title="3ra" onPress={horaCierrePolla} />
         
        </View>
        <View style={{flexWrap:'wrap', flexDirection: 'row', flex: 1, justifyContent: 'space-between', width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}>
          
          <Button title="4ta" onPress={fechaPolla} />
          <Button title="5ta" onPress={fechaCierrePolla} />
          <Button title="6ta" onPress={horaCierrePolla} />
        </View>
        </View>
    
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={mode}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default CrearPollaSCreen