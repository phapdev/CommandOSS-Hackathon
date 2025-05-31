import { Photo } from '@/types/index';
import { generateCaption } from '@/utils/ai';
import { storeOnBlockchain } from '@/utils/blockchain';
import { uploadToIPFS } from '@/utils/ipfs';
import { getAddressFromCoordinates, getCurrentLocation, getWeather } from '@/utils/location';
import { Camera, CameraCapturedPicture, CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';

export const usePhotoCapture = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const capturePhoto = async (cameraRef: React.RefObject<CameraView | null>): Promise<Photo | null> => {
    if(loading) return null;
    try {
      setLoading(true);
      setError(null);
      
      if (!cameraRef.current) {
        setError('Camera not initialized');
        return null;
      }

      // Request camera permission
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setError('Camera permission is required');
        return null;
      }

      // Create a temporary file path
      const photoPath = `${FileSystem.cacheDirectory}photo_${Date.now()}.jpg`;
      
      console.log('capturePhoto');
      // Capture image using expo-camera
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
        exif: true,
        base64: false,
      }) as CameraCapturedPicture;
      
      if (!photo.uri) {
        return null;
      }
      
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
      const suggestedCaption = await generateCaption(photo.uri);
      
      // Create photo object
      const photoObj: Photo = {
        id: Date.now().toString(),
        uri: photo.uri,
        caption: suggestedCaption,
        timestamp: Date.now(),
        location,
        weather,
        verified: false,
      };
      
      return photoObj;
      
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