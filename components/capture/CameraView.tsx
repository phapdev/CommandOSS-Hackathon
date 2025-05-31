import { CameraView } from "expo-camera";
import { Camera, MessageCircle, RotateCcw, X } from "lucide-react-native";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LoadingIndicator } from "../LoadingIndicator";
import { CaptureButton } from "./CaptureButton";

interface CameraViewProps {
  cameraRef: React.RefObject<CameraView | null>;
  facing: 'front' | 'back';
  captureLoading: boolean;
  onCapture: () => void;
  onFlipCamera: () => void;
  onCancel: () => void;
}

export function CameraViewComponent({
  cameraRef,
  facing,
  captureLoading,
  onCapture,
  onFlipCamera,
  onCancel,
}: CameraViewProps) {
  return (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraHeader}>
        <Camera size={24} color="#FFFFFF" />
        <Text style={styles.cameraHeaderText}>SuiSnap</Text>
        <View style={styles.cameraHeaderRight}>
          <MessageCircle size={24} color="#FFFFFF" />
        </View>
      </View>

      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {captureLoading && (
          <LoadingIndicator message="Capturing photo..." fullScreen={true} />
        )}
      </CameraView>

      <View style={styles.captureButtonContainer}>
        <View style={styles.cameraControls}>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <X size={35} color="#FFFFFF" />
          </TouchableOpacity>

          <CaptureButton onPress={onCapture} />

          <TouchableOpacity
            style={styles.flipButton}
            onPress={onFlipCamera}
          >
            <RotateCcw size={35} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  cameraHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cameraHeaderText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cameraHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  camera: {
    flex: 0.5,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 36,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  cameraControls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  flipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
}); 