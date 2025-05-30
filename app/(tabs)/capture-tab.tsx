import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// This is just a placeholder screen since we're handling the capture in a modal
export default function CaptureTabScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>Redirecting to camera...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});