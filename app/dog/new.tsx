import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7f2f2",
        paddingHorizontal: 16,
        paddingTop: 22,
        paddingBottom: 20,
      }}
    >
      <TopBar title="New Dog" />

      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 28,
          padding: 18,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "800",
            color: "#1f1f1f",
            marginBottom: 8,
            letterSpacing: -0.8,
          }}
        >
          Create your dog
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#6b6b6b",
            lineHeight: 24,
            marginBottom: 22,
          }}
        >
          Add the basics so DogVibe feels personal.
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: "#1f1f1f",
            marginBottom: 8,
          }}
        >
          Dog name
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter dog name"
          placeholderTextColor="#9a9a9a"
          style={{
            backgroundColor: "#f7f2f2",
            borderWidth: 1,
            borderColor: "#e9dede",
            borderRadius: 18,
            paddingHorizontal: 16,
            paddingVertical: 16,
            fontSize: 16,
            marginBottom: 16,
          }}
        />

        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: "#1f1f1f",
            marginBottom: 8,
          }}
        >
          Breed (optional)
        </Text>

        <TextInput
          value={breed}
          onChangeText={setBreed}
          placeholder="Enter breed"
          placeholderTextColor="#9a9a9a"
          style={{
            backgroundColor: "#f7f2f2",
            borderWidth: 1,
            borderColor: "#e9dede",
            borderRadius: 18,
            paddingHorizontal: 16,
            paddingVertical: 16,
            fontSize: 16,
            marginBottom: 18,
          }}
        />

        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: "#1f1f1f",
            marginBottom: 10,
          }}
        >
          Age band (optional)
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {AGE_BANDS.map((item) => {
            const selected = ageBand === item;

            return (
              <Pressable
                key={item}
                onPress={() => setAgeBand(item)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 11,
                  borderRadius: 999,
                  backgroundColor: selected ? "#ff6b6b" : "#f7f2f2",
                  borderWidth: 1,
                  borderColor: selected ? "#ff6b6b" : "#e9dede",
                }}
              >
                <Text
                  style={{
                    color: selected ? "#ffffff" : "#1f1f1f",
                    fontWeight: selected ? "700" : "500",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ flex: 1 }} />

        <PrimaryButton
          title="Create dog"
          onPress={handleCreateDog}
          disabled={!name.trim()}
        />
      </View>
    </View>
  );
}