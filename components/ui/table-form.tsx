import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button } from "../ui";
import { Input } from "../ui/input";
import { palette } from "../ui/palette";

const LUNCH_HOURS = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
const DINNER_HOURS = ["19:00", "20:00", "21:00", "22:00", "23:00"];
const ALL_HOURS = [...LUNCH_HOURS, ...DINNER_HOURS];

interface TableFormData {
  number: string;
  capacity: string;
  availableHours: string[];
}

interface TableFormProps {
  onSubmit: (data: TableFormData) => void;
  initialData?: TableFormData;
}

export const TableForm: React.FC<TableFormProps> = ({
  onSubmit,
  initialData = { number: "", capacity: "", availableHours: ALL_HOURS },
}) => {
  const [formData, setFormData] = useState<TableFormData>(initialData);

  const toggleHour = (hour: string) => {
    setFormData((prev) => ({
      ...prev,
      availableHours: prev.availableHours.includes(hour)
        ? prev.availableHours.filter((h) => h !== hour)
        : [...prev.availableHours, hour].sort(),
    }));
  };

  const toggleTimeSlot = (hours: string[]) => {
    setFormData((prev) => {
      const allIncluded = hours.every((hour) =>
        prev.availableHours.includes(hour)
      );
      if (allIncluded) {
        return {
          ...prev,
          availableHours: prev.availableHours.filter(
            (hour) => !hours.includes(hour)
          ),
        };
      } else {
        return {
          ...prev,
          availableHours: [
            ...new Set([...prev.availableHours, ...hours]),
          ].sort(),
        };
      }
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.content}>
      <Input
        label="Table Number"
        value={formData.number}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, number: text }))
        }
        keyboardType="numeric"
        placeholder="Enter table number"
      />
      <Input
        label="Seating Capacity"
        value={formData.capacity}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, capacity: text }))
        }
        keyboardType="numeric"
        placeholder="Enter number of seats"
      />

      <View style={styles.hoursSection}>
        <Text style={styles.hoursLabel}>Available Hours</Text>

        <View style={styles.timeSlotSection}>
          <TouchableOpacity
            style={styles.timeSlotButton}
            onPress={() => toggleTimeSlot(LUNCH_HOURS)}
          >
            <Text style={styles.timeSlotText}>Lunch Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSlotButton}
            onPress={() => toggleTimeSlot(DINNER_HOURS)}
          >
            <Text style={styles.timeSlotText}>Dinner Service</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hoursGrid}>
          {ALL_HOURS.map((hour) => (
            <TouchableOpacity
              key={hour}
              style={[
                styles.hourButton,
                formData.availableHours.includes(hour) &&
                  styles.hourButtonSelected,
              ]}
              onPress={() => toggleHour(hour)}
            >
              <Text
                style={[
                  styles.hourButtonText,
                  formData.availableHours.includes(hour) &&
                    styles.hourButtonTextSelected,
                ]}
              >
                {hour}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Button
        title="Save Table"
        onPress={handleSubmit}
        disabled={
          !formData.number ||
          !formData.capacity ||
          formData.availableHours.length === 0
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: "80%",
  },
  content: {
    gap: 16,
    padding: 16,
  },
  hoursSection: {
    gap: 12,
  },
  hoursLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: palette.text,
  },
  timeSlotSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  timeSlotButton: {
    flex: 1,
    backgroundColor: palette.background,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.border,
  },
  timeSlotText: {
    color: palette.text,
    fontWeight: "500",
  },
  hoursGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  hourButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: "transparent",
  },
  hourButtonSelected: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  hourButtonText: {
    fontSize: 14,
    color: palette.text,
  },
  hourButtonTextSelected: {
    color: "#FFF",
  },
});
