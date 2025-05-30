import { Photo } from '@/types';
import { getPhotos, savePhoto } from '@/utils/storage';
import { useEffect, useState } from 'react';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const data = await getPhotos();
      setPhotos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load photos');
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const addPhoto = async (photo: Photo) => {
    try {
      await savePhoto(photo);
      setPhotos(prev => [photo, ...prev]);
      return true;
    } catch (err) {
      setError('Failed to save photo');
      console.error('Error adding photo:', err);
      return false;
    }
  };
  
  useEffect(() => {
    fetchPhotos();
  }, []);
  
  return {
    photos,
    loading,
    error,
    fetchPhotos,
    addPhoto,
  };
};