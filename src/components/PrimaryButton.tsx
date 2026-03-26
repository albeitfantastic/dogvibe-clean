import { Pressable, Text } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

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
      hitSlop={spacing.xs + spacing.xxs}
      style={({ pressed }) => ({
        minHeight: 54,
        borderRadius: radius.lg,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: disabled ? colors.primaryDisabled : pressed ? colors.primaryPressed : colors.primary,
      })}
    >
      <Text
        style={{
          ...typography.button,
          color: colors.textInverse,
          letterSpacing: -0.2,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}