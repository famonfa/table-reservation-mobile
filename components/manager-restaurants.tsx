import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Text } from "./ui/text";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchRestaurants } from "../store/restaurantSlice";
import { AddRestaurantModal } from "./restaurant/add-restaurant";
import { useUser } from "../context/user-context";
import { useRouter } from "expo-router";

export const ManagerRestaurants = () => {
  const { user, loadingUser } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants, loading, error } = useSelector(
    (state: RootState) => state.restaurants
  );
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  if (loadingUser || !user) {
    return null;
  }

  useEffect(() => {
    dispatch(fetchRestaurants(user.id));
  }, [dispatch]);

  const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurant/${item.name}`)}
      style={styles.restaurantItem}
    >
      <Text variant="subtitle">{item.name}</Text>
      <Text variant="mini">{item.address}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF885B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="error">{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchRestaurants(user.id))}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {restaurants.length === 0 ? (
        <Text variant="body">No restaurants found.</Text>
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={renderRestaurantItem}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="pluscircleo" size={64} color="#FF885B" />
      </TouchableOpacity>

      <AddRestaurantModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurantItem: {
    backgroundColor: "#FFCFB7", // primary.200
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5213", // primary.700
    marginBottom: 5,
  },
  retryButton: {
    backgroundColor: "#FF885B", // primary.500
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 84,
    height: 84,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
