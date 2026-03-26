import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useDogStore } from "../src/store/useDogStore";

export default function PaywallScreen() {
  const router = useRouter();
  const enablePremium = useDogStore((s) => s.enablePremium);

  const handleUnlock = () => {
    enablePremium();
    router.replace("/dog/new");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f2ee" }} edges={["top"]}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <TopBar title="DogVibe Premium" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <View
            style={{
              backgroundColor: "#fffaf7",
              borderRadius: 28,
              padding: 24,
              borderWidth: 1,
              borderColor: "#efe6e0",
              marginBottom: 18,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "700",
                color: "#1f1a17",
                marginBottom: 8,
              }}
            >
              More puppies, more vibes
            </Text>

            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                color: "#6f6258",
                marginBottom: 18,
              }}
            >
              Premium unlocks multi-dog life, so each pup gets their own little mood diary.
            </Text>

            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#fdf0eb",
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 7,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#b95d52" }}>
                Mock paywall
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 24,
              padding: 18,
              borderWidth: 1,
              borderColor: "#efe6e0",
              marginBottom: 18,
              gap: 14,
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
                  backgroundColor: "#f8f3ef",
                  borderRadius: 18,
                  paddingHorizontal: 16,
                  paddingVertical: 15,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#2d2520" }}>{item}</Text>
              </View>
            ))}
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 24,
              padding: 18,
              borderWidth: 1,
              borderColor: "#efe6e0",
              marginBottom: 18,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                lineHeight: 22,
                color: "#6f6258",
              }}
            >
              This is still a mock premium screen for now. Tapping unlock will immediately enable
              premium and continue into new dog creation.
            </Text>
          </View>

          <PrimaryButton title="Unlock premium" onPress={handleUnlock} />

          <View style={{ height: 10 }} />

          <PrimaryButton title="Not now" onPress={() => router.back()} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}