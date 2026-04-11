import { TypeFetchPolla } from '@/lib/api_pollas';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
    values: TypeFetchPolla
}

const RetirarDeCarrera = ({values}: Props) => {

  const rec=(value:string)=>{
    const s= value.split(':',2)
    return s[0]+':'+s[1]
  }
 

  return (
    <View>
        <Text style={{fontSize:11, fontWeight:'700', textAlign:'center'}}>CARRERAS</Text>
        <View>
        <Text style={{ fontSize: 10 }}>1ra  Dist. {values.carrera1_dist} mts, Hora: {rec(values.carrera1_hor!)}, {values.carrera1_ejem} Caballos</Text>
        <TouchableOpacity>
<FontAwesome6 name="xmarks-lines" size={24} color="black" />

        </TouchableOpacity>
        </View>
          <Text style={{ fontSize: 10 }}>2da  Dist. {values.carrera2_dist} mts, Hora: {rec(values.carrera2_hor!)}, {values.carrera2_ejem} Caballos</Text>
          <Text style={{ fontSize: 10 }}>3ra  Dist. {values.carrera3_dist} mts, Hora: {rec(values.carrera3_hor!)}, {values.carrera3_ejem} Caballos</Text>
          <Text style={{ fontSize: 10 }}>4ta  Dist. {values.carrera4_dist} mts, Hora: {rec(values.carrera4_hor!)}, {values.carrera4_ejem} Caballos</Text>
          <Text style={{ fontSize: 10 }}>5ta  Dist. {values.carrera5_dist} mts, Hora: {rec(values.carrera5_hor!)}, {values.carrera5_ejem} Caballos</Text>
          <Text style={{ fontSize: 10 }}>6ta  Dist. {values.carrera6_dist} mts, Hora: {rec(values.carrera6_hor!)}, {values.carrera6_ejem} Caballos</Text>
    </View>
  )
}

export default RetirarDeCarrera