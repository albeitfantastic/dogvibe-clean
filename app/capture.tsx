import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useEntryDraftStore } from "../src/store/useEntryDraftStore";

export default function CaptureScreen() {
  const router = useRouter();

  const openReveal = (imageUri: string) => {
    useEntryDraftStore.setState({
      draft: {
        imageUri,
      },
    });

    router.push("/reveal");
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Camera access is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (result.canceled || !result.assets?.[0]?.uri) {
      return;
    }

    openReveal(result.assets[0].uri);
  };

  const chooseFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Library access is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (result.canceled || !result.assets?.[0]?.uri) {
      return;
    }

    openReveal(result.assets[0].uri);
  };

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: "#f6f1ee" }}
    >
      <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 20 }}>
        <TopBar title="Capture" />

        <View
          style={{
            flex: 1,
            backgroundColor: "#fffdfb",
            borderRadius: 30,
            padding: 22,
            justifyContent: "space-between",
            shadowColor: "#000000",
            shadowOpacity: 0.05,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 2,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "800",
                color: "#1c1c1e",
                letterSpacing: -0.8,
              }}
            >
              Add today&apos;s photo
            </Text>

            <Text
              style={{
                marginTop: 12,
                fontSize: 17,
                color: "#6e6a67",
                lineHeight: 25,
              }}
            >
              Take a quick photo or choose one from your library.
            </Text>
          </View>

          <View>
            <View style={{ marginBottom: 12 }}>
              <PrimaryButton title="Take photo" onPress={takePhoto} />
            </View>

            <PrimaryButton
              title="Choose from library"
              onPress={chooseFromLibrary}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}