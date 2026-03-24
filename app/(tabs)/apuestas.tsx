import MetdoPago from '@/components/MetdoPago'
import ThemedTextInput from '@/components/ThemedTextInput'
import Card from '@/components/ui/Card'
import { PAGO } from '@/constants/Pagos'
import { useThemeColor } from '@/hooks/use-theme-color'
import { Feather } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import React, { useState } from 'react'
import { Button, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  onSubmit: (content: string, image: string) => void;
}

const ApuestasScreen = () => {
  const [selected, setSelected] = useState(0);
  const [monto, setMonto] = useState('')
    const [image, setImage] = useState("");
      const [content, setContent] = useState("");

  const color = useThemeColor({}, "tint");


  const recargar = (value: number) => {
    setSelected(value)
    console.log(value)
  }

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async (content: string, image: string) => {
    // try {
    //   let publicUrl = "";
    //   if (image) {
    //     const fileExt = image.split(".").pop();
    //     const fileName = image.replace(/^.*[\\\/]/, "");
    //     const filePath = `${Date.now()}.${fileExt}`;

    //     const formData = new FormData();
    //     const photo = {
    //       uri: image,
    //       name: fileName,
    //       type: `image/${fileExt}`,
    //     } as unknown as Blob;
    //     formData.append("file", photo);

    //     const { error } = await supabase.storage
    //       .from("posts")
    //       .upload(filePath, formData);
    //     if (error) throw error;

    //     const { data } = supabase.storage.from("posts").getPublicUrl(filePath);
    //     publicUrl = data.publicUrl;
    //   }
    //   const { data, error } = await supabase
    //     .from("posts")
    //     .insert({ content, image: publicUrl })
    //     .select("*, profile: profiles(username, avatar_url)");
    //   if (error) {
    //     throw error;
    //   } else {
    //     //setPosts([data[0], ...posts]);
    //   }
    // } catch (error: any) {
    //   Alert.alert("Server Error", error.message);
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Método de Pago</Text>
      <View>
        <Card>
        <FlatList
          data={PAGO}
          keyExtractor={item => item}
          renderItem={({ item, index }) => <MetdoPago recargar={recargar} item={item} index={index} selected={selected} />}
        />
        <View style={{marginVertical:10,marginHorizontal:50}}>
          <Text style={styles.title}>Monto a recargar</Text>
          <ThemedTextInput
           icon='cash-outline'
            inputMode="numeric"
            keyboardType="numeric"
            value={monto}
            onChangeText={value => setMonto(value)}
          />
        </View>
      
          <Card style={styles.row}>
        <TouchableOpacity onPress={handlePickImage}>
          <Feather name="image" size={24} color={color} />
        </TouchableOpacity>
        <Button
          title="Recargar"
          onPress={() => {
            handleSubmit(content, image);
            setContent("");
            setImage("");
          }}
        />
      </Card>
      {image && (
        <ImageBackground source={{ uri: image }} style={styles.image}>
          <TouchableOpacity onPress={() => setImage("")}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        </ImageBackground>
      )}
    </Card>
      </View>
    </SafeAreaView>
  )
}

export default ApuestasScreen

export const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20
  },
  input:{

  },
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
})