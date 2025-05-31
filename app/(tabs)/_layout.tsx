import { Colors } from '@/constants/Colors';
import { Tabs, useRouter } from "expo-router";
import { Camera, Home, Image, User } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

function TabBarIcon(props: {
  name: React.ReactNode;
  color: string;
}) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.name}
    </View>
  );
}

export default function TabLayout() {
  const router = useRouter();
  
  const handleCapture = () => {
    router.push('/capture');
  };
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.textLight,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={<Home size={24} color={color} />} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="capture-tab"
        options={{
          title: "",
          tabBarIcon: () => (
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={handleCapture}
              activeOpacity={0.8}
            >
              <Camera size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            handleCapture();
          },
        })}
      />
      
      <Tabs.Screen
        name="gallery"
        options={{
          title: "Gallery",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={<Image size={24} color={color} />} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={<User size={24} color={color} />} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  captureButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});