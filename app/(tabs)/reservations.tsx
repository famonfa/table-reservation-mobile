import { useEffect, useState, useMemo } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { palette } from "../../components/ui/palette";
import { Text } from "../../components/ui/text";
import { Calendar } from "../../components/calendar";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  fetchReservationsByDate,
  ReservationStatus,
  type Reservation,
} from "../../store/reservationSlice";
import { Card, CardContent } from "../../components/ui/card";
import { Image } from "expo-image";

type StatusStylesType = {
  [key in ReservationStatus]: {
    backgroundColor: string;
  };
};

export default function Reservation() {
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const currentRestaurant = useSelector(
    (state: RootState) => state.restaurants.currentRestaurant
  );
  const { reservations, loading, error } = useSelector(
    (state: RootState) => state.reservations
  );

  useEffect(() => {
    if (currentRestaurant?.id && selected) {
      dispatch(
        fetchReservationsByDate({
          restaurantId: currentRestaurant.id,
          date: selected,
        })
      );
    }
  }, [selected, currentRestaurant?.id]);

  const groupedReservations = useMemo(() => {
    return reservations.reduce(
      (acc: { [key: string]: Reservation[] }, reservation) => {
        const hour = reservation.reservationTime;
        if (!acc[hour]) {
          acc[hour] = [];
        }
        acc[hour].push(reservation);
        return acc;
      },
      {}
    );
  }, [reservations]);

  const sortedHours = useMemo(() => {
    return Object.keys(groupedReservations).sort();
  }, [groupedReservations]);

  return (
    <View style={styles.container}>
      <Calendar setSelected={setSelected} selected={selected} />

      <ScrollView style={styles.scrollContainer}>
        {loading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={palette.primary} />
          </View>
        ) : error ? (
          <View style={styles.centerContent}>
            <Text variant="error">{error}</Text>
          </View>
        ) : !selected ? (
          <View style={styles.centerContent}>
            <Text variant="body">Select a date to view reservations</Text>
          </View>
        ) : sortedHours.length === 0 ? (
          <View style={styles.centerContent}>
            <Text variant="body">No reservations for this date</Text>
            <Image
              source={require("../../assets/woman.png")}
              style={{
                width: 500,
                height: 500,
                resizeMode: "contain",
                marginTop: 24,
              }}
            />
          </View>
        ) : (
          sortedHours.map((hour) => (
            <View key={hour} style={styles.timeBlock}>
              <View style={styles.timeHeader}>
                <Text variant="subtitle" style={styles.timeText}>
                  {hour}
                </Text>
                <Text variant="body" style={styles.countText}>
                  {groupedReservations[hour].length} reservations
                </Text>
              </View>
              {groupedReservations[hour].map((reservation) => (
                <Card key={reservation.id} style={styles.reservationCard}>
                  <CardContent>
                    <View style={styles.reservationHeader}>
                      <Text variant="subtitle">
                        Table {reservation.table.number}
                      </Text>
                      <View
                        style={[styles.statusBadge, styles[reservation.status]]}
                      >
                        <Text style={styles.statusText}>
                          {reservation.status}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.reservationDetails}>
                      <Text variant="body">Guest: {reservation.user.name}</Text>
                      <Text variant="body">
                        Party size: {reservation.partySize}
                      </Text>
                      <Text variant="body">
                        Phone: {reservation.user.phone}
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const statusStyles: StatusStylesType = {
  pending: {
    backgroundColor: "#F59E0B",
  },
  confirmed: {
    backgroundColor: "#10B981",
  },
  cancelled: {
    backgroundColor: "#EF4444",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    padding: 16,
    gap: 20,
  },
  scrollContainer: {
    flex: 1,
    padding: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  timeBlock: {
    marginBottom: 20,
  },
  timeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  timeText: {
    color: palette.primary,
    fontWeight: "600",
  },
  countText: {
    color: palette.text,
    opacity: 0.7,
  },
  reservationCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reservationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reservationDetails: {
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFF",
  },
  pending: {
    backgroundColor: "#F59E0B",
  },
  confirmed: {
    backgroundColor: "#10B981",
  },
  cancelled: {
    backgroundColor: "#EF4444",
  },
});
