import { Image } from "expo-image";
import { Check, Cloud, MapPin, X } from "lucide-react-native";
import React from "react";
import {
  Platform, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Colors } from "@/constants/Colors";
import { Photo } from "@/types";
import { Button } from "../ui/Button";
import { Map } from "./Map";

interface PreviewViewProps {
  photo: Photo;
  caption: string;
  hashtags: string[];
  onCaptionChange: (text: string) => void;
  onCancel: () => void;
  onSave: () => void;
  onAddHashtag: (tag: string) => void;
}

export function PreviewView({
  photo,
  caption,
  hashtags,
  onCaptionChange,
  onCancel,
  onSave,
  onAddHashtag,
}: PreviewViewProps) {
  return (
    <ScrollView
      style={styles.previewContainer}
      contentContainerStyle={styles.previewContent}
    >
      <View style={styles.previewHeader}>
        <TouchableOpacity
          style={styles.previewCloseButton}
          onPress={onCancel}
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
          onChangeText={onCaptionChange}
          placeholder="Add a caption..."
          multiline
          maxLength={150}
        />

        <View style={styles.hashtagsContainer}>
          {hashtags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={styles.hashtagBadge}
              onPress={() => onAddHashtag(tag)}
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
        title="Save & Post"
        onPress={onSave}
        style={styles.saveButton}
        icon={<Check size={18} color="#FFFFFF" />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  previewContent: {
    padding: 20,
    paddingBottom: 40,
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  previewCloseButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: Colors.light.primaryLight,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.light.text,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  previewImage: {
    width: "100%",
    height: 330,
    borderRadius: 36,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  captionContainer: {
    marginTop: 24,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: Colors.light.text,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hashtagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    gap: 8,
  },
  hashtagBadge: {
    backgroundColor: Colors.light.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hashtagText: {
    color: Colors.light.primaryDark,
    fontSize: 14,
    fontWeight: "600",
  },
  metadataContainer: {
    marginTop: 32,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metadataTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  metadataItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  metadataIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  metadataLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  metadataValue: {
    fontSize: 15,
    color: Colors.light.textLight,
  },
  metadataValueMuted: {
    fontSize: 15,
    color: Colors.light.placeholder,
    fontStyle: "italic",
  },
  saveButton: {
    marginTop: 32,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
}); 