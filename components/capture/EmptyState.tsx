import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../ui/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonPress?: () => void;
  imageUrl?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  buttonText,
  onButtonPress,
  imageUrl = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop",
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        contentFit="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {buttonText && onButtonPress && (
        <Button
          title={buttonText}
          onPress={onButtonPress}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.light.textLight,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    minWidth: 150,
  },
});
