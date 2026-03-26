import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../src/components/PrimaryButton";
import TopBar from "../../src/components/TopBar";
import { useDogStore } from "../../src/store/useDogStore";

const AGE_BANDS = ["Puppy", "Young", "Adult", "Senior"];

export default function NewDogScreen() {
  const router = useRouter();
  const addDog = useDogStore((s) => s.addDog);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [ageBand, setAgeBand] = useState("");

  const handleCreateDog = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    addDog({
      name: trimmedName,
      breed: breed.trim(),
      ageBand,
    });

    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f2ee" }} edges={["top"]}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <TopBar title="New puppy" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <View
            style={{
              backgroundColor: "#fffaf7",
              borderRadius: 28,
              padding: 22,
              borderWidth: 1,
              borderColor: "#efe6e0",
              marginBottom: 18,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#1f1a17",
                marginBottom: 8,
              }}
            >
              Create your dog
            </Text>

            <Text
              style={{
                fontSize: 16,
                lineHeight: 23,
                color: "#6f6258",
              }}
            >
              Add the basics so DogVibe feels sweet, personal, and ready for daily check-ins.
            </Text>
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
                fontWeight: "600",
                color: "#6f6258",
                marginBottom: 8,
              }}
            >
              Dog name
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Mochi"
              placeholderTextColor="#aa9d93"
              style={{
                minHeight: 56,
                borderRadius: 18,
                backgroundColor: "#f8f3ef",
                borderWidth: 1,
                borderColor: "#ebe2dc",
                paddingHorizontal: 16,
                fontSize: 16,
                color: "#1f1a17",
                marginBottom: 16,
              }}
            />

            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#6f6258",
                marginBottom: 8,
              }}
            >
              Breed (optional)
            </Text>

            <TextInput
              value={breed}
              onChangeText={setBreed}
              placeholder="Corgi"
              placeholderTextColor="#aa9d93"
              style={{
                minHeight: 56,
                borderRadius: 18,
                backgroundColor: "#f8f3ef",
                borderWidth: 1,
                borderColor: "#ebe2dc",
                paddingHorizontal: 16,
                fontSize: 16,
                color: "#1f1a17",
                marginBottom: 16,
              }}
            />

            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#6f6258",
                marginBottom: 10,
              }}
            >
              Age band (optional)
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {AGE_BANDS.map((item) => {
                const selected = ageBand === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setAgeBand(item)}
                    style={({ pressed }) => ({
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderRadius: 999,
                      backgroundColor: selected ? "#f56f6f" : pressed ? "#eee7e2" : "#f4efec",
                      borderWidth: 1,
                      borderColor: selected ? "#f56f6f" : "#e8dfd9",
                    })}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        color: selected ? "#fff" : "#3a312c",
                      }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <PrimaryButton title="Create dog profile" onPress={handleCreateDog} disabled={!name.trim()} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}