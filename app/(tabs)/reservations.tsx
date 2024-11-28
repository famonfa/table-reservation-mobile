import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { palette } from "../../components/ui/palette";
import { Text } from "../../components/ui/text";
import { Calendar } from "../../components/calendar";

export default function Reservation() {
  const [selected, setSelected] = useState("");

  return (
    <View style={styles.container}>
      <Calendar setSelected={setSelected} selected={selected} />
      {selected && <Text style={styles.header}>You selected: {selected}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  header: {
    padding: 20,
    textAlign: "center",
  },
});
