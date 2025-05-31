import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface AvatarProps {
  size?: number;
  imageUrl?: string;
  showBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ 
  size = 50, 
  imageUrl = 'https://via.placeholder.com/150',
  showBorder = true 
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/profile');
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { width: size, height: size },
        showBorder && styles.border
      ]} 
      onPress={handlePress}
    >
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { width: size, height: size }]}
      />
      <View style={styles.editIcon}>
        <Ionicons name="camera" size={16} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    borderRadius: 50,
  },
  border: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Avatar;
