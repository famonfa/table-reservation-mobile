import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text } from "../ui/text";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addRestaurant } from "../../store/restaurantSlice";
import { useUser } from "../../context/user-context";
import { Button, Input, Modal, palette } from "../ui";

interface AddRestaurantModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { user } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const [newRestaurantName, setNewRestaurantName] = useState("");
  const [newRestaurantAddress, setNewRestaurantAddress] = useState("");

  if (!user) {
    return null;
  }

  const handleAddRestaurant = () => {
    if (newRestaurantName && newRestaurantAddress) {
      dispatch(
        addRestaurant({
          name: newRestaurantName,
          address: newRestaurantAddress,
          managerId: user.id,
        })
      )
        .unwrap()
        .then(() => {
          onClose();
          setNewRestaurantName("");
          setNewRestaurantAddress("");
        })
        .catch((error) => {
          Alert.alert("Error", `Failed to add restaurant: ${error}`);
        });
    } else {
      Alert.alert("Error", "Please fill in both name and address");
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Text variant="subtitle">Add New Restaurant</Text>
      <Input
        value={newRestaurantName}
        onChangeText={setNewRestaurantName}
        placeholder="Restaurant Name"
      />
      <Input
        value={newRestaurantAddress}
        onChangeText={setNewRestaurantAddress}
        placeholder="Restaurant Address"
      />
      <Button title="Add Restaurant" onPress={handleAddRestaurant} />
      <Button
        title="Cancel"
        variant="secondary"
        onPress={onClose}
        style={styles.cancelButton}
        textStyle={styles.cancelButtonText}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: palette.primary,
  },
});
