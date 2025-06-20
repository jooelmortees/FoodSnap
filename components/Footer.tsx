import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        © {currentYear} FoodSnap. Todos los derechos reservados.
      </Text>
      <Text style={styles.subtext}>
        Cocina inteligentemente, desperdicia menos.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray[900],
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    color: Colors.gray[400],
    fontSize: 14,
    marginBottom: 4,
  },
  subtext: {
    color: Colors.gray[400],
    fontSize: 12,
  },
});