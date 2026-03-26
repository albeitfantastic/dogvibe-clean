import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../src/components/PrimaryButton';
import { useEntryDraftStore } from '../src/store/useEntryDraftStore';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { typography } from '../src/theme/typography';

export default function CaptureScreen() {
  const router = useRouter();
  const setDraftImageUri = useEntryDraftStore((state) => state.setDraftImageUri);

  const [loadingAction, setLoadingAction] = useState<'camera' | 'library' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPickedImage = (uri: string) => {
    setDraftImageUri(uri);
    router.push({ pathname: '/reveal' });
  };

  const handleTakePhoto = async () => {
    setErrorMessage(null);
    setLoadingAction('camera');

    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        setErrorMessage('Camera permission is required to take a photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.7,
        allowsEditing: false,
      });

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];
      if (!asset?.uri) {
        return;
      }

      onPickedImage(asset.uri);
    } catch {
      setErrorMessage('Unable to open camera right now.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleChooseFromLibrary = async () => {
    setErrorMessage(null);
    setLoadingAction('library');

    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setErrorMessage('Photo library permission is required to choose an image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.7,
        allowsEditing: false,
        selectionLimit: 1,
      });

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];
      if (!asset?.uri) {
        return;
      }

      onPickedImage(asset.uri);
    } catch {
      setErrorMessage('Unable to open photo library right now.');
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add today&apos;s photo</Text>
        <Text style={styles.subtitle}>
          Take a quick photo or choose one from your library.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label="Take photo"
          loading={loadingAction === 'camera'}
          disabled={loadingAction !== null}
          onPress={handleTakePhoto}
        />
        <PrimaryButton
          label="Choose from library"
          loading={loadingAction === 'library'}
          disabled={loadingAction !== null}
          onPress={handleChooseFromLibrary}
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
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
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  actions: {
    gap: spacing.sm,
  },
  error: {
    ...typography.caption,
    color: '#D95B43',
    textAlign: 'center',
  },
});