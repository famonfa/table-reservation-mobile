import React from "react";
import { Tabs } from "expo-router/tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { palette } from "../../components/ui";
import { View, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "restaurant/[id]") {
              iconName = focused ? "restaurant" : "restaurant-outline";
            } else if (route.name === "settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else {
              iconName = focused ? "book" : "book-outline";
            }
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
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
          name="reservations"
          options={{
            title: "Reservations",
            headerStyle: {
              marginTop: 50,
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 40,
  },
});
