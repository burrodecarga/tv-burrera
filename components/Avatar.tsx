import { Image } from "react-native";

interface AvatarProps {
  uri: string | null | undefined;
  size?: number;
}

export default function Avatar({ uri, size = 32 }: AvatarProps) {
  const styles = { height: size, width: size, borderRadius: size / 2 };
  if (uri) return <Image source={{ uri }} style={styles} />;
  return (
    <Image style={[styles, {backgroundColor:'#ac999900'}]} source={require('./assets/images/tvburrera.jpg')}/>
  );
}
