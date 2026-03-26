import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../src/components/TopBar";
import { useEntryDraftStore } from "../src/store/useEntryDraftStore";
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
      style={{ flex: 1, backgroundColor: "#f6f1ee" }}
    >
      <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 20 }}>
        <TopBar title="Analyzing" showBack={false} />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fffdfb",
              borderRadius: 30,
              paddingVertical: 52,
              paddingHorizontal: 24,
              alignItems: "center",
              shadowColor: "#000000",
              shadowOpacity: 0.05,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 2,
            }}
          >
            <ActivityIndicator size="large" color="#f56f6f" />

            <Text
              style={{
                fontSize: 26,
                fontWeight: "800",
                color: "#1c1c1e",
                marginTop: 22,
                letterSpacing: -0.6,
              }}
            >
              Analyzing vibe...
            </Text>

            <Text
              style={{
                fontSize: 17,
                color: "#6e6a67",
                marginTop: 10,
                textAlign: "center",
                lineHeight: 25,
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