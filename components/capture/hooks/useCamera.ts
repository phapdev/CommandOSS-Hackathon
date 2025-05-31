import { CameraView } from "expo-camera";
import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { Platform } from "react-native";

import { usePhotoCapture } from "@/hooks/usePhotoCapture";
import { useCaptureStore } from "@/storages/capture-store";
import { generateHashtags } from "@/utils/ai";

export function useCamera() {
  const cameraRef = useRef<CameraView>(null);
  const {
    capturePhoto,
    loading: captureLoading,
  } = usePhotoCapture();

  const {
    facing,
    setPhoto,
    setCaption,
    setHashtags,
    setFacing,
    setStep,
  } = useCaptureStore();

  const handleCapture = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const capturedPhoto = await capturePhoto(cameraRef);

    if (capturedPhoto) {
      setPhoto(capturedPhoto);
      setCaption(capturedPhoto.caption);
      setStep("preview");

      // Generate hashtags based on caption
      const tags = await generateHashtags(capturedPhoto.caption);
      setHashtags(tags);
    }
  };

  const handleFlipCamera = () => {
    setFacing(facing === 'back' ? 'front' : 'back');
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
  };

  return {
    cameraRef,
    facing,
    captureLoading,
    handleCapture,
    handleFlipCamera,
  };
} 