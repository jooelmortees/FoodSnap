import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraIcon, UploadIcon, PhotoIcon, TrashIcon } from './icons/Icons';
import { Button } from './Button';
import { LoadingSpinner } from './LoadingSpinner';
import { Colors } from '../constants/Colors';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrls: string[]) => void;
  isLoadingExternal?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  isLoadingExternal = false 
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert(
        'Permisos necesarios',
        'Necesitamos permisos de cámara y galería para funcionar correctamente.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setError(null);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        if (asset.base64) {
          const dataUrl = `data:image/jpeg;base64,${asset.base64}`;
          setPreviews(prev => [...prev, dataUrl]);
        }
      }
    } catch (err) {
      setError('Error al tomar la foto. Inténtalo de nuevo.');
      console.error('Camera error:', err);
    }
  };

  const handlePickImages = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setError(null);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newPreviews: string[] = [];
        
        for (const asset of result.assets) {
          if (asset.base64) {
            const dataUrl = `data:image/jpeg;base64,${asset.base64}`;
            newPreviews.push(dataUrl);
          }
        }
        
        setPreviews(prev => [...prev, ...newPreviews]);
      }
    } catch (err) {
      setError('Error al seleccionar imágenes. Inténtalo de nuevo.');
      console.error('Image picker error:', err);
    }
  };

  const handleRemovePreview = (indexToRemove: number) => {
    setPreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmitImages = () => {
    if (previews.length > 0) {
      setIsProcessing(true);
      onImageUpload(previews);
    } else {
      setError('Por favor, selecciona o captura al menos una imagen.');
    }
  };

  const effectiveIsLoading = isProcessing || isLoadingExternal;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <PhotoIcon width={80} height={80} color={Colors.primary.DEFAULT} />
        
        <Text style={styles.title}>
          Descubre Recetas con <Text style={styles.titleAccent}>FoodSnap</Text>
        </Text>
        
        <Text style={styles.subtitle}>
          ¿Nevera llena, cero ideas? Toma o sube una o varias fotos de tus ingredientes y deja que nuestra IA te inspire.
        </Text>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {previews.length > 0 && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Imágenes seleccionadas:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.previewScrollView}>
              {previews.map((preview, index) => (
                <View key={index} style={styles.previewImageContainer}>
                  <Image source={{ uri: preview }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemovePreview(index)}
                  >
                    <TrashIcon width={12} height={12} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleTakePhoto}
            variant="secondary"
            size="large"
            style={styles.actionButton}
            disabled={effectiveIsLoading}
          >
            <CameraIcon width={20} height={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            Tomar Foto
          </Button>

          <Button
            onPress={handlePickImages}
            variant="secondary"
            size="large"
            style={styles.actionButton}
            disabled={effectiveIsLoading}
          >
            <UploadIcon width={20} height={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            Subir Imágenes
          </Button>
        </View>

        {previews.length > 0 && (
          <Button
            onPress={handleSubmitImages}
            size="large"
            style={styles.submitButton}
            disabled={effectiveIsLoading || previews.length === 0}
            loading={effectiveIsLoading}
          >
            {effectiveIsLoading ? 'Analizando...' : 'Analizar Ingredientes'}
          </Button>
        )}

        {previews.length === 0 && !effectiveIsLoading && (
          <Text style={styles.tipText}>
            Consejo: Sube una o varias imágenes claras donde los ingredientes estén bien iluminados.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.onSurface.DEFAULT,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  titleAccent: {
    color: Colors.primary.DEFAULT,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.onSurface.light,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  errorContainer: {
    backgroundColor: Colors.error.light + '20',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: Colors.error.DEFAULT,
    fontSize: 14,
    textAlign: 'center',
  },
  previewContainer: {
    width: '100%',
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.onSurface.light,
    marginBottom: 12,
  },
  previewScrollView: {
    backgroundColor: Colors.gray[50],
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  previewImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  previewImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.gray[300],
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.error.DEFAULT,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    width: '100%',
  },
  actionButton: {
    flex: 1,
  },
  submitButton: {
    width: '100%',
    marginBottom: 20,
  },
  tipText: {
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
    lineHeight: 20,
  },
});