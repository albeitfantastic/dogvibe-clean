import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../src/components/PrimaryButton';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { typography } from '../src/theme/typography';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to DogVibe</Text>
        <Text style={styles.subtitle}>
          Take one photo a day and capture your dog&apos;s personality.
        </Text>
      </View>

      <PrimaryButton
        label="Create your dog"
        onPress={() => {
          router.push({ pathname: '/dog/new' });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  content: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
});