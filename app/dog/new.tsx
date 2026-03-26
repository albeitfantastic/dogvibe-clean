import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../src/components/PrimaryButton";
import TopBar from "../../src/components/TopBar";
import { useDogStore } from "../../src/store/useDogStore";
import { colors } from "../../src/theme/colors";
import { radius } from "../../src/theme/radius";
import { spacing } from "../../src/theme/spacing";
import { typography } from "../../src/theme/typography";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flex: 1, paddingHorizontal: spacing.xl }}>
        <TopBar title="New puppy" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.xxxl }}
        >
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.xxl,
              padding: spacing.xxl - spacing.xxs,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.lg + spacing.xxs,
            }}
          >
            <Text
              style={{
                ...typography.title,
                color: colors.textPrimary,
                marginBottom: spacing.sm,
              }}
            >
              Create your dog
            </Text>

            <Text
              style={{
                ...typography.body,
                color: colors.textSecondary,
              }}
            >
              Add the basics so DogVibe feels sweet, personal, and ready for daily check-ins.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.xl,
              padding: spacing.lg + spacing.xxs,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.lg + spacing.xxs,
            }}
          >
            <Text
              style={{
                ...typography.caption,
                color: colors.textSecondary,
                marginBottom: spacing.sm,
              }}
            >
              Dog name
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Mochi"
              placeholderTextColor={colors.textMuted}
              style={{
                minHeight: 56,
                borderRadius: radius.lg,
                backgroundColor: colors.surfaceMuted,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: spacing.lg,
                ...typography.body,
                color: colors.textPrimary,
                marginBottom: spacing.lg,
              }}
            />

            <Text
              style={{
                ...typography.caption,
                color: colors.textSecondary,
                marginBottom: spacing.sm,
              }}
            >
              Breed (optional)
            </Text>

            <TextInput
              value={breed}
              onChangeText={setBreed}
              placeholder="Corgi"
              placeholderTextColor={colors.textMuted}
              style={{
                minHeight: 56,
                borderRadius: radius.lg,
                backgroundColor: colors.surfaceMuted,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: spacing.lg,
                ...typography.body,
                color: colors.textPrimary,
                marginBottom: spacing.lg,
              }}
            />

            <Text
              style={{
                ...typography.caption,
                color: colors.textSecondary,
                marginBottom: spacing.sm + spacing.xxs,
              }}
            >
              Age band (optional)
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm + spacing.xxs }}>
              {AGE_BANDS.map((item) => {
                const selected = ageBand === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setAgeBand(item)}
                    style={({ pressed }) => ({
                      paddingHorizontal: spacing.lg,
                      paddingVertical: spacing.md,
                      borderRadius: radius.pill,
                      backgroundColor: selected
                        ? colors.primary
                        : pressed
                          ? colors.surfaceMuted
                          : colors.surface,
                      borderWidth: 1,
                      borderColor: selected ? colors.primary : colors.border,
                    })}
                  >
                    <Text
                      style={{
                        ...typography.bodySmall,
                        color: selected ? colors.textInverse : colors.textPrimary,
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