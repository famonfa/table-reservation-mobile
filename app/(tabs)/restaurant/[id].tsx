import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  fetchRestaurantByName,
  updateRestaurant,
} from "../../../store/restaurantSlice";
import { Text } from "../../../components/ui/text";
import { Image } from "expo-image";
import { EditableField } from "../../../components/ui";
import { Ionicons } from "@expo/vector-icons";
import ImageUploadScreen from "../../../components/restaurant/image-upload";

export default function Restaurant() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { currentRestaurant, loading, updatingFields, error } = useSelector(
    (state: RootState) => state.restaurants
  );

  useEffect(() => {
    dispatch(fetchRestaurantByName(id as string));
  }, [id, dispatch]);

  const handleUpdateField = (field: string, value: string) => {
    if (currentRestaurant) {
      dispatch(updateRestaurant({ id: currentRestaurant.id, field, value }));
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF885B" />
      </View>
    );
  }

  if (error || !currentRestaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="error">Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {updatingFields.includes("bannerImg") ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FF885B" />
          </View>
        ) : currentRestaurant.bannerImg ? (
          <Image
            source={{ uri: currentRestaurant.bannerImg }}
            style={styles.image}
          />
        ) : (
          <View style={styles.image} />
        )}
        <View style={styles.uploadButtonContainer}>
          <ImageUploadScreen
            title={<Ionicons name="image" size={20} color="white" />}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text variant="title">{currentRestaurant.name}</Text>
        <EditableField
          label="Cuisine"
          value={currentRestaurant.cuisine || ""}
          onSave={(value) => handleUpdateField("cuisine", value)}
          isLoading={updatingFields.includes("cuisine")}
        />
        <EditableField
          label="Address"
          value={currentRestaurant.address}
          icon="location-outline"
          onSave={(value) => handleUpdateField("address", value)}
          isLoading={updatingFields.includes("address")}
        />
        <EditableField
          label="Phone Number"
          value={currentRestaurant.phone || ""}
          icon="call-outline"
          onSave={(value) => handleUpdateField("phone", value)}
          isLoading={updatingFields.includes("phone")}
        />
        <EditableField
          label="Description"
          value={currentRestaurant.description || ""}
          onSave={(value) => handleUpdateField("description", value)}
          isLoading={updatingFields.includes("description")}
        />
      </View>
    </ScrollView>
  );
}

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
    backgroundColor: "#F0F0F0",
  },
  infoContainer: {
    padding: 20,
  },
  editableFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  uploadButtonContainer: {
    position: "absolute",
    bottom: -30,
    right: 10,
    padding: 10,
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
  loadingOverlay: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
});
