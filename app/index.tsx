import { useRouter } from "expo-router";
import { Alert, FlatList, Image, Pressable, Share, Text, View } from "react-native";
import PrimaryButton from "../src/components/PrimaryButton";
import { useDogStore } from "../src/store/useDogStore";
import { useEntryStore } from "../src/store/useEntryStore";
import { formatEntryDate } from "../src/utils/date";
import { getMoodEmoji } from "../src/utils/mood";

export default function HomeScreen() {
  const router = useRouter();

  const currentDog = useDogStore((s) => s.getCurrentDog());
  const entries = useEntryStore((s) => s.entries);
  const streak = useEntryStore((s) =>
    s.getCurrentStreak(currentDog?.id ?? null)
  );
  const deleteEntry = useEntryStore((s) => s.deleteEntry);

  if (!currentDog) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f7f2f2",
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 32,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 28,
            padding: 24,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "800",
              color: "#1f1f1f",
              marginBottom: 12,
              letterSpacing: -1,
            }}
          >
            DogVibe
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: "#6b6b6b",
              lineHeight: 27,
              marginBottom: 28,
            }}
          >
            Capture your dog&apos;s daily vibe in one photo.
          </Text>

          <PrimaryButton
            title="Set up your dog"
            onPress={() => router.push("/dog/new")}
          />
        </View>
      </View>
    );
  }

  const dogEntries = entries.filter((entry) => entry.dogId === currentDog.id);

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
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7f2f2",
        paddingHorizontal: 16,
        paddingTop: 24,
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 28,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#ff6b6b",
                fontWeight: "700",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Daily vibe log
            </Text>

            <Text
              style={{
                fontSize: 30,
                fontWeight: "800",
                color: "#1f1f1f",
                letterSpacing: -0.8,
              }}
            >
              {currentDog.name}&apos;s vibe
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#6b6b6b",
                marginTop: 8,
                lineHeight: 24,
              }}
            >
              Capture one photo per day to track your dog&apos;s vibe.
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/settings")}
            style={{
              backgroundColor: "#f7f2f2",
              borderRadius: 999,
              paddingHorizontal: 14,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                color: "#1f1f1f",
                fontWeight: "700",
              }}
            >
              Settings
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            marginTop: 16,
            alignSelf: "flex-start",
            backgroundColor: "#fff4e8",
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: "#d97706",
            }}
          >
            🔥 {streak} day streak
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 16 }}>
        <PrimaryButton
          title="Add today&apos;s photo"
          onPress={() => router.push("/capture")}
        />
      </View>

      {dogEntries.length === 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 28,
            paddingVertical: 32,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: "#1f1f1f",
              marginBottom: 10,
            }}
          >
            No vibes yet 🐶
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#6b6b6b",
              textAlign: "center",
              lineHeight: 23,
            }}
          >
            Capture your first photo to get a vibe reading.
          </Text>
        </View>
      ) : (
        <FlatList
          data={dogEntries}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 28,
                padding: 12,
                marginBottom: 16,
              }}
            >
              <Image
                source={{ uri: item.imageUri }}
                style={{
                  width: "100%",
                  height: 260,
                  borderRadius: 22,
                }}
              />

              <View
                style={{
                  paddingHorizontal: 6,
                  paddingTop: 14,
                  paddingBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: "#ff6b6b",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 8,
                  }}
                >
                  {formatEntryDate(item.createdAt)}
                </Text>

                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "800",
                    color: "#1f1f1f",
                    letterSpacing: -0.5,
                  }}
                >
                  {item.nickname}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: "#6b6b6b",
                    marginTop: 6,
                    lineHeight: 22,
                  }}
                >
                  Mood: {item.mood} {getMoodEmoji(item.mood)}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: 14,
                  }}
                >
                  <Pressable
                    onPress={() => handleShare(item.nickname, item.mood)}
                    style={{
                      backgroundColor: "#f7f2f2",
                      borderRadius: 999,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#1f1f1f",
                        fontWeight: "700",
                      }}
                    >
                      Share
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handleDelete(item.id)}
                    style={{
                      backgroundColor: "#fff1f1",
                      borderRadius: 999,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#d11a2a",
                        fontWeight: "700",
                      }}
                    >
                      Delete
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}