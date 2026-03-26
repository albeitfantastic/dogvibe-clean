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
      style={{ flex: 1, backgroundColor: "#f6f1ee" }}
    >
      <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 20 }}>
        <TopBar
          title="Result"
          showBack={false}
          rightLabel="Home"
          onRightPress={() => router.replace("/")}
        />

        <View
          style={{
            flex: 1,
            backgroundColor: "#fffdfb",
            borderRadius: 30,
            padding: 12,
            shadowColor: "#000000",
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
              backgroundColor: "#fffdfb",
              borderRadius: 24,
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
                paddingHorizontal: 18,
                paddingTop: 18,
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#f56f6f",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 8,
                }}
              >
                Today&apos;s result
              </Text>

              <Text
                style={{
                  fontSize: 34,
                  fontWeight: "800",
                  color: "#1c1c1e",
                  letterSpacing: -0.8,
                }}
              >
                {nickname}
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  color: "#6e6a67",
                  marginTop: 10,
                  lineHeight: 25,
                }}
              >
                Mood: {mood} {moodEmoji}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: "#9d9894",
                  marginTop: 16,
                }}
              >
                Made with DogVibe
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <View style={{ marginBottom: 12 }}>
            <PrimaryButton title="Share card" onPress={handleShare} />
          </View>

          <PrimaryButton title="Save entry" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaView>
  );
}