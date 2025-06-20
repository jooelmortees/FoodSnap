import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ingredient, Recipe, UserPreferences, AppView } from '../types';
import { ImageUploader } from '../components/ImageUploader';
import { IngredientEditor } from '../components/IngredientEditor';
import { RecipeSuggestions } from '../components/RecipeSuggestions';
import { RecipeDetailView } from '../components/RecipeDetailView';
import { identifyIngredientsFromImage, suggestRecipes } from '../services/geminiService';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AlertTriangleIcon } from '../components/icons/Icons';
import { Colors } from '../constants/Colors';

export default function HomeScreen() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [uploadedImages, setUploadedImages] = useState<string[] | null>(null);
  const [detectedIngredients, setDetectedIngredients] = useState<Ingredient[]>([]);
  const [suggestedRecipesList, setSuggestedRecipesList] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    timeAvailable: 'normal',
    dietaryGoal: 'hearty',
    specificDiets: [],
    desiredServings: 4,
  });

  const resetError = () => setError(null);

  const handleImageUpload = useCallback(async (imageDataUrls: string[]) => {
    resetError();
    setUploadedImages(imageDataUrls);
    setIsLoading(true);
    setCurrentView(AppView.INGREDIENT_EDIT);
    
    try {
      const allIdentifiedIngredientsArrays = await Promise.all(
        imageDataUrls.map(url => identifyIngredientsFromImage(url))
      );
      const aggregatedIngredients = allIdentifiedIngredientsArrays.flat();
      
      // Deduplicate ingredients
      const uniqueIngredientsMap = new Map<string, Ingredient>();
      aggregatedIngredients.forEach(ingredient => {
        if (ingredient && ingredient.name) {
          const normalizedName = ingredient.name.toLowerCase().trim();
          if (!uniqueIngredientsMap.has(normalizedName)) {
            uniqueIngredientsMap.set(normalizedName, ingredient);
          }
        }
      });
      const finalDetectedIngredients = Array.from(uniqueIngredientsMap.values());

      setDetectedIngredients(finalDetectedIngredients.map((ing, index) => ({ 
        ...ing, 
        id: `ing-${Date.now()}-${index}` 
      })));
      
      if (finalDetectedIngredients.length === 0 && imageDataUrls.length > 0) {
        setError("No pudimos identificar ingredientes en las imágenes. Inténtalo de nuevo con imágenes más claras o edita la lista manualmente.");
      }
    } catch (err) {
      console.error("Error identifying ingredients from multiple images:", err);
      setError("No pudimos identificar los ingredientes de una o más imágenes. Inténtalo de nuevo o edita la lista manualmente.");
      setDetectedIngredients([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleIngredientsConfirm = useCallback(async (finalIngredients: Ingredient[]) => {
    if (finalIngredients.length === 0) {
      setError("Por favor, añade al menos un ingrediente para buscar recetas.");
      return;
    }
    
    resetError();
    setDetectedIngredients(finalIngredients);
    setIsLoading(true);
    setCurrentView(AppView.RECIPE_SUGGESTIONS);
    
    try {
      const recipes = await suggestRecipes(finalIngredients, userPreferences);
      setSuggestedRecipesList(recipes.map((rec, index) => ({ 
        ...rec, 
        id: `rec-${Date.now()}-${index}` 
      })));
      
      if (recipes.length === 0) {
        setError("No encontramos recetas con esos ingredientes y preferencias. Prueba a ajustar los ingredientes o preferencias.");
      }
    } catch (err) {
      console.error("Error suggesting recipes:", err);
      setError("Hubo un problema al generar recetas. Por favor, inténtalo de nuevo.");
      setSuggestedRecipesList([]);
    } finally {
      setIsLoading(false);
    }
  }, [userPreferences]);

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView(AppView.RECIPE_DETAIL);
  };

  const handleBack = () => {
    resetError();
    if (currentView === AppView.RECIPE_DETAIL) {
      setCurrentView(AppView.RECIPE_SUGGESTIONS);
      setSelectedRecipe(null);
    } else if (currentView === AppView.RECIPE_SUGGESTIONS) {
      setCurrentView(AppView.INGREDIENT_EDIT);
      setSuggestedRecipesList([]);
    } else if (currentView === AppView.INGREDIENT_EDIT) {
      setCurrentView(AppView.HOME);
      setUploadedImages(null);
      setDetectedIngredients([]);
    }
  };
  
  const handlePreferencesChange = (newPreferences: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  useEffect(() => {
    if (currentView === AppView.HOME) {
      setUploadedImages(null);
      setDetectedIngredients([]);
      setSuggestedRecipesList([]);
      setSelectedRecipe(null);
    }
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <ImageUploader 
            onImageUpload={handleImageUpload} 
            isLoadingExternal={isLoading} 
          />
        );
      case AppView.INGREDIENT_EDIT:
        return (
          <IngredientEditor
            initialIngredients={detectedIngredients}
            onConfirm={handleIngredientsConfirm}
            onBack={handleBack}
            uploadedImages={uploadedImages}
            isLoading={isLoading}
          />
        );
      case AppView.RECIPE_SUGGESTIONS:
        return (
          <RecipeSuggestions
            recipes={suggestedRecipesList}
            onSelectRecipe={handleSelectRecipe}
            onBack={handleBack}
            onRefresh={() => handleIngredientsConfirm(detectedIngredients)}
            isLoading={isLoading}
            userPreferences={userPreferences}
            onPreferencesChange={handlePreferencesChange}
          />
        );
      case AppView.RECIPE_DETAIL:
        if (selectedRecipe) {
          return <RecipeDetailView recipe={selectedRecipe} onBack={handleBack} />;
        }
        setCurrentView(AppView.RECIPE_SUGGESTIONS); 
        return null; 
      default:
        setCurrentView(AppView.HOME); 
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.primary.DEFAULT} />
      <Header onLogoClick={() => setCurrentView(AppView.HOME)} />
      
      <View style={styles.main}>
        {error && (
          <View style={styles.errorContainer}>
            <View style={styles.errorContent}>
              <AlertTriangleIcon width={24} height={24} color={Colors.error.DEFAULT} />
              <View style={styles.errorTextContainer}>
                <Text style={styles.errorTitle}>¡Ups! Algo salió mal.</Text>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </View>
          </View>
        )}
        {renderView()}
      </View>
      
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  errorContainer: {
    backgroundColor: Colors.error.light + '20',
    borderLeftWidth: 4,
    borderLeftColor: Colors.error.DEFAULT,
    padding: 16,
    marginBottom: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
    errorContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  errorTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error.DEFAULT,
    marginBottom: 4,
  },
  errorMessage: {
    fontSize: 14,
    color: Colors.error.DEFAULT,
    lineHeight: 20,
  },
});