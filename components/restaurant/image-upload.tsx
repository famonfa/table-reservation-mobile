import React, { useState } from "react";
import { Image, View, Text } from "react-native";
import { Button } from "../ui";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useDispatch, useSelector } from "react-redux";
import { uploadRestaurantBanner } from "../../store/restaurantSlice";
import { AppDispatch, RootState } from "../../store";

export default function ImageUploadScreen({
  title,
}: {
  title: string | React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentRestaurant, updatingFields, error } = useSelector(
    (state: RootState) => state.restaurants
  );
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    setImage(null);

    if (!result.canceled) {
      const compressedImage = await compressImage(result.assets[0].uri);
      setImage(compressedImage.uri);
      uploadImage(compressedImage.base64);
    }
  };

  const compressImage = async (uri: string) => {
    const result = await manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }], // Resize to a maximum width of 1000px
      { compress: 0.4, format: SaveFormat.JPEG, base64: true }
    );
    return result;
  };

  const uploadImage = async (base64Image: string | undefined) => {
    if (currentRestaurant && base64Image) {
      dispatch(
        uploadRestaurantBanner({
          restaurantId: currentRestaurant.id,
          base64Image,
        })
      );
    }
  };

  return <Button title={title} onPress={pickImage} />;
}
