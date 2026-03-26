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
import BottomNav from "../src/components/BottomNav";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useDogStore } from "../src/store/useDogStore";
import { colors } from "../src/theme/colors";
import { radius } from "../src/theme/radius";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";

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

  const handleFoodPress = () => {
    Alert.alert("Food log", "Capture a new mood card for a food moment.");
    router.push("/capture");
  };

  const handlePoopPress = () => {
    Alert.alert("Poop log", "Capture a new mood card for a potty update.");
    router.push("/capture");
  };

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
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl + 96 }}
        showsVerticalScrollIndicator={false}
      >
        <TopBar title="Pets Editor" />

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: radius.round,
            padding: spacing.xxl - spacing.xxs,
            marginBottom: spacing.lg,
            shadowColor: colors.shadow,
            shadowOpacity: 0.05,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 2,
          }}
        >
          <Text
            style={{
              ...typography.displayMd,
              color: colors.textPrimary,
              marginBottom: spacing.sm,
              letterSpacing: -0.8,
            }}
          >
            Edit Pet Profile
          </Text>

          <Text
            style={{
              ...typography.body,
              color: colors.textSecondary,
              marginBottom: spacing.xl,
            }}
          >
            Keep your dog&apos;s details fresh and cozy.
          </Text>

          <Text
            style={{
              ...typography.bodyStrong,
              color: colors.textPrimary,
              marginBottom: spacing.sm,
            }}
          >
            Dog name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Dog name"
            placeholderTextColor={colors.textMuted}
            style={{
              backgroundColor: colors.surfaceMuted,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: radius.lg,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.lg,
              ...typography.body,
              color: colors.textPrimary,
              marginBottom: spacing.lg,
            }}
          />

          <Text
            style={{
              ...typography.bodyStrong,
              color: colors.textPrimary,
              marginBottom: spacing.sm,
            }}
          >
            Breed
          </Text>

          <TextInput
            value={breed}
            onChangeText={setBreed}
            placeholder="Breed"
            placeholderTextColor={colors.textMuted}
            style={{
              backgroundColor: colors.surfaceMuted,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: radius.lg,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.lg,
              ...typography.body,
              color: colors.textPrimary,
              marginBottom: spacing.lg,
            }}
          />

          <Text
            style={{
              ...typography.bodyStrong,
              color: colors.textPrimary,
              marginBottom: spacing.sm,
            }}
          >
            Age band
          </Text>

          <TextInput
            value={ageBand}
            onChangeText={setAgeBand}
            placeholder="Puppy / Young / Adult / Senior"
            placeholderTextColor={colors.textMuted}
            style={{
              backgroundColor: colors.surfaceMuted,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: radius.lg,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.lg,
              ...typography.body,
              color: colors.textPrimary,
              marginBottom: spacing.xl,
            }}
          />

          <PrimaryButton title="Save changes" onPress={handleSave} />
        </View>

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: radius.round,
            padding: spacing.xxl - spacing.xxs,
            shadowColor: colors.shadow,
            shadowOpacity: 0.05,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 2,
          }}
        >
          <Text
            style={{
              ...typography.heading,
              color: colors.textPrimary,
              marginBottom: spacing.md,
            }}
          >
            Your Pets
          </Text>

          {dogs.map((dog) => {
            const selected = dog.id === currentDogId;

            return (
              <Pressable
                key={dog.id}
                onPress={() => setCurrentDog(dog.id)}
                style={{
                  backgroundColor: selected ? colors.primarySoft : colors.surfaceMuted,
                  borderWidth: 1,
                  borderColor: selected ? colors.primary : colors.border,
                  borderRadius: radius.lg,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.lg - spacing.xxs,
                  marginBottom: spacing.sm + spacing.xxs,
                }}
              >
                <Text
                  style={{
                    ...typography.bodyStrong,
                    color: colors.textPrimary,
                  }}
                >
                  {dog.name}
                </Text>

                <Text
                  style={{
                    ...typography.bodySmall,
                    marginTop: spacing.xs,
                    color: colors.textSecondary,
                  }}
                >
                  {dog.breed || "No breed"} • {dog.ageBand || "No age band"}
                </Text>
              </Pressable>
            );
          })}

          <View style={{ marginTop: spacing.sm }}>
            <PrimaryButton
              title={hasPremium ? "Add puppy" : "Add puppy (Premium)"}
              onPress={handleAddPuppy}
            />
          </View>
        </View>
      </ScrollView>
      <BottomNav activeTab="pets" onFoodPress={handleFoodPress} onPoopPress={handlePoopPress} />
    </SafeAreaView>
  );
}