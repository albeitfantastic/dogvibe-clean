import { useRouter } from "expo-router";
import { Alert, FlatList, Image, Pressable, Share, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "../src/components/BottomNav";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useDogStore } from "../src/store/useDogStore";
import { useEntryStore } from "../src/store/useEntryStore";
import { colors } from "../src/theme/colors";
import { radius } from "../src/theme/radius";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";
import { formatEntryDate } from "../src/utils/date";
import { getMoodEmoji } from "../src/utils/mood";

function toTimestamp(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = new Date(value).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  if (value instanceof Date) {
    const parsed = value.getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export default function HomeScreen() {
  const router = useRouter();
  const dogs = useDogStore((s) => s.dogs);
  const currentDogId = useDogStore((s) => s.currentDogId);
  const currentDog = useDogStore((s) => s.getCurrentDog());
  const hasPremium = useDogStore((s) => s.hasPremium);
  const setCurrentDog = useDogStore((s) => s.setCurrentDog);

  const entries = useEntryStore((s) => s.entries);
  const streak = useEntryStore((s) => s.getCurrentStreak(currentDog?.id ?? null));
  const deleteEntry = useEntryStore((s) => s.deleteEntry);

  const handleFoodPress = () => {
    Alert.alert("Food log", "Capture a new mood card for a food moment.");
    router.push("/capture");
  };

  const handlePoopPress = () => {
    Alert.alert("Poop log", "Capture a new mood card for a potty update.");
    router.push("/capture");
  };

  if (!currentDog) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
        <View style={{ flex: 1, paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl }}>
          <TopBar title="WALKR Vibe" showBack={false} onMenuPress={() => router.push("/settings")} />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: radius.xxl,
                padding: spacing.xxl,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  ...typography.displayMd,
                  color: colors.primary,
                  marginBottom: spacing.sm,
                }}
              >
                Start your pet dashboard
              </Text>
              <Text style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.xxl }}>
                Add your first pet and start tracking moods, food, and potty updates.
              </Text>
              <PrimaryButton title="Create first pet" onPress={() => router.push("/dog/new")} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const dogEntries = [...entries]
    .filter((entry) => entry.dogId === currentDog.id)
    .sort((a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt));
  const latestEntry = dogEntries[0];

  const handleShare = async (nickname: string, mood: string) => {
    await Share.share({ message: `My dog today: ${nickname} — ${mood} ${getMoodEmoji(mood)}` });
  };

  const handleDelete = (entryId: string) => {
    Alert.alert("Delete entry", "Remove this mood card?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteEntry(entryId) },
    ]);
  };

  const handleAddDog = () => {
    if (hasPremium) {
      router.push("/dog/new");
      return;
    }
    router.push("/paywall");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flex: 1, paddingHorizontal: spacing.xl }}>
        <TopBar title="DogVibe" showBack={false} onMenuPress={() => router.push("/settings")} />

        <FlatList
          data={dogEntries}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.xxxl + 96 }}
          ListHeaderComponent={
            <View>
              <View
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: radius.xxl,
                  padding: spacing.xxl - spacing.xxs,
                  borderWidth: 1,
                  borderColor: colors.border,
                  marginBottom: spacing.lg,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.md }}>
                  <View
                    style={{
                      backgroundColor: colors.primarySoft,
                      borderRadius: radius.pill,
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.sm - spacing.xxs,
                    }}
                  >
                    <Text style={{ ...typography.caption, color: colors.primary }}>{streak} day streak</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.surfaceMuted,
                      borderRadius: radius.pill,
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.sm - spacing.xxs,
                    }}
                  >
                    <Text style={{ ...typography.caption, color: colors.textSecondary }}>
                      Current pet: {currentDog.name}
                    </Text>
                  </View>
                </View>

                <Text style={{ ...typography.displayMd, color: colors.textPrimary, marginBottom: spacing.sm }}>
                  Home Dashboard
                </Text>
                <Text style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.lg }}>
                  {latestEntry
                    ? `${latestEntry.nickname} feels ${latestEntry.mood} ${getMoodEmoji(latestEntry.mood)}`
                    : "No mood card yet. Tap + to capture one now."}
                </Text>

                <PrimaryButton title="Capture new mood" onPress={() => router.push("/capture")} />
              </View>

              <View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.lg }}>
                <Pressable
                  onPress={handleFoodPress}
                  style={({ pressed }) => ({
                    flex: 1,
                    borderRadius: radius.xl,
                    padding: spacing.lg,
                    minHeight: 96,
                    backgroundColor: pressed ? colors.blueDark : colors.blue,
                    borderWidth: 1,
                    borderColor: colors.border,
                  })}
                >
                  <Text style={{ ...typography.heading }}>🍖</Text> 
                  <Text style={{ ...typography.bodyStrong, color: colors.textPrimary, marginTop: spacing.xs }}>
                    Food
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handlePoopPress}
                  style={({ pressed }) => ({
                    flex: 1,
                    borderRadius: radius.xl,
                    padding: spacing.lg,
                    minHeight: 96,
                    backgroundColor: pressed ? colors.primaryPressed : colors.primarySoft,
                    borderWidth: 1,
                    borderColor: colors.border,
                  })}
                >
                  <Text style={{ ...typography.heading }}>💩</Text>
                  <Text style={{ ...typography.bodyStrong, color: colors.textPrimary, marginTop: spacing.xs }}>
                    Poop
                  </Text>
                </Pressable>
              </View>

              <View
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: radius.xl,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: spacing.lg,
                  marginBottom: spacing.lg,
                }}
              >
                <Text style={{ ...typography.caption, color: colors.textMuted, marginBottom: spacing.md }}>
                  YOUR PETS
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
                  {dogs.map((dog) => {
                    const selected = dog.id === currentDogId;
                    return (
                      <Pressable
                        key={dog.id}
                        onPress={() => setCurrentDog(dog.id)}
                        style={({ pressed }) => ({
                          width: 100,
                          minHeight: 92,
                          borderRadius: radius.lg,
                          padding: spacing.md,
                          backgroundColor: selected
                            ? colors.primarySoft
                            : pressed
                              ? colors.surfaceMuted
                              : colors.surface,
                          borderWidth: 1,
                          borderColor: selected ? colors.primary : colors.border,
                          justifyContent: "space-between",
                        })}
                      >
                        <Text style={{ ...typography.bodyStrong, color: colors.textPrimary }} numberOfLines={1}>
                          {dog.name}
                        </Text>
                        <Text style={{ ...typography.label, color: colors.textSecondary }} numberOfLines={1}>
                          {dog.breed || "Dog profile"}
                        </Text>
                      </Pressable>
                    );
                  })}
                  <Pressable
                    onPress={handleAddDog}
                    style={({ pressed }) => ({
                      width: 100,
                      minHeight: 92,
                      borderRadius: radius.lg,
                      padding: spacing.md,
                      backgroundColor: pressed ? colors.blueDark : colors.blueLight,
                      borderWidth: 1,
                      borderColor: colors.blueDark,
                      justifyContent: "center",
                      alignItems: "center",
                    })}
                  >
                    <Text style={{ ...typography.heading, color: colors.textPrimary }}>+ Add</Text>
                  </Pressable>
                </View>
              </View>

              <Text style={{ ...typography.caption, color: colors.textMuted, marginBottom: spacing.sm }}>
                RECENT MOOD CARDS
              </Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: radius.xl,
                borderWidth: 1,
                borderColor: colors.border,
                padding: spacing.md,
                marginBottom: spacing.md,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: spacing.sm,
                }}
              >
                <Text style={{ ...typography.label, color: colors.primary }}>
                  {index === 0 ? "Latest" : formatEntryDate(item.createdAt)}
                </Text>
                {index === 0 ? (
                  <Text style={{ ...typography.label, color: colors.textMuted }}>
                    {formatEntryDate(item.createdAt)}
                  </Text>
                ) : null}
              </View>

              <Image
                source={{ uri: item.imageUri }}
                style={{
                  width: "100%",
                  height: 210,
                  borderRadius: radius.lg,
                  marginBottom: spacing.md,
                  backgroundColor: colors.surfaceMuted,
                }}
              />
              <Text style={{ ...typography.heading, color: colors.textPrimary }}>{item.nickname}</Text>
              <Text style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.md }}>
                Mood: {item.mood} {getMoodEmoji(item.mood)}
              </Text>

              <View style={{ flexDirection: "row", gap: spacing.sm }}>
                <Pressable
                  onPress={() => handleShare(item.nickname, item.mood)}
                  style={({ pressed }) => ({
                    flex: 1,
                    minHeight: 44,
                    borderRadius: radius.md,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                  })}
                >
                  <Text style={{ ...typography.bodyStrong, color: colors.textPrimary }}>Share</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleDelete(item.id)}
                  style={({ pressed }) => ({
                    flex: 1,
                    minHeight: 44,
                    borderRadius: radius.md,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: pressed ? colors.primaryPressed : colors.primary,
                  })}
                >
                  <Text style={{ ...typography.bodyStrong, color: colors.textInverse }}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: radius.xl,
                borderWidth: 1,
                borderColor: colors.border,
                padding: spacing.xl,
              }}
            >
              <Text style={{ ...typography.heading, color: colors.textPrimary, marginBottom: spacing.sm }}>
                No entries yet
              </Text>
              <Text style={{ ...typography.body, color: colors.textSecondary }}>
                Use + or Capture to add your first mood card.
              </Text>
            </View>
          }
        />

        <BottomNav activeTab="home" onFoodPress={handleFoodPress} onPoopPress={handlePoopPress} />
      </View>
    </SafeAreaView>
  );
}