import { error } from "console";
import React from "react";
import { Text as RNText, TextStyle, StyleSheet, StyleProp } from "react-native";

interface TextProps {
  variant?: "title" | "subtitle" | "body" | "description" | "mini" | "error";
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  color?: string;
}

export const Text: React.FC<TextProps> = ({
  variant = "body",
  style,
  children,
  color,
}) => {
  const textStyle = [
    styles.base,
    styles[variant],
    color ? { color } : {},
    style,
  ];

  return <RNText style={textStyle}>{children}</RNText>;
};

const styles = StyleSheet.create({
  base: {
    fontFamily: "System", // Replace with your app's font family if applicable
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#CA3300", // primary.900
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    fontStyle: "italic",
  },
  mini: {
    fontSize: 12,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize: 12,
  },
});
