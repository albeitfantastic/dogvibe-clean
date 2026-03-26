import { useRouter } from "expo-router";
import { Alert, FlatList, Image, Pressable, Share, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../src/components/PrimaryButton";
import TopBar from "../src/components/TopBar";
import { useDogStore } from "../src/store/useDogStore";
import { useEntryStore } from "../src/store/useEntryStore";
import { formatEntryDate } from "../src/utils/date";
import { getMoodEmoji } from "../src/utils/mood";

export default function HomeScreen() {
  const router = useRouter();

  const currentDog = useDogStore((s) => s.getCurrentDog());
  const entries = useEntryStore((s) => s.entries);
  const streak = useEntryStore((s) => s.getCurrentStreak(currentDog?.id ?? null));
  const deleteEntry = useEntryStore((s) => s.deleteEntry);

  if (!currentDog) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f2ee" }} edges={["top"]}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 24 }}>
          <TopBar title="DogVibe" showBack={false} />

          <View style={{ flex: 1, justifyContent: "center" }}>
            <View
              style={{
                backgroundColor: "#fffaf7",
                borderRadius: 28,
                padding: 24,
                borderWidth: 1,
                borderColor: "#efe6e0",
                shadowColor: "#000",
                shadowOpacity: 0.04,
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 8 },
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "700",
                  color: "#1f1a17",
                  marginBottom: 10,
                }}
              >
                Capture your dog&apos;s daily vibe
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: "#6f6258",
                  marginBottom: 24,
                }}
              >
                One photo in, one adorable mood card out.
              </Text>

              <PrimaryButton title="Set up your dog" onPress={() => router.push("/dog/new")} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const dogEntries = [...entries]
    .filter((entry) => entry.dogId === currentDog.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const handleShare = async (nickname: string, mood: string) => {
    await Share.share({
      message: `My dog today: ${nickname} — ${mood} ${getMoodEmoji(mood)}`,
    });
  };

  const handleDelete = (entryId: string) => {
    Alert.alert("Delete entry", "Remove this mood card?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteEntry(entryId),
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f2ee" }} edges={["top"]}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <TopBar
          title="DogVibe"
          showBack={false}
          rightLabel="Settings"
          onRightPress={() => router.push("/settings")}
        />

        <FlatList
          data={dogEntries}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 36 }}
          ListHeaderComponent={
            <View>
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
                <View
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: "#fdf0eb",
                    borderRadius: 999,
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    marginBottom: 14,
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "600", color: "#b95d52" }}>
                    {streak} day streak
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "700",
                    color: "#1f1a17",
                    marginBottom: 6,
                  }}
                >
                  {currentDog.name}&apos;s vibe
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 23,
                    color: "#6f6258",
                    marginBottom: 18,
                  }}
                >
                  Capture one cozy check-in and keep your dog&apos;s daily mood log beautifully
                  together.
                </Text>

                <PrimaryButton title="Capture today’s vibe" onPress={() => router.push("/capture")} />
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
                    fontSize: 13,
                    fontWeight: "600",
                    color: "#9b8d82",
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    marginBottom: 8,
                  }}
                >
                  Current pup
                </Text>

                <Text style={{ fontSize: 20, fontWeight: "700", color: "#1f1a17", marginBottom: 4 }}>
                  {currentDog.name}
                </Text>

                <Text style={{ fontSize: 15, color: "#6f6258" }}>
                  {[currentDog.breed || "No breed yet", currentDog.ageBand || "No age band yet"].join(
                    " • ",
                  )}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: "#1f1a17",
                  marginBottom: 12,
                }}
              >
                Mood cards
              </Text>

              {dogEntries.length === 0 ? (
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 24,
                    padding: 22,
                    borderWidth: 1,
                    borderColor: "#efe6e0",
                    marginBottom: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#1f1a17",
                      marginBottom: 8,
                    }}
                  >
                    No vibes yet
                  </Text>

                  <Text style={{ fontSize: 15, lineHeight: 22, color: "#6f6258" }}>
                    Capture your first photo to start this dog&apos;s little mood diary.
                  </Text>
                </View>
              ) : null}
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 24,
                padding: 14,
                borderWidth: 1,
                borderColor: "#efe6e0",
                marginBottom: 14,
              }}
            >
              <Image
                source={{ uri: item.imageUri }}
                style={{
                  width: "100%",
                  height: 220,
                  borderRadius: 18,
                  marginBottom: 14,
                  backgroundColor: "#ede7e2",
                }}
              />

              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#9b8d82",
                  marginBottom: 6,
                }}
              >
                {formatEntryDate(item.createdAt)}
              </Text>

              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: "#1f1a17",
                  marginBottom: 4,
                }}
              >
                {item.nickname}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "#6f6258",
                  marginBottom: 14,
                }}
              >
                Mood: {item.mood} {getMoodEmoji(item.mood)}
              </Text>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  onPress={() => handleShare(item.nickname, item.mood)}
                  style={({ pressed }) => ({
                    flex: 1,
                    minHeight: 46,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: pressed ? "#eee7e2" : "#f4efec",
                  })}
                >
                  <Text style={{ fontSize: 15, fontWeight: "600", color: "#3a312c" }}>Share</Text>
                </Pressable>

                <Pressable
                  onPress={() => handleDelete(item.id)}
                  style={({ pressed }) => ({
                    flex: 1,
                    minHeight: 46,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: pressed ? "#fde7e5" : "#fff1ef",
                  })}
                >
                  <Text style={{ fontSize: 15, fontWeight: "600", color: "#c45b53" }}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}