import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useDogStore } from "../src/store/useDogStore";
import { colors } from "../src/theme/colors";
import { radius } from "../src/theme/radius";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";

export default function PaywallScreen() {
  const router = useRouter();
  const enablePremium = useDogStore((s) => s.enablePremium);

  const handleUnlock = () => {
    enablePremium();
    router.replace("/dog/new");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flex: 1, paddingHorizontal: spacing.xl }}>
        <TopBar title="DogVibe Premium" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.xxxl }}
        >
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.xxl,
              padding: spacing.xxl,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.lg + spacing.xxs,
            }}
          >
            <Text
              style={{
                ...typography.displayMd,
                color: colors.textPrimary,
                marginBottom: spacing.sm,
              }}
            >
              More puppies, more vibes
            </Text>

            <Text
              style={{
                ...typography.body,
                color: colors.textSecondary,
                marginBottom: spacing.lg + spacing.xxs,
              }}
            >
              Premium unlocks multi-dog life, so each pup gets their own little mood diary.
            </Text>

            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: colors.primarySoft,
                borderRadius: radius.pill,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm - spacing.xxs,
              }}
            >
              <Text style={{ ...typography.caption, color: colors.textInverse }}>
                Mock paywall
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.xl,
              padding: spacing.lg + spacing.xxs,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.lg + spacing.xxs,
              gap: spacing.md + spacing.xxs,
            }}
          >
            {[
              "Add multiple puppies",
              "Switch between dogs in settings",
              "Keep separate vibe histories",
            ].map((item) => (
              <View
                key={item}
                style={{
                  backgroundColor: colors.surfaceMuted,
                  borderRadius: radius.lg,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.lg - spacing.xxs,
                }}
              >
                <Text style={{ ...typography.bodyStrong, color: colors.textPrimary }}>{item}</Text>
              </View>
            ))}
          </View>

          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.xl,
              padding: spacing.lg + spacing.xxs,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.lg + spacing.xxs,
            }}
          >
            <Text
              style={{
                ...typography.bodySmall,
                color: colors.textSecondary,
              }}
            >
              This is still a mock premium screen for now. Tapping unlock will immediately enable
              premium and continue into new dog creation.
            </Text>
          </View>

          <PrimaryButton title="Unlock premium" onPress={handleUnlock} />

          <View style={{ height: radius.sm }} />

          <PrimaryButton title="Not now" onPress={() => router.back()} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}