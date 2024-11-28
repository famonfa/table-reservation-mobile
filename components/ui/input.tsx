import React from "react";
import {
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  Text,
} from "react-native";
import { palette } from "./palette";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  label?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  label,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.secondary}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: palette.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.border,
    fontSize: 16,
    color: palette.text,
  },
});
