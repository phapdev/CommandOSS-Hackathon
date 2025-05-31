import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  initialRouteName: "onboarding",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.light.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="capture"
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
