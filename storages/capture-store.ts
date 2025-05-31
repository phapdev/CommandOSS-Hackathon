import { Photo } from '@/types';
import { CameraType } from 'expo-camera';
import { create } from 'zustand';

interface CaptureState {
  photo: Photo | null;
  caption: string;
  hashtags: string[];
  facing: CameraType;
  processing: boolean;
  step: 'camera' | 'preview' | 'processing';
  
  // Actions
  setPhoto: (photo: Photo | null) => void;
  setCaption: (caption: string) => void;
  setHashtags: (hashtags: string[]) => void;
  setFacing: (facing: CameraType) => void;
  setProcessing: (processing: boolean) => void;
  setStep: (step: 'camera' | 'preview' | 'processing') => void;
  reset: () => void;
}

export const useCaptureStore = create<CaptureState>((set) => ({
  photo: null,
  caption: '',
  hashtags: [],
  facing: 'back',
  processing: false,
  step: 'camera',

  setPhoto: (photo) => set({ photo }),
  setCaption: (caption) => set({ caption }),
  setHashtags: (hashtags) => set({ hashtags }),
  setFacing: (facing) => set({ facing }),
  setProcessing: (processing) => set({ processing }),
  setStep: (step) => set({ step }),
  reset: () => set({
    photo: null,
    caption: '',
    hashtags: [],
    facing: 'back',
    processing: false,
    step: 'camera',
  }),
}));
