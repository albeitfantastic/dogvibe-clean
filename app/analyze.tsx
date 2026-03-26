import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../src/components/TopBar";
import { useEntryDraftStore } from "../src/store/useEntryDraftStore";
import { colors } from "../src/theme/colors";
import { radius } from "../src/theme/radius";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";
import { loadingMessages, mockAnalyze } from "../src/utils/mockAI";

export default function AnalyzeScreen() {
  const router = useRouter();

  const loadingMessage = useMemo(() => {
    return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  }, []);

  useEffect(() => {
    const run = async () => {
      const currentDraft = useEntryDraftStore.getState().draft;

      if (!currentDraft?.imageUri) {
        router.replace("/capture");
        return;
      }

      const result = await mockAnalyze();

      useEntryDraftStore.setState({
        draft: {
          ...currentDraft,
          ...result,
        },
      });

      router.replace("/result");
    };

    run();
  }, [router]);

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
        <TopBar title="Analyzing" showBack={false} />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.round,
              paddingVertical: spacing.hero,
              paddingHorizontal: spacing.xxl,
              alignItems: "center",
              shadowColor: colors.shadow,
              shadowOpacity: 0.05,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 2,
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />

            <Text
              style={{
                ...typography.title,
                color: colors.textPrimary,
                marginTop: spacing.xl + spacing.xs,
                letterSpacing: -0.6,
              }}
            >
              Analyzing vibe...
            </Text>

            <Text
              style={{
                ...typography.body,
                color: colors.textSecondary,
                marginTop: spacing.sm + spacing.xxs,
                textAlign: "center",
              }}
            >
              {loadingMessage}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}