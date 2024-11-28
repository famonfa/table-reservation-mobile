import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { palette } from "./palette";

interface ButtonProps {
  onPress: () => void;
  title: string | React.ReactNode;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      onPress={onPress}
    >
      {typeof title === "string" ? (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  primary: {
    backgroundColor: palette.primary,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: palette.primary,
  },
  text: {
    color: palette.background,
    fontWeight: "bold",
  },
});
