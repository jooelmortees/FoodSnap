import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/Colors';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'small' | 'medium' | 'large' | 'icon';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  loading = false,
}) => {
  const baseStyle: ViewStyle = {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: disabled ? 0.6 : 1,
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: {
      backgroundColor: Colors.primary.DEFAULT,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    secondary: {
      backgroundColor: Colors.secondary.DEFAULT,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    danger: {
      backgroundColor: Colors.error.DEFAULT,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: disabled ? Colors.gray[300] : Colors.primary.DEFAULT,
    },
  };

  const sizeStyles: Record<string, ViewStyle> = {
    small: {
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    medium: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    large: {
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    icon: {
      padding: 10,
    },
  };

  const textColorStyles: Record<string, TextStyle> = {
    primary: { color: '#FFFFFF' },
    secondary: { color: '#FFFFFF' },
    danger: { color: '#FFFFFF' },
    ghost: { color: Colors.primary.DEFAULT },
    outline: { color: disabled ? Colors.gray[400] : Colors.primary.DEFAULT },
  };

  const textSizeStyles: Record<string, TextStyle> = {
    small: { fontSize: 12 },
    medium: { fontSize: 14 },
    large: { fontSize: 16 },
    icon: { fontSize: 14 },
  };

  const isTextChild = typeof children === 'string';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'ghost' || variant === 'outline' ? Colors.primary.DEFAULT : '#FFFFFF'}
          size="small"
        />
      ) : (
        typeof children === 'string' || typeof children === 'number' ? (
          <Text style={[
            { fontWeight: '500' },
            textColorStyles[variant],
            textSizeStyles[size],
            textStyle,
          ]}>
            {children}
          </Text>
        ) : (
          children
        )
      )}
    </TouchableOpacity>
  );
};