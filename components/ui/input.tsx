import React from "react";
import { TextInput, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { palette } from "./palette";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input, inputStyle, style as TextStyle]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    padding: 10,
    marginVertical: 10,
  },
});
