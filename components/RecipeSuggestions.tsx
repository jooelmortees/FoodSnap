import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Recipe, UserPreferences } from '../types';
import { RecipeCard } from './RecipeCard';
import { Button } from './Button';
import { ArrowLeftIcon, RefreshCwIcon, FilterIcon, UtensilsCrossedIcon, PlusIcon, MinusIcon } from './icons/Icons';
import { LoadingSpinner } from './LoadingSpinner';
import { Colors } from '../constants/Colors';

interface RecipeSuggestionsProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onBack: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
  userPreferences: UserPreferences;
  onPreferencesChange: (newPreferences: Partial<UserPreferences>) => void;
}

export const RecipeSuggestions: React.FC<RecipeSuggestionsProps> = ({
  recipes,
  onSelectRecipe,
  onBack,
  onRefresh,
  isLoading = false,
  userPreferences,
  onPreferencesChange
}) => {
  
  const handlePreferenceChange = <K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ) => {
    onPreferencesChange({ [key]: value });
  };
  
  const handleDietChange = (diet: string) => {
    const newDiets = userPreferences.specificDiets.includes(diet)
      ? userPreferences.specificDiets.filter(d => d !== diet)
      : [...userPreferences.specificDiets, diet];
    onPreferencesChange({ specificDiets: newDiets });
  };

  const handleDecreaseServings = () => {
    const currentServings = userPreferences.desiredServings || 1;
    if (currentServings > 1) {
      onPreferencesChange({ desiredServings: currentServings - 1 });
    }
  };

  const handleIncreaseServings = () => {
    const currentServings = userPreferences.desiredServings || 0;
    onPreferencesChange({ desiredServings: currentServings + 1 });
  };

  const dietOptions = [
    "Vegana", 
    "Vegetariana", 
    "Sin Gluten", 
    "Baja en Carbohidratos", 
    "Sin Lácteos", 
    "Pescatariana",
    "Alta en Proteínas",
    "Fitness",
    "Aumento Muscular"
  ];

  if (isLoading && recipes.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" />
        <Text style={styles.loadingText}>Buscando recetas deliciosas para ti...</Text>
        <Text style={styles.loadingSubtext}>Un momento, por favor.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeftIcon width={24} height={24} color={Colors.primary.DEFAULT} />
          </TouchableOpacity>
          <Text style={styles.title}>Recetas Sugeridas</Text>
          <TouchableOpacity onPress={onRefresh} style={styles.refreshButton} disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner size="small" />
            ) : (
              <RefreshCwIcon width={24} height={24} color={Colors.primary.DEFAULT} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.filtersContainer}>
          <View style={styles.filtersHeader}>
            <FilterIcon width={20} height={20} color={Colors.primary.DEFAULT} />
            <Text style={styles.filtersTitle}>Filtra tus Preferencias</Text>
          </View>
          
          <View style={styles.filtersContent}>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Tiempo disponible:</Text>
              <View style={styles.segmentedControl}>
                {[
                  { key: 'quick', label: 'Rápido (<30min)' },
                  { key: 'normal', label: 'Normal (30-60min)' },
                  { key: 'advanced', label: 'Avanzado' }
                ].map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.segmentButton,
                      userPreferences.timeAvailable === option.key && styles.segmentButtonActive
                    ]}
                    onPress={() => handlePreferenceChange('timeAvailable', option.key as any)}
                  >
                    <Text style={[
                      styles.segmentButtonText,
                      userPreferences.timeAvailable === option.key && styles.segmentButtonTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Objetivo dietético:</Text>
              <View style={styles.segmentedControl}>
                {[
                  { key: 'light', label: 'Ligera' },
                  { key: 'hearty', label: 'Contundente' },
                  { key: 'use_leftovers', label: 'Sobras' }
                ].map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.segmentButton,
                      userPreferences.dietaryGoal === option.key && styles.segmentButtonActive
                    ]}
                    onPress={() => handlePreferenceChange('dietaryGoal', option.key as any)}
                  >
                    <Text style={[
                      styles.segmentButtonText,
                      userPreferences.dietaryGoal === option.key && styles.segmentButtonTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Número de Porciones:</Text>
              <View style={styles.servingsControl}>
                <TouchableOpacity 
                  onPress={handleDecreaseServings} 
                  style={styles.servingsButton}
                >
                  <MinusIcon width={16} height={16} color={Colors.primary.DEFAULT} />
                </TouchableOpacity>
                <Text style={styles.servingsValue}>
                  {userPreferences.desiredServings || 4}
                </Text>
                <TouchableOpacity 
                  onPress={handleIncreaseServings} 
                  style={styles.servingsButton}
                >
                  <PlusIcon width={16} height={16} color={Colors.primary.DEFAULT} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Dietas específicas:</Text>
              <View style={styles.dietTags}>
                {dietOptions.map(diet => (
                  <TouchableOpacity
                    key={diet}
                    style={[
                      styles.dietTag,
                      userPreferences.specificDiets.includes(diet) && styles.dietTagActive
                    ]}
                    onPress={() => handleDietChange(diet)}
                  >
                    <Text style={[
                      styles.dietTagText,
                      userPreferences.specificDiets.includes(diet) && styles.dietTagTextActive
                    ]}>
                      {diet}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Button 
            onPress={onRefresh} 
            style={styles.applyFiltersButton}
            disabled={isLoading}
            loading={isLoading}
          >
            Aplicar Filtros y Refrescar
          </Button>
        </View>

        {recipes.length === 0 && !isLoading && (
          <View style={styles.emptyContainer}>
            <UtensilsCrossedIcon width={64} height={64} color={Colors.gray[400]} />
            <Text style={styles.emptyTitle}>No se encontraron recetas</Text>
            <Text style={styles.emptySubtitle}>
              Intenta ajustar tus ingredientes o las preferencias de filtro.{'\n'}
              A veces, menos filtros dan más opciones.
            </Text>
          </View>
        )}

        <View style={styles.recipesContainer}>
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onSelect={() => onSelectRecipe(recipe)} 
            />
          ))}
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    fontSize: 20,
    color: Colors.onSurface.light,
    marginTop: 24,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: Colors.gray[500],
    marginTop: 8,
    textAlign: 'center',
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
    fontSize: 24,
    fontWeight: '600',
    color: Colors.onSurface.DEFAULT,
    textAlign: 'center',
  },
  refreshButton: {
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: Colors.gray[50],
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
    filtersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onSurface.DEFAULT,
    marginLeft: 8,
  },
  filtersContent: {
    gap: 20,
  },
  filterRow: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[700],
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary.DEFAULT,
  },
  segmentButtonText: {
    fontSize: 12,
    color: Colors.gray[600],
    fontWeight: '500',
  },
  segmentButtonTextActive: {
    color: '#FFFFFF',
  },
  servingsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  servingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.primary.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  servingsValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onSurface.DEFAULT,
    minWidth: 40,
    textAlign: 'center',
  },
  dietTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary.DEFAULT,
    backgroundColor: Colors.surface,
  },
  dietTagActive: {
    backgroundColor: Colors.primary.DEFAULT,
  },
  dietTagText: {
    fontSize: 12,
    color: Colors.primary.DEFAULT,
    fontWeight: '500',
  },
  dietTagTextActive: {
    color: '#FFFFFF',
  },
  applyFiltersButton: {
    marginTop: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    marginVertical: 32,
    backgroundColor: Colors.gray[50] + '80',
    borderRadius: 12,
    paddingHorizontal: 24,
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
  recipesContainer: {
    gap: 16,
  },
});