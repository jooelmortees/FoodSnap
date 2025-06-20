import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = Colors.primary.DEFAULT,
  style 
}) => {
  const sizeMap = {
    small: 'small' as const,
    medium: 'large' as const,
    large: 'large' as const,
  };

  const containerSizeMap = {
    small: 20,
    medium: 40,
    large: 60,
  };

  return (
    <View style={[
      { 
        width: containerSizeMap[size], 
        height: containerSizeMap[size],
        justifyContent: 'center',
        alignItems: 'center'
      },
      style
    ]}>
      <ActivityIndicator 
        size={sizeMap[size]} 
        color={color}
      />
    </View>
  );
};