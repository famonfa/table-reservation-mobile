import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Text } from "./text";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "./button";

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
  icon?: string;
  isLoading?: boolean;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  icon,
  onSave,
  isLoading = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <View style={styles.editableFieldContainer}>
        {icon && <Ionicons name={icon as any} size={20} color="#FF6D37" />}
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon : null]}
          value={currentValue}
          onChangeText={setCurrentValue}
          placeholder={`Enter ${label}`}
          onBlur={handleSave}
        />
        <Button
          title={<Ionicons name="checkmark" size={20} color="white" />}
          onPress={handleSave}
        ></Button>
        <Button
          title={<Ionicons name="close" size={20} color="#FF6D37" />}
          variant="secondary"
          onPress={() => setIsEditing(false)}
        ></Button>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => setIsEditing(true)}
      style={styles.editableFieldContainer}
    >
      {icon && <Ionicons name={icon as any} size={20} color="#FF6D37" />}
      <Text
        variant="body"
        style={[styles.fieldText, icon ? styles.inputWithIcon : null]}
      >
        {value || `Add ${label}`}
      </Text>
      {isLoading && <ActivityIndicator size="small" color="#FF6D37" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 20,
  },
  editableFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 5,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#FF6D37",
    paddingVertical: 5,
  },
  inputWithIcon: {
    marginLeft: 10,
  },
  fieldText: {
    flex: 1,
  },
  fieldTextWithIcon: {
    marginLeft: 10,
  },
});
