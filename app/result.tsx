import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useEffect, useRef } from "react";
import { Alert, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useDogStore } from "../src/store/useDogStore";
import { useEntryDraftStore } from "../src/store/useEntryDraftStore";
import { useEntryStore } from "../src/store/useEntryStore";
import { colors } from "../src/theme/colors";
import { radius } from "../src/theme/radius";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";
import { getMoodEmoji } from "../src/utils/mood";

export default function ResultScreen() {
  const router = useRouter();
  const cardRef = useRef<View>(null);

  const draft = useEntryDraftStore((s) => s.draft);
  const clearDraft = useEntryDraftStore((s) => s.clearDraft);
  const addEntry = useEntryStore((s) => s.addEntry);
  const currentDog = useDogStore((s) => s.getCurrentDog());

  useEffect(() => {
    if (!draft?.imageUri || !draft.nickname || !draft.mood || !currentDog?.id) {
      router.replace("/capture");
    }
  }, [draft, currentDog, router]);

  if (!draft?.imageUri || !draft.nickname || !draft.mood || !currentDog?.id) {
    return null;
  }

  const imageUri = draft.imageUri;
  const nickname = draft.nickname;
  const mood = draft.mood;
  const moodEmoji = getMoodEmoji(mood);

  const handleShare = async () => {
    try {
      const available = await Sharing.isAvailableAsync();

      if (!available) {
        Alert.alert("Sharing unavailable", "File sharing is not available here.");
        return;
      }

      if (!cardRef.current) {
        return;
      }

      const uri = await captureRef(cardRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Share dog vibe",
      });
    } catch {
      Alert.alert("Share failed", "Could not create the share card.");
    }
  };

  const handleSave = () => {
    addEntry({
      dogId: currentDog.id,
      imageUri,
      nickname,
      mood,
    });

    clearDraft();
    router.replace("/");
  };

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
        <TopBar
          title="Result"
          showBack={false}
          rightLabel="Home"
          onRightPress={() => router.replace("/")}
        />

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
          <View
            ref={cardRef}
            collapsable={false}
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.xl,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                width: "100%",
                height: 420,
              }}
            />

            <View
              style={{
                paddingHorizontal: spacing.lg + spacing.xxs,
                paddingTop: spacing.lg + spacing.xxs,
                paddingBottom: spacing.xl,
              }}
            >
              <Text
                style={{
                  ...typography.caption,
                  color: colors.primary,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: spacing.sm,
                }}
              >
                Today&apos;s result
              </Text>

              <Text
                style={{
                  ...typography.displayLg,
                  color: colors.textPrimary,
                  letterSpacing: -0.8,
                }}
              >
                {nickname}
              </Text>

              <Text
                style={{
                  ...typography.subheading,
                  color: colors.textSecondary,
                  marginTop: spacing.sm + spacing.xxs,
                }}
              >
                Mood: {mood} {moodEmoji}
              </Text>

              <Text
                style={{
                  ...typography.caption,
                  color: colors.textMuted,
                  marginTop: spacing.lg,
                }}
              >
                Made with DogVibe
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <View style={{ marginBottom: spacing.md }}>
            <PrimaryButton title="Share card" onPress={handleShare} />
          </View>

          <PrimaryButton title="Save entry" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaView>
  );
}