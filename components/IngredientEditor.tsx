import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ingredient } from '../types';
import { Button } from './Button';
import { PlusCircleIcon, TrashIcon, CheckCircleIcon, ArrowLeftIcon, PackageIcon } from './icons/Icons';
import { LoadingSpinner } from './LoadingSpinner';
import { Colors } from '../constants/Colors';

interface IngredientEditorProps {
  initialIngredients: Ingredient[];
  onConfirm: (ingredients: Ingredient[]) => void;
  onBack: () => void;
  uploadedImages?: string[] | null;
  isLoading?: boolean;
}

export const IngredientEditor: React.FC<IngredientEditorProps> = ({
  initialIngredients,
  onConfirm,
  onBack,
  uploadedImages,
  isLoading = false
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('unidad(es)');

  useEffect(() => {
    setIngredients(initialIngredients.map((ing, idx) => ({ 
      ...ing, 
      id: ing.id || `init-${Date.now()}-${idx}` 
    })));
  }, [initialIngredients]);

  const handleAddIngredient = () => {
    if (newItemName.trim() === '') return;
    
    const fullQuantity = `${newItemQuantity.trim()} ${newItemUnit.trim()}`.trim();
    const newIngredient: Ingredient = {
      id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newItemName.trim(),
      quantity: fullQuantity || '1 unidad',
    };
    
    setIngredients([...ingredients, newIngredient]);
    setNewItemName('');
    setNewItemQuantity('1');
    setNewItemUnit('unidad(es)');
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const handleUpdateIngredient = (id: string, field: 'name' | 'quantity', value: string) => {
    setIngredients(
      ingredients.map(ing => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeftIcon width={24} height={24} color={Colors.primary.DEFAULT} />
          </TouchableOpacity>
          <Text style={styles.title}>Revisa tus Ingredientes</Text>
          <View style={styles.spacer} />
        </View>

        {uploadedImages && uploadedImages.length > 0 && (
          <View style={styles.imagesContainer}>
            <Text style={styles.sectionTitle}>Imágenes Analizadas:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesScrollView}>
              {uploadedImages.map((src, idx) => (
                <Image 
                  key={idx} 
                  source={{ uri: src }} 
                  style={styles.uploadedImage}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {isLoading && initialIngredients.length === 0 && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner size="large" />
            <Text style={styles.loadingText}>Analizando tus imágenes...</Text>
            <Text style={styles.loadingSubtext}>Esto tomará solo un momento.</Text>
          </View>
        )}

        {(!isLoading || initialIngredients.length > 0) && (
          <>
            {ingredients.length === 0 && !isLoading && (
              <View style={styles.emptyContainer}>
                <PackageIcon width={64} height={64} color={Colors.gray[400]} />
                <Text style={styles.emptyTitle}>Lista de Ingredientes Vacía</Text>
                <Text style={styles.emptySubtitle}>
                  No se detectaron ingredientes o la lista está vacía.{'\n'}¡Añade algunos manualmente para empezar!
                </Text>
              </View>
            )}

            {ingredients.length > 0 && (
              <View style={styles.ingredientsContainer}>
                <Text style={styles.sectionTitle}>Ingredientes Detectados:</Text>
                <ScrollView style={styles.ingredientsList}>
                  {ingredients.map((ingredient) => (
                    <View key={ingredient.id} style={styles.ingredientItem}>
                      <TextInput
                        value={ingredient.name}
                        onChangeText={(value) => handleUpdateIngredient(ingredient.id, 'name', value)}
                        placeholder="Nombre del ingrediente"
                        style={styles.ingredientNameInput}
                      />
                      <TextInput
                        value={ingredient.quantity}
                        onChangeText={(value) => handleUpdateIngredient(ingredient.id, 'quantity', value)}
                        placeholder="Cantidad (ej: 200g, 1 taza)"
                        style={styles.ingredientQuantityInput}
                      />
                      <TouchableOpacity
                        onPress={() => handleRemoveIngredient(ingredient.id)}
                        style={styles.removeButton}
                      >
                        <TrashIcon width={20} height={20} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.addIngredientContainer}>
              <Text style={styles.sectionTitle}>Añadir Ingrediente Manualmente</Text>
              
              <View style={styles.addIngredientForm}>
                <View style={styles.nameInputContainer}>
                  <Text style={styles.inputLabel}>Nombre del Ingrediente</Text>
                  <TextInput
                    value={newItemName}
                    onChangeText={setNewItemName}
                    placeholder="Ej: Tomates cherry"
                    style={styles.textInput}
                  />
                </View>
                
                <View style={styles.quantityContainer}>
                  <View style={styles.quantityInputContainer}>
                    <Text style={styles.inputLabel}>Cant.</Text>
                    <TextInput
                      value={newItemQuantity}
                      onChangeText={setNewItemQuantity}
                      placeholder="Ej: 250"
                      style={styles.textInput}
                    />
                  </View>
                  
                  <View style={styles.unitInputContainer}>
                    <Text style={styles.inputLabel}>Unidad</Text>
                    <TextInput
                      value={newItemUnit}
                      onChangeText={setNewItemUnit}
                      placeholder="Ej: gramos"
                      style={styles.textInput}
                    />
                  </View>
                </View>
                
                <Button
                  onPress={handleAddIngredient}
                  variant="secondary"
                  style={styles.addButton}
                >
                  <PlusCircleIcon width={20} height={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                  Añadir a la lista
                </Button>
              </View>
            </View>
          </>
        )}

        <View style={styles.confirmContainer}>
          <Button
            onPress={() => onConfirm(ingredients)}
            size="large"
            disabled={isLoading || ingredients.length === 0}
            loading={isLoading && ingredients.length > 0}
            style={styles.confirmButton}
          >
            <CheckCircleIcon width={20} height={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            Buscar Recetas
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    backgroundColor: Colors.surface,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.onSurface.DEFAULT,
    textAlign: 'center',
  },
  spacer: {
    width: 40,
  },
  imagesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.onSurface.light,
    marginBottom: 12,
  },
  imagesScrollView: {
    backgroundColor: Colors.gray[50],
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  uploadedImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    marginRight: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    marginVertical: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: Colors.onSurface.light,
  },
  loadingSubtext: {
    fontSize: 14,
    color: Colors.gray[500],
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    marginVertical: 32,
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.onSurface.DEFAULT,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.onSurface.light,
    textAlign: 'center',
    lineHeight: 24,
  },
  ingredientsContainer: {
    marginBottom: 40,
  },
  ingredientsList: {
    maxHeight: 300,
  },
  ingredientItem: {
    flexDirection: 'column',
    gap: 8,
    padding: 12,
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginBottom: 12,
  },
  ingredientNameInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 6,
    backgroundColor: Colors.surface,
    fontSize: 16,
  },
  ingredientQuantityInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 6,
    backgroundColor: Colors.surface,
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: Colors.error.DEFAULT,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIngredientContainer: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  addIngredientForm: {
    gap: 12,
  },
  nameInputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[700],
    marginBottom: 4,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 6,
    backgroundColor: Colors.surface,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  quantityInputContainer: {
    flex: 1,
  },
  unitInputContainer: {
    flex: 1,
  },
  addButton: {
    marginTop: 12,
  },
  confirmContainer: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    alignItems: 'flex-end',
  },
  confirmButton: {
    minWidth: 180,
  },
});