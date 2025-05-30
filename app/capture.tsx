import { CameraType, CameraView } from "expo-camera";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Camera,
  Check,
  Cloud,
  MapPin,
  MessageCircle,
  RotateCcw,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CaptureButton } from "@/components/CaptureButton";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Map } from "@/components/Map";
import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import { usePhotoCapture } from "@/hooks/usePhotoCapture";
import { usePhotos } from "@/hooks/usePhotos";
import { Photo } from "@/types";
import { generateHashtags } from "@/utils/ai";

export default function CaptureScreen() {
  const router = useRouter();
  const {
    capturePhoto,
    processPhoto,
    loading: captureLoading,
  } = usePhotoCapture();
  const { addPhoto } = usePhotos();

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [facing, setFacing] = useState<CameraType>("back");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"camera" | "preview" | "processing">(
    "camera"
  );

  const handleCapture = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const capturedPhoto = await capturePhoto();

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
    setFacing((current) => (current === "back" ? "front" : "back"));
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
  };

  const handleCancel = () => {
    if (step === "preview") {
      setPhoto(null);
      setCaption("");
      setHashtags([]);
      setStep("camera");
    } else {
      router.back();
    }
  };

  const handleSave = async () => {
    if (!photo) return;

    try {
      setProcessing(true);
      setStep("processing");

      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      // Update photo with caption
      const updatedPhoto: Photo = {
        ...photo,
        caption,
      };

      // Process photo (upload to IPFS and store on blockchain)
      const processedPhoto = await processPhoto(updatedPhoto);

      // Save to local storage
      await addPhoto(processedPhoto);

      // Navigate back to home
      router.replace("/");
    } catch (error) {
      console.error("Error saving photo:", error);
    }
  };

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraHeader}>
        <Camera size={24} color="#FFFFFF" />
        <Text style={styles.cameraHeaderText}>Walrus</Text>
        <View style={styles.cameraHeaderRight}>
          <MessageCircle size={24} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.flipButton} onPress={handleFlipCamera}>
          <RotateCcw size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <CameraView style={styles.camera} facing={facing}></CameraView>

      <View style={styles.captureButtonContainer}>
        <CaptureButton onPress={handleCapture} />
      </View>
    </View>
  );

  const renderPreview = () => {
    if (!photo) return null;

    return (
      <ScrollView
        style={styles.previewContainer}
        contentContainerStyle={styles.previewContent}
      >
        <View style={styles.previewHeader}>
          <TouchableOpacity
            style={styles.previewCloseButton}
            onPress={handleCancel}
          >
            <X size={24} color={Colors.light.text} />
          </TouchableOpacity>
          <Text style={styles.previewTitle}>Preview</Text>
          <View style={{ width: 24 }} />
        </View>

        <Image
          source={{ uri: photo.uri }}
          style={styles.previewImage}
          contentFit="cover"
        />

        <View style={styles.captionContainer}>
          <TextInput
            style={styles.captionInput}
            value={caption}
            onChangeText={setCaption}
            placeholder="Add a caption..."
            multiline
            maxLength={150}
          />

          <View style={styles.hashtagsContainer}>
            {hashtags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={styles.hashtagBadge}
                onPress={() => setCaption((prev) => `${prev} ${tag}`)}
              >
                <Text style={styles.hashtagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.metadataContainer}>
          <Text style={styles.metadataTitle}>Photo Metadata</Text>

          <View style={styles.metadataItem}>
            <View style={styles.metadataIcon}>
              <MapPin size={16} color={Colors.light.primary} />
            </View>
            <View>
              <Text style={styles.metadataLabel}>Location</Text>
              {photo.location ? (
                <Text style={styles.metadataValue}>
                  {photo.location.address ||
                    `${photo.location.latitude.toFixed(
                      6
                    )}, ${photo.location.longitude.toFixed(6)}`}
                </Text>
              ) : (
                <Text style={styles.metadataValueMuted}>No location data</Text>
              )}
            </View>
          </View>

          {photo.location && (
            <Map
              latitude={photo.location.latitude}
              longitude={photo.location.longitude}
              height={120}
            />
          )}

          <View style={styles.metadataItem}>
            <View style={styles.metadataIcon}>
              <Cloud size={16} color={Colors.light.primary} />
            </View>
            <View>
              <Text style={styles.metadataLabel}>Weather</Text>
              {photo.weather ? (
                <Text style={styles.metadataValue}>
                  {photo.weather.condition}
                  {photo.weather.temperature !== undefined &&
                    `, ${photo.weather.temperature}°C`}
                </Text>
              ) : (
                <Text style={styles.metadataValueMuted}>No weather data</Text>
              )}
            </View>
          </View>
        </View>

        <Button
          title="Save to Blockchain"
          onPress={handleSave}
          style={styles.saveButton}
          icon={<Check size={18} color="#FFFFFF" />}
        />
      </ScrollView>
    );
  };

  const renderProcessing = () => (
    <View style={styles.processingContainer}>
      <LoadingIndicator
        fullScreen
        message="Processing your photo and storing it on the walrus..."
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" />

      {step === "camera" && renderCamera()}
      {step === "preview" && renderPreview()}
      {step === "processing" && renderProcessing()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  cameraContainer: {
    flex: 1,
  },
  //= Camera Header =//
  cameraHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cameraHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cameraHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  // == End Camera Header == //

  //= Camera Controls =//
  camera: {
    flex: 0.55,
    borderRadius: 45,
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  previewContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  previewContent: {
    padding: 16,
    paddingBottom: 40,
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  previewCloseButton: {
    padding: 8,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  captionContainer: {
    marginTop: 16,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.light.text,
    minHeight: 80,
    textAlignVertical: "top",
  },
  hashtagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 8,
  },
  hashtagBadge: {
    backgroundColor: Colors.light.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  hashtagText: {
    color: Colors.light.primaryDark,
    fontSize: 14,
    fontWeight: "500",
  },
  metadataContainer: {
    marginTop: 24,
  },
  metadataTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 12,
  },
  metadataItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  metadataIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  metadataLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  metadataValue: {
    fontSize: 14,
    color: Colors.light.textLight,
  },
  metadataValueMuted: {
    fontSize: 14,
    color: Colors.light.placeholder,
    fontStyle: "italic",
  },
  saveButton: {
    marginTop: 24,
  },
  processingContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
