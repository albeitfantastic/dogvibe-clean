import { StyleSheet, Text, View } from 'react-native';

import { useDogStore } from '@/src/store/useDogStore';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function HomeScreen() {
  const dog = useDogStore((state) => state.currentDog);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DogVibe</Text>
      <Text style={styles.text}>
        {dog ? `Current dog: ${dog.name}` : 'No dog created yet'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  text: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});