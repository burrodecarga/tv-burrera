import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import RecargaForm from '@/components/RecargaForm';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PAGO } from '@/constants/Pagos';
import { Fonts } from '@/constants/theme';
import { fetchTasasDeCambio, TasaDeCambio, TasasDeCambio } from '@/lib/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function TabTwoScreen() {

  const [monedas, setMonedas] = useState<TasasDeCambio>()
  const [moneda, setMoneda] = useState<TasaDeCambio>()
  const [plataforma, setPlataforma] = useState('')
  const [loading, setLoading] = useState(false)
  const [tasa, setTasa] = useState(1)
  const [fichas, setFichas] = useState(1)
  const [monto, setMonto] = useState(0)
  const [procesar, setProcesar] = useState(false)
  const [info, setInfo] = useState('')
  const [seleccion1, setSeleccion1] = useState(false)
  const [seleccion2, setSeleccion2] = useState(false)


  const handleSelectMoneda = (value: number) => {
    setSeleccion1(true)
    setTasa(value)
    setMonto(0)
setProcesar(false) 
setInfo('')  
}
  const handleSelectFichas = (value: number) => {
    setSeleccion2(true)
    setFichas(value)
    setMonto(0)
setProcesar(false) 
setInfo('')
  }

  const calcularMonto = (f: number, tasa: number) => {
    const total = f * tasa
    setMonto(total)
    setProcesar(true)
    const texto = 'Evidencia para Recargar :'+monto+' '+fichas+'  mediante '+plataforma
    setInfo(`Recargar :{monto+' '+fichas+'  mediante '+plataforma}`)


  }

  const handleSubmit =()=>{}


  useEffect(() => {
    setLoading(true)
    const getTasaDeCambio = async () => {
      const result = await fetchTasasDeCambio()
      setMonedas(result)
      setLoading(false)
    }
    getTasaDeCambio()
  }, [])




  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    )
  }

  //console.log(moneda)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#50a6df', dark: '#353636' }}
      

      headerImage={
        <AntDesign name="line-chart" size={120} color="#cbeb91" style={{ margin: 'auto' }} />
      }>
      <ThemedView style={[styles.titleContainer]}>
        <ThemedText
          type="subtitle"
          style={{
            fontFamily: Fonts.rounded,
            fontSize:14, marginVertical:0
          }}>
          Recarga
        </ThemedText>
      </ThemedView>
      <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center' }}>
        
      <View style={{ flex:1, borderWidth:1, borderRadius:8,marginRight:6}}>
        <ThemedText
          type="default"
          style={{
            fontFamily: Fonts.rounded,
            fontSize:12,textAlign:'center'
          }}>
          Sel. Moneda
        </ThemedText>
        <Picker
        style={{fontSize:10}}
         itemStyle={{fontSize:10}}
          selectedValue={moneda?.tasa}
          onValueChange={(itemValue, itemIndex) =>
            handleSelectMoneda(itemValue)
          }>
          {monedas && monedas.map((moneda, index) => <Picker.Item 
          label={moneda.moneda + ' tasa: ' + moneda.tasa} value={moneda.tasa} />)}

        </Picker>
        </View>
             <View style={{ flex:1, borderWidth:1, borderRadius:8,}}>

        <ThemedText
          type="default"
          style={{
            fontFamily: Fonts.rounded,
            fontSize:12, textAlign:'center'
          }}>
          Cant. de Fichas
        </ThemedText>
        <Picker
          selectedValue={fichas}
          onValueChange={(itemValue, itemIndex) =>
            handleSelectFichas(itemValue)
          }>
          <Picker.Item label="1 ficha" value={1} />
          <Picker.Item label="2 fichas" value={2} />
          <Picker.Item label="3 fichas" value={3} />
          <Picker.Item label="4 fichas" value={4} />
          <Picker.Item label="5 fichas" value={5} />
          <Picker.Item label="10 fichas" value={10} />
          <Picker.Item label="15 fichas" value={15} />
          <Picker.Item label="20 fichas" value={20} />
          <Picker.Item label="25 fichas" value={25} />
          <Picker.Item label="50 fichas" value={50} />
          <Picker.Item label="75 fichas" value={75} />
          <Picker.Item label="100 fichas" value={100} />
        </Picker>


      </View>
      </View>
      <View style={{flexDirection:'row', backgroundColor: '#0a4e7a', padding: 8, borderWidth: 1, borderColor: '#fff', borderRadius: 10 }}>
      <View style={{flex:1, backgroundColor:'#fff', marginHorizontal:6, borderRadius:10, padding:6}}>
        <ThemedText
          type="default"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Plataforma de Pago
        </ThemedText>
        <Picker
          selectedValue={plataforma}
          onValueChange={(itemValue, itemIndex) =>setPlataforma(itemValue)}>
          {
            PAGO.map(p => <Picker.Item label={p} value={p} />)
          }
        </Picker>
      </View >
      <View style={{flex:1/2}}>
        <TouchableOpacity disabled={!seleccion1 && !seleccion2 } onPress={() => calcularMonto(tasa, fichas)} style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, borderColor: '#fff', borderWidth: 1 }}>
          <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>Caluclar</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', marginVertical: 10 }}>{monto} </Text>
      </View>
      </View>
      <View style={{backgroundColor:'red', flex:1}}>
        <Text style={{backgroundColor:'#0a4e7a', color:'#fff', textAlign:'center', padding:6, fontSize:8}}>Recargar :{monto+'  mediante '+plataforma+' -> fichas '+fichas}</Text>
      </View>
      <View style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>
{procesar && <RecargaForm onSubmit={handleSubmit} content={info}/>}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
