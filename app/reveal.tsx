import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useEntryDraftStore } from "../src/store/useEntryDraftStore";
import { colors } from "../src/theme/colors";
import { radius } from "../src/theme/radius";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";

export default function RevealScreen() {
  const router = useRouter();
  const draft = useEntryDraftStore((s) => s.draft);

  useEffect(() => {
    if (!draft?.imageUri) {
      router.replace("/capture");
    }
  }, [draft, router]);

  if (!draft?.imageUri) {
    return null;
  }

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
        <TopBar title="Preview" />

        <View
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            borderRadius: radius.round,
            padding: spacing.md,
            shadowColor: colors.shadow,
            shadowOpacity: 0.05,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 2,
          }}
        >
          <Image
            source={{ uri: draft.imageUri }}
            style={{
              width: "100%",
              height: 420,
              borderRadius: radius.xl,
            }}
          />

          <View style={{ flex: 1, paddingHorizontal: spacing.sm + spacing.xxs, paddingTop: spacing.lg + spacing.xxs }}>
            <Text
              style={{
                ...typography.displayMd,
                color: colors.textPrimary,
                letterSpacing: -0.8,
              }}
            >
              Ready to analyze?
            </Text>

            <Text
              style={{
                ...typography.body,
                marginTop: spacing.sm + spacing.xxs,
                color: colors.textSecondary,
              }}
            >
              Let DogVibe turn this moment into a tiny mood story.
            </Text>

            <View style={{ flex: 1 }} />

            <PrimaryButton
              title="Analyze vibe"
              onPress={() => router.push("/analyze")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}