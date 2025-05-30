import { Photo } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PHOTOS_STORAGE_KEY = 'snapproof_photos';

export const savePhoto = async (photo: Photo): Promise<void> => {
  try {
    const existingPhotosJson = await AsyncStorage.getItem(PHOTOS_STORAGE_KEY);
    const existingPhotos: Photo[] = existingPhotosJson ? JSON.parse(existingPhotosJson) : [];
    
    const updatedPhotos = [photo, ...existingPhotos];
    await AsyncStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(updatedPhotos));
  } catch (error) {
    console.error('Error saving photo:', error);
    throw error;
  }
};

export const getPhotos = async (): Promise<Photo[]> => {
  try {
    const photosJson = await AsyncStorage.getItem(PHOTOS_STORAGE_KEY);
    return photosJson ? JSON.parse(photosJson) : [];
  } catch (error) {
    console.error('Error getting photos:', error);
    return [];
  }
};

export const getPhotoById = async (id: string): Promise<Photo | null> => {
  try {
    const photos = await getPhotos();
    return photos.find(photo => photo.id === id) || null;
  } catch (error) {
    console.error('Error getting photo by id:', error);
    return null;
  }
};