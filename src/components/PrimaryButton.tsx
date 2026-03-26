import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={6}
      style={({ pressed }) => ({
        minHeight: 54,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: disabled ? "#f0b8b8" : pressed ? "#f16969" : "#f56f6f",
      })}
    >
      <Text
        style={{
          fontSize: 17,
          fontWeight: "700",
          color: "#ffffff",
          letterSpacing: -0.2,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}