import { GoogleGenerativeAI } from '@google/generative-ai';
import { Ingredient, Recipe, UserPreferences } from '../types';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Gemini API key no encontrada. Asegúrate de configurar EXPO_PUBLIC_GEMINI_API_KEY en tu .env.local');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const identifyIngredientsFromImage = async (imageBase64: string): Promise<Ingredient[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    Analiza esta imagen de ingredientes de cocina y extrae una lista de ingredientes visibles.
    
    Para cada ingrediente identificado, proporciona:
    - name: nombre del ingrediente en español
    - quantity: cantidad estimada (ej: "2", "100g", "1 taza")
    - state: estado del ingrediente (ej: "fresco", "cocido", "empaquetado") - opcional
    
    Responde ÚNICAMENTE con un array JSON válido en este formato:
    [
      {
        "name": "tomates",
        "quantity": "3",
        "state": "fresco"
      }
    ]
    
    Si no puedes identificar ingredientes claramente, responde con un array vacío: []
    `;

    const imagePart = {
      inlineData: {
        data: imageBase64.split(',')[1], // Remove data:image/jpeg;base64, prefix
        mimeType: "image/jpeg"
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsedIngredients = JSON.parse(text.trim());
      return parsedIngredients.map((ing: any, index: number) => ({
        ...ing,
        id: `ai-${Date.now()}-${index}`
      }));
    } catch (parseError) {
      console.error('Error parsing JSON response:', text);
      return [];
    }
  } catch (error) {
    console.error('Error identifying ingredients:', error);
    throw new Error('Error al identificar ingredientes. Inténtalo de nuevo.');
  }
};

export const suggestRecipes = async (ingredients: Ingredient[], preferences: UserPreferences): Promise<Recipe[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const ingredientsList = ingredients.map(ing => `${ing.name} (${ing.quantity})`).join(', ');
    
    const timeMap = {
      'quick': 'menos de 30 minutos',
      'normal': '30-60 minutos',
      'advanced': 'sin límite de tiempo'
    };
    
    const goalMap = {
      'light': 'comida ligera y saludable',
      'hearty': 'comida contundente y satisfactoria',
      'use_leftovers': 'aprovechar sobras y evitar desperdicios'
    };

    const prompt = `
    Basándote en estos ingredientes: ${ingredientsList}
    
    Preferencias del usuario:
    - Tiempo disponible: ${timeMap[preferences.timeAvailable]}
    - Objetivo: ${goalMap[preferences.dietaryGoal]}
    - Dietas específicas: ${preferences.specificDiets.join(', ') || 'ninguna'}
    - Porciones deseadas: ${preferences.desiredServings || 4}
    
    Genera 3-4 recetas creativas que usen principalmente estos ingredientes.
    
    Responde ÚNICAMENTE con un array JSON válido en este formato exacto:
    [
      {
        "title": "Nombre de la receta",
        "description": "Descripción breve y apetitosa",
        "prepTime": "15 min",
        "cookTime": "20 min",
        "servings": 4,
        "ingredients": [
          {
            "name": "ingrediente",
            "quantity": "cantidad",
            "unit": "unidad"
          }
        ],
        "instructions": [
          "Paso 1 detallado",
          "Paso 2 detallado"
        ],
        "dietaryTags": ["vegetariana", "sin gluten"],
        "estimatedNutrition": {
          "calories": "350 kcal",
          "protein": "15g",
          "carbs": "45g",
          "fat": "12g"
        },
        "imageQuery": "descripción para buscar imagen de la receta"
      }
    ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsedRecipes = JSON.parse(text.trim());
      return parsedRecipes.map((recipe: any, index: number) => ({
        ...recipe,
        id: `recipe-${Date.now()}-${index}`
      }));
    } catch (parseError) {
      console.error('Error parsing recipes JSON:', text);
      return [];
    }
  } catch (error) {
    console.error('Error suggesting recipes:', error);
    throw new Error('Error al generar recetas. Inténtalo de nuevo.');
  }
};