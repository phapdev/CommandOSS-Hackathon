import * as Location from 'expo-location';
import { Platform } from 'react-native';

export const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Location permission denied');
      return null;
    }
    
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    
    return location;
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};

export const getAddressFromCoordinates = async (
  latitude: number, 
  longitude: number
): Promise<string | undefined> => {
  if (Platform.OS === 'web') {
    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  }
  
  try {
    const addresses = await Location.reverseGeocodeAsync({ latitude, longitude });
    
    if (addresses && addresses.length > 0) {
      const address = addresses[0];
      return [
        address.street,
        address.city,
        address.region,
        address.country
      ].filter(Boolean).join(', ');
    }
    
    return undefined;
  } catch (error) {
    console.error('Error getting address:', error);
    return undefined;
  }
};

export const getWeather = async (
  latitude: number, 
  longitude: number
): Promise<{ temperature?: number; condition?: string } | undefined> => {
  try {
    // Mock weather API for the hackathon
    // In a real implementation, this would call a weather API
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate random weather data for demo
    const temperature = Math.round(10 + Math.random() * 25);
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return { temperature, condition };
  } catch (error) {
    console.error('Error getting weather:', error);
    return undefined;
  }
};