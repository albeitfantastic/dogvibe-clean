import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useEntryDraftStore } from "../src/store/useEntryDraftStore";

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
      style={{ flex: 1, backgroundColor: "#f6f1ee" }}
    >
      <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 20 }}>
        <TopBar title="Preview" />

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
          <Image
            source={{ uri: draft.imageUri }}
            style={{
              width: "100%",
              height: 420,
              borderRadius: 24,
            }}
          />

          <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 18 }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "800",
                color: "#1c1c1e",
                letterSpacing: -0.8,
              }}
            >
              Ready to analyze?
            </Text>

            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                color: "#6e6a67",
                lineHeight: 25,
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