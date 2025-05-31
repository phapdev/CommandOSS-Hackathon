import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CameraViewComponent } from "@/components/capture/CameraView";
import { useCapture } from "@/components/capture/hooks/useCapture";
import { PreviewView } from "@/components/capture/PreviewView";
import { ProcessingView } from "@/components/capture/ProcessingView";

export default function CaptureScreen() {
  const {
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
  } = useCapture();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" />

      {step === "camera" && (
        <CameraViewComponent
          cameraRef={cameraRef}
          facing={facing}
          captureLoading={captureLoading}
          onCapture={handleCapture}
          onFlipCamera={handleFlipCamera}
          onCancel={handleNavigationCancel}
        />
      )}

      {step === "preview" && photo && (
        <PreviewView
          photo={photo}
          caption={caption}
          hashtags={hashtags}
          onCaptionChange={handleCaptionChange}
          onCancel={handlePreviewCancel}
          onSave={handleSave}
          onAddHashtag={handleAddHashtag}
        />
      )}

      {step === "processing" && <ProcessingView />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
