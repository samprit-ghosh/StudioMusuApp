// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Ionicons } from "@expo/vector-icons";
import Chatbot from "@/components/ui/Chatbot"; // ✅ Import chatbot

// IconSymbol wrapper
const IconSymbol = ({ name, size = 24, color = "black" }) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "red", // 🔥 Active icon
          tabBarInactiveTintColor: "white", // 🤍 Inactive icon
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              backgroundColor: "#000", // black background
            },
            default: {
              backgroundColor: "#000",
            },
          }),
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="home" size={28} color={color} />
            ),
          }}
        />

        {/* Services Tab */}
        <Tabs.Screen
          name="service"
          options={{
            title: "Services",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="camera" size={28} color={color} />
            ),
          }}
        />

        {/* Bookings Tab */}
        <Tabs.Screen
          name="bookings"
          options={{
            title: "Bookings",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="calendar" size={28} color={color} />
            ),
          }}
        />

        {/* Contact Tab */}
        <Tabs.Screen
          name="contact"
          options={{
            title: "Contact",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="mail" size={28} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* ✅ Global Chatbot (visible across all tabs) */}
      <Chatbot />
    </View>
  );
}
