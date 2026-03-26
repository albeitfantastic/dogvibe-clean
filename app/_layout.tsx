import { Stack } from 'expo-router';
import 'react-native-get-random-values';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          title: 'Welcome',
        }}
      />
      <Stack.Screen
        name="dog/new"
        options={{
          title: 'New Dog',
        }}
      />
      <Stack.Screen
        name="capture"
        options={{
          title: 'Capture',
        }}
      />
      <Stack.Screen
        name="reveal"
        options={{
          title: 'Reveal',
        }}
      />
    </Stack>
  );
}