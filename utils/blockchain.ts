import { Photo } from '@/types';

// Mock blockchain integration for the hackathon
// In a real implementation, this would connect to the SUI blockchain

export const generateHash = (data: string): string => {
  // Simple hash function for demo purposes
  // In production, use a proper cryptographic hash function
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
};

export const storeOnBlockchain = async (photo: Photo): Promise<string> => {
  // Mock blockchain storage
  // In a real implementation, this would interact with SUI blockchain
  
  try {
    // Create metadata string from photo data
    const metadata = JSON.stringify({
      timestamp: photo.timestamp,
      location: photo.location,
      weather: photo.weather,
      caption: photo.caption,
    });
    
    // Generate hash of metadata
    const hash = generateHash(metadata);
    
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock transaction hash
    return `0x${hash}${Date.now().toString(16)}`;
  } catch (error) {
    console.error('Error storing on blockchain:', error);
    throw error;
  }
};

export const verifyOnBlockchain = async (transactionHash: string): Promise<boolean> => {
  // Mock verification
  // In a real implementation, this would verify the transaction on SUI blockchain
  
  // Simulate verification delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Always return true for demo purposes
  return true;
};