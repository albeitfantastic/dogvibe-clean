import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

type BottomNavTab = "home" | "pets";

type BottomNavProps = {
  activeTab: BottomNavTab;
  onFoodPress: () => void;
  onPoopPress: () => void;
};

export default function BottomNav({ activeTab, onFoodPress, onPoopPress }: BottomNavProps) {
  const router = useRouter();

  const iconColorFor = (tab: BottomNavTab) => (activeTab === tab ? colors.navIcon : colors.navIconMuted);

  return (
    <View
      style={{
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.lg,
        paddingTop: spacing.md,
      }}
    >
      <View
        style={{
          minHeight: 72,
          borderRadius: radius.xl + spacing.xxs,
          backgroundColor: colors.navBackground,
          paddingHorizontal: spacing.lg,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => router.replace("/")} hitSlop={spacing.sm}>
          <Text style={{ ...typography.heading, color: iconColorFor("home") }}>⌂</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/settings")} hitSlop={spacing.sm}>
          <Text style={{ ...typography.heading, color: iconColorFor("pets") }}>🐾</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/capture")}
          hitSlop={spacing.sm}
          style={{
            width: 56,
            height: 56,
            borderRadius: radius.pill,
            backgroundColor: colors.surface,
            alignItems: "center",
            justifyContent: "center",
            marginTop: -20,
            borderWidth: 3,
            borderColor: colors.navBackground,
          }}
        >
          <Text style={{ ...typography.heading, color: colors.primary }}>+</Text>
        </Pressable>

        <Pressable onPress={onFoodPress} hitSlop={spacing.sm}>
          <Text style={{ ...typography.heading, color: colors.navIconMuted }}>🍖</Text>
        </Pressable>

        <Pressable onPress={onPoopPress} hitSlop={spacing.sm}>
          <Text style={{ ...typography.heading, color: colors.navIconMuted }}>💩</Text>
        </Pressable>
      </View>
    </View>
  );
}
