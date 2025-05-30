import { Photo } from '@/types/index';
import { generateCaption } from '@/utils/ai';
import { storeOnBlockchain } from '@/utils/blockchain';
import { uploadToIPFS } from '@/utils/ipfs';
import { getAddressFromCoordinates, getCurrentLocation, getWeather } from '@/utils/location';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export const usePhotoCapture = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const capturePhoto = async (): Promise<Photo | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // Request camera permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setError('Camera permission is required');
        return null;
      }
      
      // Capture image
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }
      
      const imageUri = result.assets[0].uri;
      
      // Get location data
      const locationData = await getCurrentLocation();
      let location = undefined;
      let weather = undefined;
      
      if (locationData) {
        const { latitude, longitude } = locationData.coords;
        const address = await getAddressFromCoordinates(latitude, longitude);
        // Convert null to undefined for address to match the expected type
        location = { 
          latitude, 
          longitude, 
          address: address || undefined 
        };
        
        // Get weather data and ensure it's undefined instead of null
        const weatherData = await getWeather(latitude, longitude);
        weather = weatherData || undefined;
      }
      
      // Generate AI caption
      const suggestedCaption = await generateCaption(imageUri);
      
      // Create photo object
      const photo: Photo = {
        id: Date.now().toString(),
        uri: imageUri,
        caption: suggestedCaption,
        timestamp: Date.now(),
        location,
        weather,
        verified: false,
      };
      
      return photo;
      
    } catch (err) {
      console.error('Error capturing photo:', err);
      setError('Failed to capture photo');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const processPhoto = async (photo: Photo): Promise<Photo> => {
    try {
      setLoading(true);
      
      // Upload to IPFS/Walrus
      const ipfsHash = await uploadToIPFS(photo.uri, {
        caption: photo.caption,
        timestamp: photo.timestamp,
        location: photo.location,
        weather: photo.weather,
      });
      
      // Store on blockchain
      const transactionHash = await storeOnBlockchain({
        ...photo,
        ipfsHash,
      });
      
      // Return updated photo
      return {
        ...photo,
        ipfsHash,
        transactionHash,
        verified: true,
      };
      
    } catch (err) {
      console.error('Error processing photo:', err);
      setError('Failed to process photo');
      return photo;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    capturePhoto,
    processPhoto,
    loading,
    error,
  };
};