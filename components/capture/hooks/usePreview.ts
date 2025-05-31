import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

import { usePhotoCapture } from "@/hooks/usePhotoCapture";
import { usePhotos } from "@/hooks/usePhotos";
import { useCaptureStore } from "@/storages/capture-store";

export function usePreview() {
  const router = useRouter();
  const { processPhoto } = usePhotoCapture();
  const { addPhoto } = usePhotos();

  const {
    photo,
    caption,
    hashtags,
    setCaption,
    setProcessing,
    setStep,
    reset,
  } = useCaptureStore();

  const handleCaptionChange = (text: string) => {
    setCaption(text);
  };

  const handleAddHashtag = (tag: string) => {
    setCaption(`${caption} ${tag}`);
  };

  const handleCancel = () => {
    reset();
  };

  const handleSave = async () => {
    if (!photo) return;

    try {
      setProcessing(true);
      setStep("processing");

      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      console.log('~caption: ', caption);
      console.log('~hashtags: ', hashtags);
      console.log('~photo: ', photo);

      // Update photo with caption
      const updatedPhoto = {
        ...photo,
        caption,
      };

      console.log('~updatedPhoto: ', updatedPhoto);

      // Process photo (upload to IPFS and store on blockchain)
      const processedPhoto = await processPhoto(updatedPhoto);

      // Save to local storage
      // await addPhoto(processedPhoto);

      // Navigate back to home
      // router.replace("/");
    } catch (error) {
      console.error("Error saving photo:", error);
    } finally {
      setProcessing(false);
      setStep("camera");
    }
  };

  return {
    photo,
    caption,
    hashtags,
    handleCaptionChange,
    handleAddHashtag,
    handleCancel,
    handleSave,
  };
} 