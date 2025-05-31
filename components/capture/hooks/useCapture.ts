import { useCaptureStore } from "@/storages/capture-store";
import { useCamera } from "./useCamera";
import { useNavigation } from "./useNavigation";
import { usePreview } from "./usePreview";

export function useCapture() {
  const { step } = useCaptureStore();
  
  const {
    cameraRef,
    facing,
    captureLoading,
    handleCapture,
    handleFlipCamera,
  } = useCamera();

  const {
    photo,
    caption,
    hashtags,
    handleCaptionChange,
    handleAddHashtag,
    handleCancel: handlePreviewCancel,
    handleSave,
  } = usePreview();

  const { handleCancel: handleNavigationCancel } = useNavigation();

  return {
    // State
    step,
    cameraRef,
    facing,
    captureLoading,
    photo,
    caption,
    hashtags,

    // Camera handlers
    handleCapture,
    handleFlipCamera,

    // Preview handlers
    handleCaptionChange,
    handleAddHashtag,
    handlePreviewCancel,
    handleSave,

    // Navigation handlers
    handleNavigationCancel,
  };
} 