import { Pressable, StyleSheet, Text, View } from 'react-native';

import * as Haptics from 'expo-haptics';

import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useState } from 'react';



interface Props {
  label: string;
  color?: string;
  blackText?: boolean;
  doubleSize?: boolean;
  onPress: () => void;
  checked?: boolean;
}

const CaballoButton22 = ({
  label,
  color = Colors.orange,
  blackText = false,
  doubleSize = false,
  onPress,
  checked = false

}: Props) => {

  const [isChecked, setChecked] = useState(false);
  const numeros = ['2', '4', '15', '21','22','23','24']

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        borderRadius: 5,
        marginHorizontal: 10,
        borderWidth: 3,
        borderColor: '#c2b9b9', 
        borderStyle: 'solid',      
        backgroundColor: color,
        height:40,
        width:100,justifyContent:'center',
        transform: [{ scale: pressed ? 0.85 : 1 }],

      })}
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
        setChecked(!isChecked)
      }}
    >
      <View style={{
        gap: 10, borderColor: '#b9b3b3',
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: color, 
      }}>

        <MaterialIcons name={checked ? "check-box" : "check-box-outline-blank"} size={20}
          color={checked ? "#b9b3b3" : color} style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#111cb6' }} />
        <Text style={[styles.paragraph, { backgroundColor: color, color: numeros.includes(label) ? '#b9a42b' : 'white' }]}>{label}</Text>
      </View>
    </Pressable>

  );
};
export default CaballoButton22;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b9b3b3',
    marginHorizontal: 10
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#c7c8d1',
  },
  checkbox: {
    margin: 8,
  },
});

