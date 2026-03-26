import { Redirect } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../src/components/PrimaryButton';
import { useEntryDraftStore } from '../src/store/useEntryDraftStore';
import { colors } from '../src/theme/colors';
import { radius } from '../src/theme/radius';
import { spacing } from '../src/theme/spacing';
import { typography } from '../src/theme/typography';

export default function RevealScreen() {
  const draftImageUri = useEntryDraftStore((state) => state.draftImageUri);
  const resetDraft = useEntryDraftStore((state) => state.resetDraft);

  if (!draftImageUri) {
    return <Redirect href={{ pathname: '/' }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reveal</Text>

        <Image source={{ uri: draftImageUri }} style={styles.photo} />

        <Text style={styles.subtitle}>Your selected photo was captured successfully.</Text>
      </View>

      <PrimaryButton
        label="Clear draft"
        onPress={() => {
          resetDraft();
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
    gap: spacing.lg,
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
  photo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
  },
});