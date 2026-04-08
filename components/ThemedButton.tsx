import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";

interface Props extends PressableProps {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
}

const ThemedButton = ({ children, icon, loading, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, "tint");

  return (
    <Pressable
      disabled={loading}
      style={({ pressed }) => [
        { backgroundColor: pressed ? "gray" : primaryColor },

        styles.button,
      ]}
      {...rest}
    >
      <Text style={{ color: "white" }}>{children}</Text>

      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color="white"
          style={{ marginHorizontal: 5 }}
        />
      )}
    </Pressable>
  );
};
export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
  },
});
