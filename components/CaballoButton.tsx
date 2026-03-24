import { Checkbox } from 'expo-checkbox';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import * as Haptics from 'expo-haptics';

import { Colors } from '@/constants/Colors';

interface Props {
  label: string;
  color?: string;
  blackText?: boolean;
  doubleSize?: boolean;
  onPress: () => void;
  isChecked?: boolean;
 
}

const CaballoButton = ({
  label,
  color = Colors.orange,
  blackText = false,
  doubleSize = false,
  onPress,  
  isChecked = false,
  
}: Props) => {

 const value =color
  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        width: doubleSize ? 60 : 40,
        height: doubleSize ? 60 : 40,
        borderRadius:5,
        marginHorizontal:20
      })}
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
    >
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={onPress} />
        <Text style={[styles.paragraph, { backgroundColor: color }]}>{label}</Text>
      </View>
    </Pressable>
  );
};
export default CaballoButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
      fontWeight: 'bold',
      height: 40,
      width: 40,
      textAlign: 'center',
      textAlignVertical: 'center',  
      padding:12,
      borderRadius:5,
      color: '#fff'

  },
  checkbox: {
    margin: 8,
  },
});

