import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { MapPin } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface MapProps {
  latitude: number;
  longitude: number;
  height?: number;
  interactive?: boolean;
}

export const Map: React.FC<MapProps> = ({ 
  latitude, 
  longitude, 
  height = 200,
  interactive = false
}) => {
  // For a real implementation, use react-native-maps
  // This is a simplified version for the hackathon
  
  // Generate a static map image URL
  const getStaticMapUrl = () => {
    // Using OpenStreetMap static map API
    const zoom = 15;
    const width = 600;
    const mapHeight = 300;
    const marker = `${longitude},${latitude}`;
    
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${mapHeight}&markers=color:red%7C${latitude},${longitude}&key=YOUR_API_KEY`;
  };
  
  // For web or when we can't load the map
  const FallbackMap = () => (
    <View style={[styles.fallbackContainer, { height }]}>
      <MapPin size={24} color={Colors.light.primary} />
      <Text style={styles.coordinatesText}>
        {latitude.toFixed(6)}, {longitude.toFixed(6)}
      </Text>
    </View>
  );
  
  if (Platform.OS === 'web' || !interactive) {
    return <FallbackMap />;
  }
  
  return (
    <View style={[styles.container, { height }]}>
      <Image
        source={{ uri: getStaticMapUrl() }}
        style={styles.map}
        contentFit="cover"
      />
      <View style={styles.markerContainer}>
        <MapPin size={24} color={Colors.light.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  fallbackContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  coordinatesText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.light.textLight,
  },
});