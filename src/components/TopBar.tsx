import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

type TopBarProps = {
  title: string;
  showBack?: boolean;
  onMenuPress?: () => void;
  rightLabel?: string;
  onRightPress?: () => void;
};

export default function TopBar({
  title,
  showBack = true,
  onMenuPress,
  rightLabel,
  onRightPress,
}: TopBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: Math.max(insets.top, spacing.sm),
        paddingBottom: spacing.md,
      }}
    >
      <View
        style={{
          minHeight: 52,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.md,
        }}
      >
        <View style={{ width: 88, alignItems: "flex-start" }}>
          {showBack ? (
            <Pressable
              onPress={() => router.back()}
              hitSlop={spacing.sm + spacing.xxs}
              style={({ pressed }) => ({
                minHeight: 40,
                paddingHorizontal: spacing.md,
                borderRadius: radius.pill,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              })}
            >
              <Text
                style={{
                  ...typography.bodyStrong,
                  color: colors.textPrimary,
                }}
                numberOfLines={1}
              >
                Back
              </Text>
            </Pressable>
          ) : onMenuPress ? (
            <Pressable
              onPress={onMenuPress}
              hitSlop={spacing.sm + spacing.xxs}
              style={({ pressed }) => ({
                minHeight: 40,
                minWidth: 40,
                paddingHorizontal: spacing.md,
                borderRadius: radius.pill,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              })}
            >
              <Text
                style={{
                  ...typography.heading,
                  color: colors.textPrimary,
                  lineHeight: typography.heading.lineHeight - 2,
                }}
              >
                ≡
              </Text>
            </Pressable>
          ) : null}
        </View>

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text
            numberOfLines={1}
            style={{
              ...typography.heading,
              color: colors.textPrimary,
            }}
          >
            {title}
          </Text>
        </View>

        <View style={{ width: 88, alignItems: "flex-end" }}>
          {rightLabel && onRightPress ? (
            <Pressable
              onPress={onRightPress}
              hitSlop={spacing.sm + spacing.xxs}
              style={({ pressed }) => ({
                minHeight: 40,
                minWidth: 88,
                paddingHorizontal: spacing.md,
                borderRadius: radius.pill,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              })}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...typography.caption,
                  color: colors.textPrimary,
                }}
              >
                {rightLabel}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}