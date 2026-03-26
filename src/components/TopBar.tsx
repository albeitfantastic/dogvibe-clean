import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  showBack?: boolean;
  rightLabel?: string;
  onRightPress?: () => void;
};

export default function TopBar({
  title,
  showBack = true,
  rightLabel,
  onRightPress,
}: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: Math.max(insets.top, 12),
        paddingBottom: 12,
        paddingHorizontal: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ width: 84, alignItems: "flex-start" }}>
        {showBack ? (
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={({ pressed }) => ({
              minHeight: 36,
              paddingHorizontal: 12,
              borderRadius: 18,
              justifyContent: "center",
              backgroundColor: pressed ? "#ece7e4" : "#f4efec",
            })}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "#1c1c1e",
              }}
            >
              Back
            </Text>
          </Pressable>
        ) : null}
      </View>

      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 17,
          fontWeight: "700",
          color: "#1c1c1e",
          letterSpacing: -0.3,
        }}
      >
        {title}
      </Text>

      <View style={{ width: 84, alignItems: "flex-end" }}>
        {rightLabel && onRightPress ? (
          <Pressable
            onPress={onRightPress}
            hitSlop={10}
            style={({ pressed }) => ({
              minHeight: 36,
              paddingHorizontal: 12,
              borderRadius: 18,
              justifyContent: "center",
              backgroundColor: pressed ? "#ece7e4" : "#f4efec",
            })}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "#1c1c1e",
              }}
            >
              {rightLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}