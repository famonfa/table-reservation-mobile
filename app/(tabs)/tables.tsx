import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchTables, addTable, removeTable } from "../../store/tableSlice";
import { Text, Button, Modal } from "../../components/ui";
import {
  Card,
  CardBadge,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { TableForm } from "../../components/ui/table-form";
import { palette } from "../../components/ui/palette";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface Table {
  id: string;
  number: number;
  capacity: number;
  availableHours: string[];
}

export default function TablesScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const currentRestaurant = useSelector(
    (state: RootState) => state.restaurants.currentRestaurant
  );
  const { tables, loading, error } = useSelector(
    (state: RootState) => state.tables
  );

  useEffect(() => {
    if (currentRestaurant?.id) {
      dispatch(fetchTables(currentRestaurant.id));
    }
  }, [currentRestaurant?.id]);

  const handleAddTable = async (formData: {
    number: string;
    capacity: string;
    availableHours: string[];
  }) => {
    if (!currentRestaurant?.id) return;

    const tableData = {
      number: parseInt(formData.number),
      capacity: parseInt(formData.capacity),
      restaurantId: currentRestaurant.id,
      availableHours: formData.availableHours,
    };

    await dispatch(addTable(tableData));
    setIsAddModalVisible(false);
  };

  const handleRemoveTable = (tableId: string, tableNumber: number) => {
    Alert.alert(
      "Remove Table",
      `Are you sure you want to remove Table ${tableNumber}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => dispatch(removeTable(tableId)),
        },
      ]
    );
  };

  const renderTableCard = (table: Table) => (
    <Card
      key={table.id}
      badge={
        <CardBadge>
          <Text style={styles.tableNumberText}>{table.number}</Text>
        </CardBadge>
      }
    >
      <CardContent>
        <View style={styles.tableDetails}>
          <View style={styles.capacityContainer}>
            <Ionicons name="people" size={20} color={palette.primary} />
            <Text style={styles.capacityText}>{table.capacity} seats</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveTable(table.id, table.number)}
          >
            <Ionicons name="trash-outline" size={20} color={palette.error} />
          </TouchableOpacity>
        </View>
      </CardContent>
      <CardFooter>
        <Text style={styles.hoursPreviewText}>
          {table.availableHours.length} available hours
        </Text>
      </CardFooter>
    </Card>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={palette.primary} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (tables.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons
            name="restaurant-outline"
            size={48}
            color={palette.secondary}
          />
          <Text style={styles.emptyStateText}>No tables added yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Add your first table to start managing reservations
          </Text>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.tableList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tableListContent}
      >
        {tables.map(renderTableCard)}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tables Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add-circle" size={24} color={palette.primary} />
          <Text style={styles.addButtonText}>Add Table</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}

      <Modal
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      >
        <TableForm onSubmit={handleAddTable} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: palette.text,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addButtonText: {
    color: palette.primary,
    fontWeight: "500",
  },
  tableList: {
    flex: 1,
  },
  tableListContent: {
    padding: 16,
    gap: 16,
  },
  tableDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  capacityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  capacityText: {
    fontSize: 16,
    color: palette.text,
  },
  tableNumberText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
  },
  hoursPreviewText: {
    fontSize: 14,
    color: palette.secondary,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: palette.text,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: palette.secondary,
    textAlign: "center",
    marginTop: 8,
  },
  errorText: {
    color: palette.error,
    textAlign: "center",
  },
});
