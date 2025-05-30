export interface Photo {
  id: string;
  uri: string;
  caption: string;
  timestamp: number;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  weather?: {
    temperature?: number;
    condition?: string;
  };
  ipfsHash?: string;
  transactionHash?: string;
  verified: boolean;
}
