import { Ionicons } from '@expo/vector-icons';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  x?:number;
  y?:number;
  color?:string
}

export const FABE = ({ style, iconName, onPress,x=20,y=30,color='black' }: Props) => {
  return (
    <TouchableOpacity
      style={[
        {
          zIndex: 99,

         

          width: 60,
          height: 60,

          shadowColor: color,
          backgroundColor: color,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 3,
          borderRadius: 13,

          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}
    >
      <Ionicons name={iconName} size={30} color="white" />
    </TouchableOpacity>
  );
};
