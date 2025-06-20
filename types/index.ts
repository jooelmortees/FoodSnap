export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  state?: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  dietaryTags?: string[];
  estimatedNutrition?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
  possibleSubstitutions?: {
    originalIngredient: string;
    suggestion: string;
  }[];
  imageUrl?: string;
  imageQuery?: string;
}

export interface UserPreferences {
  timeAvailable: 'quick' | 'normal' | 'advanced';
  dietaryGoal: 'light' | 'hearty' | 'use_leftovers';
  specificDiets: string[];
  desiredServings?: number;
}

export enum AppView {
  HOME = 'home',
  INGREDIENT_EDIT = 'ingredient_edit',
  RECIPE_SUGGESTIONS = 'recipe_suggestions',
  RECIPE_DETAIL = 'recipe_detail',
}