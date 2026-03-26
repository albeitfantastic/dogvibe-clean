import { Redirect, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../src/components/PrimaryButton';
import { useDogStore } from '../src/store/useDogStore';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { typography } from '../src/theme/typography';

export default function HomeScreen() {
  const router = useRouter();
  const dog = useDogStore((state) => state.currentDog);

  if (!dog) {
    return <Redirect href={{ pathname: '/onboarding' }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hi, {dog.name}!</Text>
        <Text style={styles.text}>Ready to log today&apos;s vibe?</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label="Log today"
          onPress={() => {
            router.push({ pathname: '/capture' });
          }}
        />
        <PrimaryButton
          label="Edit dog"
          onPress={() => {
            router.push({ pathname: '/dog/new' });
          }}
        />
      </View>
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
  actions: {
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  text: {
    ...typography.body,
    color: colors.textSecondary,
  },
});