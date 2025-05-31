import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface LogoTextProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: any;
}

export function LogoText({ size = 'medium', color = Colors.light.text, style }: LogoTextProps) {
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, { fontSize: getFontSize(), color }]}>
        SuiSnap
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
