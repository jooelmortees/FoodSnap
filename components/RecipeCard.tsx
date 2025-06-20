import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Recipe } from '../types';
import { ClockIcon, UsersIcon, LeafIcon, EyeIcon } from './icons/Icons';
import { Colors } from '../constants/Colors';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80';

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  const imageUrl = 
    recipe.imageUrl && (recipe.imageUrl.startsWith('data:image/') || recipe.imageUrl.startsWith('http'))
      ? recipe.imageUrl
      : recipe.imageQuery
        ? `https://source.unsplash.com/400x300/?${encodeURIComponent(recipe.imageQuery)},food`
        : FALLBACK_IMAGE_URL;

  return (
    <TouchableOpacity style={styles.container} onPress={onSelect} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }}
          style={styles.image}
          defaultSource={{ uri: FALLBACK_IMAGE_URL }}
        />
        <View style={styles.imageOverlay} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
                </Text>
        
        <Text style={styles.description} numberOfLines={3}>
          {recipe.description}
        </Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <ClockIcon width={16} height={16} color={Colors.secondary.DEFAULT} />
            <Text style={styles.infoText}>
              Prep: {recipe.prepTime} | Cocción: {recipe.cookTime}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <UsersIcon width={16} height={16} color={Colors.secondary.DEFAULT} />
            <Text style={styles.infoText}>Porciones: {recipe.servings}</Text>
          </View>
        </View>

        {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
          <View style={styles.tagsContainer}>
            {recipe.dietaryTags.slice(0, 3).map(tag => (
              <View key={tag} style={styles.tag}>
                <LeafIcon width={12} height={12} color={Colors.primary.DEFAULT} />
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
            {recipe.dietaryTags.length > 3 && (
              <View style={[styles.tag, styles.moreTag]}>
                <Text style={styles.moreTagText}>+{recipe.dietaryTags.length - 3} más</Text>
              </View>
            )}
          </View>
        )}
        
        <TouchableOpacity style={styles.viewButton} onPress={onSelect}>
          <EyeIcon width={16} height={16} color="#FFFFFF" />
          <Text style={styles.viewButtonText}>Ver Receta</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 192,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.dark,
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: Colors.onSurface.light,
    lineHeight: 20,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: Colors.gray[600],
    marginLeft: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.light + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary.light + '40',
  },
  tagText: {
    fontSize: 12,
    color: Colors.primary.dark,
    marginLeft: 4,
    fontWeight: '500',
  },
  moreTag: {
    backgroundColor: Colors.gray[100],
    borderColor: Colors.gray[200],
  },
  moreTagText: {
    fontSize: 12,
    color: Colors.gray[600],
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: Colors.primary.DEFAULT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});