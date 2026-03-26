import "react-native-get-random-values";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="capture" />
      <Stack.Screen name="reveal" />
      <Stack.Screen name="analyze" />
      <Stack.Screen name="result" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="paywall" />
      <Stack.Screen name="dog/new" />
    </Stack>
  );
}