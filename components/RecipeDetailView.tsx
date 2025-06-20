import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Recipe } from '../types';
import { Button } from './Button';
import { ArrowLeftIcon, ClockIcon, UsersIcon, LeafIcon, SparklesIcon, ClipboardListIcon, UtensilsIcon, Edit3Icon } from './icons/Icons';
import { Colors } from '../constants/Colors';

interface RecipeDetailViewProps {
  recipe: Recipe;
  onBack: () => void;
}

const FALLBACK_DETAIL_IMAGE_URL = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhlYWx0aHklMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80';

const InfoPill: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <View style={styles.infoPill}>
    <View style={styles.infoPillIcon}>
  {typeof icon === 'string' ? <Text>{icon}</Text> : icon}
</View>
    <Text style={styles.infoPillText}>
      <Text style={styles.infoPillLabel}>{label}:</Text> {value}
    </Text>
  </View>
);

export const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({ recipe, onBack }) => {
  const imageUrl = 
    recipe.imageUrl && (recipe.imageUrl.startsWith('data:image/') || recipe.imageUrl.startsWith('http'))
      ? recipe.imageUrl
      : recipe.imageQuery
        ? `https://source.unsplash.com/800x600/?${encodeURIComponent(recipe.imageQuery)},food,cooking`
        : FALLBACK_DETAIL_IMAGE_URL;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeftIcon width={24} height={24} color={Colors.primary.DEFAULT} />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title}
          </Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }}
            style={styles.image}
            defaultSource={{ uri: FALLBACK_DETAIL_IMAGE_URL }}
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.infoPillsContainer}>
            <InfoPill 
              icon={<UsersIcon width={20} height={20} color={Colors.secondary.DEFAULT} />} 
              label="Porciones" 
              value={recipe.servings} 
            />
            <InfoPill 
              icon={<ClockIcon width={20} height={20} color={Colors.secondary.DEFAULT} />} 
              label="Preparación" 
              value={recipe.prepTime} 
            />
            <InfoPill 
              icon={<ClockIcon width={20} height={20} color={Colors.secondary.DEFAULT} />} 
              label="Cocción" 
              value={recipe.cookTime} 
            />
          </View>

          {recipe.description && (
            <View style={styles.descriptionContainer}>
              <View style={styles.sectionHeader}>
                <Edit3Icon width={20} height={20} color={Colors.primary.DEFAULT} />
                <Text style={styles.sectionTitle}>Descripción</Text>
              </View>
              <Text style={styles.descriptionText}>{recipe.description}</Text>
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ClipboardListIcon width={24} height={24} color={Colors.primary.DEFAULT} />
              <Text style={styles.sectionTitle}>Ingredientes Necesarios</Text>
            </View>
            <View style={styles.ingredientsList}>
              {recipe.ingredients.map((ing, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.ingredientText}>
                    <Text style={styles.ingredientQuantity}>{ing.quantity} {ing.unit}</Text> de {ing.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
            <View style={styles.dietaryTagsContainer}>
              <View style={styles.sectionHeader}>
                <LeafIcon width={20} height={20} color={Colors.primary.DEFAULT} />
                <Text style={styles.sectionTitle}>Etiquetas Dietéticas</Text>
              </View>
              <View style={styles.tagsContainer}>
                {recipe.dietaryTags.map(tag => (
                  <View key={tag} style={styles.dietaryTag}>
                    <Text style={styles.dietaryTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <UtensilsIcon width={24} height={24} color={Colors.primary.DEFAULT} />
              <Text style={styles.sectionTitle}>Pasos de Preparación</Text>
            </View>
            <View style={styles.instructionsList}>
              {recipe.instructions.map((step, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>

          {recipe.estimatedNutrition && Object.values(recipe.estimatedNutrition).some(val => val) && (
            <View style={styles.nutritionContainer}>
              <View style={styles.sectionHeader}>
                <SparklesIcon width={20} height={20} color={Colors.accent.DEFAULT} />
                <Text style={styles.sectionTitle}>Nutrición Estimada (por porción)</Text>
              </View>
              <View style={styles.nutritionGrid}>
                {recipe.estimatedNutrition.calories && (
                  <Text style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Calorías:</Text> {recipe.estimatedNutrition.calories}
                  </Text>
                )}
                {recipe.estimatedNutrition.protein && (
                  <Text style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Proteína:</Text> {recipe.estimatedNutrition.protein}
                  </Text>
                )}
                {recipe.estimatedNutrition.carbs && (
                  <Text style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Carbs:</Text> {recipe.estimatedNutrition.carbs}
                  </Text>
                )}
                {recipe.estimatedNutrition.fat && (
                  <Text style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Grasa:</Text> {recipe.estimatedNutrition.fat}
                  </Text>
                )}
              </View>
            </View>
          )}

          {recipe.possibleSubstitutions && recipe.possibleSubstitutions.length > 0 && (
            <View style={styles.substitutionsContainer}>
              <Text style={styles.substitutionsTitle}>Sugerencias y Sustituciones</Text>
              <View style={styles.substitutionsList}>
                {recipe.possibleSubstitutions.map((sub, index) => (
                  <Text key={index} style={styles.substitutionItem}>
                    • <Text style={styles.substitutionOriginal}>{sub.originalIngredient}:</Text> {sub.suggestion}
                  </Text>
                ))}
              </View>
            </View>
          )}
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
    backgroundColor: Colors.surface,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
        borderBottomColor: Colors.gray[200],
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.dark,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 32,
  },
  spacer: {
    width: 40,
  },
  imageContainer: {
    height: 240,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    gap: 24,
  },
  infoPillsContainer: {
    gap: 12,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoPillIcon: {
    marginRight: 8,
  },
  infoPillText: {
    fontSize: 14,
    color: Colors.onSurface.light,
    flex: 1,
  },
  infoPillLabel: {
    fontWeight: '600',
    color: Colors.onSurface.DEFAULT,
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onSurface.DEFAULT,
    marginLeft: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.onSurface.light,
    lineHeight: 20,
  },
  section: {
    gap: 12,
  },
  ingredientsList: {
    backgroundColor: Colors.gray[50],
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    gap: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  checkmark: {
    color: Colors.primary.DEFAULT,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 2,
  },
  ingredientText: {
    fontSize: 14,
    color: Colors.onSurface.light,
    flex: 1,
    lineHeight: 20,
  },
  ingredientQuantity: {
    fontWeight: '600',
    color: Colors.onSurface.DEFAULT,
  },
  dietaryTagsContainer: {
    padding: 16,
    backgroundColor: Colors.primary.light + '10',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary.light + '30',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietaryTag: {
    backgroundColor: Colors.primary.light + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary.light + '40',
  },
  dietaryTagText: {
    fontSize: 12,
    color: Colors.primary.dark,
    fontWeight: '600',
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  stepNumber: {
    backgroundColor: Colors.primary.DEFAULT,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  instructionText: {
    fontSize: 14,
    color: Colors.onSurface.light,
    flex: 1,
    lineHeight: 20,
  },
  nutritionContainer: {
    padding: 16,
    backgroundColor: Colors.accent.light + '10',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.accent.light + '30',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nutritionItem: {
    fontSize: 14,
    color: Colors.onSurface.light,
    width: '48%',
  },
  nutritionLabel: {
    fontWeight: '600',
    color: Colors.onSurface.DEFAULT,
  },
  substitutionsContainer: {
    padding: 16,
    backgroundColor: Colors.secondary.light + '10',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary.light + '30',
  },
  substitutionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary.dark,
    marginBottom: 12,
  },
  substitutionsList: {
    gap: 4,
  },
  substitutionItem: {
    fontSize: 14,
    color: Colors.secondary.dark,
    lineHeight: 18,
  },
  substitutionOriginal: {
    fontWeight: '600',
  },
});