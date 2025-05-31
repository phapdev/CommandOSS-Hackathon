import React from "react";
import { StyleSheet, View } from "react-native";

import { LoadingIndicator } from "../LoadingIndicator";

export function ProcessingView() {
  return (
    <View style={styles.processingContainer}>
      <LoadingIndicator
        fullScreen
        message="Processing your photo and storing it on the walrus..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  processingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
}); 