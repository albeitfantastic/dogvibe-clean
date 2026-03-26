import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import PrimaryButton from '../../src/components/PrimaryButton';
import { useDogStore } from '../../src/store/useDogStore';
import { colors } from '../../src/theme/colors';
import { radius } from '../../src/theme/radius';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';
import type { AgeBand } from '../../src/types/domain';

const AGE_BANDS: AgeBand[] = ['puppy', 'young', 'adult', 'senior'];

export default function NewDogScreen() {
  const router = useRouter();
  const createDog = useDogStore((state) => state.createDog);

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [ageBand, setAgeBand] = useState<AgeBand | undefined>(undefined);

  const isValid = name.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Dog name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Bella"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Breed (optional)</Text>
          <TextInput
            value={breed}
            onChangeText={setBreed}
            placeholder="Golden Retriever"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Age band (optional)</Text>
          <View style={styles.ageRow}>
            {AGE_BANDS.map((item) => {
              const selected = ageBand === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setAgeBand(item)}
                  style={[styles.ageChip, selected && styles.ageChipSelected]}
                >
                  <Text style={[styles.ageChipText, selected && styles.ageChipTextSelected]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <PrimaryButton
        label="Create dog"
        disabled={!isValid}
        onPress={() => {
          createDog({
            name: name.trim(),
            breed: breed.trim() || undefined,
            ageBand,
          });
          router.replace({ pathname: '/' });
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
  form: {
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  input: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
    ...typography.body,
  },
  ageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  ageChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  ageChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ageChipText: {
    ...typography.caption,
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  ageChipTextSelected: {
    color: colors.textInverse,
  },
});