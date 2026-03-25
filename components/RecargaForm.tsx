import { useThemeColor } from '@/hooks/use-theme-color';
import { Feather } from '@expo/vector-icons';
import { Image, ImageBackground } from 'expo-image';
import * as ImagePicker from "expo-image-picker";
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Card from './ui/Card';





interface Props {
  onSubmit: (content: string, image: string) => void;
content?:string
}

const RecargaForm = ({ onSubmit }: Props) => {

 const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const color = useThemeColor({}, "tint");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images']
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

 return (
    <Card style={styles.container}>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Imagen de transacción"
      />
      <Card style={styles.row}>
        <TouchableOpacity onPress={handlePickImage}>
          <Feather name="image" size={24} color={color} />
        </TouchableOpacity>
        <Button
          title="Procesar"
          onPress={() => {
            onSubmit(content, image);
            setContent("");
            setImage("");
          }}
        />
      </Card>
      {Image && (
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', gap:10}}>
        <ImageBackground source={{ uri: image }} style={styles.image}>
        </ImageBackground>
          <TouchableOpacity onPress={() => setImage("")}>
            <Feather name="x" size={24} color={image.length>0 ?"black":'white'} />
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    alignItems: "flex-end",
    padding: 8,
  },
});


export default RecargaForm