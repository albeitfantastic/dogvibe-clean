import { useRouter } from "expo-router";
import { Text, View } from "react-native";
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7f2f2",
        padding: 16,
        paddingTop: 24,
        justifyContent: "center",
      }}
    >
      <TopBar title="Premium" />

      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 28,
          padding: 24,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "800",
            color: "#1f1f1f",
            marginBottom: 10,
            letterSpacing: -0.8,
          }}
        >
          DogVibe Premium
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#6b6b6b",
            lineHeight: 24,
            marginBottom: 24,
          }}
        >
          Premium unlocks multiple puppies. This is a mock paywall for now.
        </Text>

        <View style={{ marginBottom: 12 }}>
          <PrimaryButton title="Unlock Premium" onPress={handleUnlock} />
        </View>

        <PrimaryButton title="Back to settings" onPress={() => router.back()} />
      </View>
    </View>
  );
}