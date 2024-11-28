import React from "react";
import { Tabs } from "expo-router/tabs";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "../../store";
import { UserProvider } from "../../context/user-context";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "restaurant/[id]") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen
        name="restaurant/[id]"
        options={{
          title: "Restaurant",

          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
