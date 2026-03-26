import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useDogStore } from "../src/store/useDogStore";

export default function SettingsScreen() {
  const router = useRouter();

  const dogs = useDogStore((s) => s.dogs);
  const currentDogId = useDogStore((s) => s.currentDogId);
  const hasPremium = useDogStore((s) => s.hasPremium);
  const updateCurrentDog = useDogStore((s) => s.updateCurrentDog);
  const setCurrentDog = useDogStore((s) => s.setCurrentDog);

  const currentDog = useMemo(
    () => dogs.find((dog) => dog.id === currentDogId) ?? null,
    [dogs, currentDogId]
  );

  const [name, setName] = useState(currentDog?.name ?? "");
  const [breed, setBreed] = useState(currentDog?.breed ?? "");
  const [ageBand, setAgeBand] = useState(currentDog?.ageBand ?? "");

  useEffect(() => {
    setName(currentDog?.name ?? "");
    setBreed(currentDog?.breed ?? "");
    setAgeBand(currentDog?.ageBand ?? "");
  }, [currentDog]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Dog name required", "Please enter a dog name.");
      return;
    }

    updateCurrentDog({
      name: name.trim(),
      breed: breed.trim(),
      ageBand,
    });

    router.replace("/");
  };

  const handleAddPuppy = () => {
    if (!hasPremium) {
      router.push("/paywall");
      return;
    }

    router.push("/dog/new");
  };

  if (!currentDog) {
    router.replace("/");
    return null;
  }

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: "#f6f1ee" }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <TopBar title="Settings" />

        <View
          style={{
            backgroundColor: "#fffdfb",
            borderRadius: 30,
            padding: 22,
            marginBottom: 16,
            shadowColor: "#000000",
            shadowOpacity: 0.05,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "800",
              color: "#1c1c1e",
              marginBottom: 8,
              letterSpacing: -0.8,
            }}
          >
            Edit profile
          </Text>

          <Text
            style={{
              fontSize: 17,
              color: "#6e6a67",
              lineHeight: 25,
              marginBottom: 20,
            }}
          >
            Keep your dog&apos;s details fresh and cozy.
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#1c1c1e",
              marginBottom: 8,
            }}
          >
            Dog name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Dog name"
            placeholderTextColor="#9d9894"
            style={{
              backgroundColor: "#f6f1ee",
              borderWidth: 1,
              borderColor: "#ebe4df",
              borderRadius: 18,
              paddingHorizontal: 16,
              paddingVertical: 16,
              fontSize: 17,
              color: "#1c1c1e",
              marginBottom: 16,
            }}
          />

          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#1c1c1e",
              marginBottom: 8,
            }}
          >
            Breed
          </Text>

          <TextInput
            value={breed}
            onChangeText={setBreed}
            placeholder="Breed"
            placeholderTextColor="#9d9894"
            style={{
              backgroundColor: "#f6f1ee",
              borderWidth: 1,
              borderColor: "#ebe4df",
              borderRadius: 18,
              paddingHorizontal: 16,
              paddingVertical: 16,
              fontSize: 17,
              color: "#1c1c1e",
              marginBottom: 16,
            }}
          />

          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#1c1c1e",
              marginBottom: 8,
            }}
          >
            Age band
          </Text>

          <TextInput
            value={ageBand}
            onChangeText={setAgeBand}
            placeholder="Puppy / Young / Adult / Senior"
            placeholderTextColor="#9d9894"
            style={{
              backgroundColor: "#f6f1ee",
              borderWidth: 1,
              borderColor: "#ebe4df",
              borderRadius: 18,
              paddingHorizontal: 16,
              paddingVertical: 16,
              fontSize: 17,
              color: "#1c1c1e",
              marginBottom: 20,
            }}
          />

          <PrimaryButton title="Save changes" onPress={handleSave} />
        </View>

        <View
          style={{
            backgroundColor: "#fffdfb",
            borderRadius: 30,
            padding: 22,
            shadowColor: "#000000",
            shadowOpacity: 0.05,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: "#1c1c1e",
              marginBottom: 12,
            }}
          >
            Your puppies
          </Text>

          {dogs.map((dog) => {
            const selected = dog.id === currentDogId;

            return (
              <Pressable
                key={dog.id}
                onPress={() => setCurrentDog(dog.id)}
                style={{
                  backgroundColor: selected ? "#fff3f1" : "#f6f1ee",
                  borderWidth: 1,
                  borderColor: selected ? "#f56f6f" : "#ebe4df",
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 15,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "700",
                    color: "#1c1c1e",
                  }}
                >
                  {dog.name}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 15,
                    color: "#6e6a67",
                  }}
                >
                  {dog.breed || "No breed"} • {dog.ageBand || "No age band"}
                </Text>
              </Pressable>
            );
          })}

          <View style={{ marginTop: 8 }}>
            <PrimaryButton
              title={hasPremium ? "Add puppy" : "Add puppy (Premium)"}
              onPress={handleAddPuppy}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}