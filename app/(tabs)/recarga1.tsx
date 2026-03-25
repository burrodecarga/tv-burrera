import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import RecargaForm from '@/components/RecargaForm';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { fetchPlataformas, Plataformas } from '@/lib/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function TabTwoScreen() {

  const [plataformas, setPlataformas] = useState<Plataformas>()
  const [moneda, setMoneda] = useState('')
  const [plataforma, setPlataforma] = useState('')
  const [loading, setLoading] = useState(false)
  const [tasa, setTasa] = useState(1)
  const [fichas, setFichas] = useState(0)
  const [monto, setMonto] = useState(0)
  const [procesar, setProcesar] = useState(false)
  const [info, setInfo] = useState('')
  const [seleccion1, setSeleccion1] = useState(false)
  const [seleccion2, setSeleccion2] = useState(false)
  const [verBoton, setVerBoton] = useState(false)



  const handleSelectFichas = (value: number, index: number) => {
    if (value === 0) {
      setSeleccion1(prev => false)
      setInfo('')

      return
    }
    setVerBoton(prev => false)
    setSeleccion1(true)
    setFichas(value)
    setMonto(0)
    setProcesar(false)
    setInfo('')
    if (seleccion1 === true && seleccion2 === true) {
      console.log('CIERTO')
      setVerBoton(prev => true)
    } else {
      setInfo('')
      setVerBoton(prev => false)
    }
  }

  const handleSelectPlataforma = (value: any, index: number) => {
    if (value === 0) {
      setSeleccion2(prev => false)
      setInfo('')

      return
    }
    setVerBoton(prev => false)
    setMoneda(value.moneda)
    setTasa(value.tasa)
    setSeleccion2(prev => true)
    setMonto(0)
    setProcesar(false)
    setInfo('')
    if (seleccion1 === true && seleccion2 === true) {
      console.log('CIERTO')
      setVerBoton(prev => true)
    } else {
      setInfo('')

      setVerBoton(prev => false)
    }
  }

  const calcularMonto = (f: number, tasa: number) => {
    //console.log('F',f,'tasa',tasa,'FICHAS',fichas,'TASA',tasa)

    const total = f * tasa
    setMonto(prev=>total)
    setProcesar(true)
    const texto = 'Enviar Evidencia para Recargar :' + total + ' ' + moneda + ', ' + fichas + ' fichas'
    setInfo(texto)


  }

  const handleSubmit = () => { }



  useEffect(() => {
    setLoading(true)
    const getPlataformas = async () => {
      const result = await fetchPlataformas()
      //console.log(result)
      setPlataformas(result)
      setLoading(false)
    }
    getPlataformas()
  }, [])




  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    )
  }

  console.log('PLATAFORMA', plataforma, 'SELECCION1', seleccion1, 'SELECCION2', seleccion2, 'VERBOTON', verBoton)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#50a6df', dark: '#353636' }}

      headerImage={
        <AntDesign name="line-chart" size={120} color="#cbeb91" style={{ margin: 'auto' }} />
      }>
      <ThemedView style={[styles.titleContainer]}>
      </ThemedView>
        <Text
          style={{
            fontFamily: Fonts.rounded,
            fontSize: 12, textAlign: 'center',
            margin:0,
            fontWeight:'bold'
          }}>
          Recargar Fichas
        </Text>
      <View style={{ flex: 1, borderWidth: 1, borderRadius: 8, }}>
        <Picker
        
          selectedValue={fichas}
          onValueChange={(itemValue, itemIndex) =>
            handleSelectFichas(itemValue, itemIndex)
          }>
          <Picker.Item label="Seleccionar cantidad de Fichas" value={0}   style={{fontSize:13}} />
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
      <View style={{ flex: 1, borderWidth: 1, borderRadius: 8, }}>
        <Picker
          selectedValue={plataforma}
          onValueChange={(itemValue, itemIndex) => handleSelectPlataforma(itemValue, itemIndex)}>
          <Picker.Item label="Seleccionar forma de pago" value={0} style={{fontSize:13}} />
          {
            plataformas && plataformas.map(p => <Picker.Item label={p.plataforma + ' ' + p.moneda + ' tasa: ' + p.tasa as string} value={p} style={{fontSize:14}} />)
          }
        </Picker>
      </View>

      <View style={{ flexDirection:'row', justifyContent:'space-between',borderWidth:1,borderRadius:8, padding:4, display: (seleccion1 === true && seleccion2 === true) ? 'flex' : 'none' }}>
        <TouchableOpacity disabled={verBoton} onPress={() => calcularMonto(tasa, fichas)} style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, borderColor: '#fff', borderWidth: 1, }}>
          <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>Calcular</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'column', gap:0}}>
        <Text style={{ color: '#0751da', fontSize: 12, textAlign: 'center', marginVertical: 0 }}>{moneda}   </Text>
        <Text style={{ color: '#0751da', fontSize: 12, textAlign: 'center', marginVertical: 0 }}>Total: {monto}   </Text>

        </View>
      </View>
            <Text style={{textAlign:'center',fontSize:10}}>{info.length > 0 && info}</Text>


      <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center',display: (seleccion1 === true && seleccion2 === true) ? 'flex' : 'none' }}>
        {procesar && <RecargaForm onSubmit={handleSubmit} content={info} />}
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
