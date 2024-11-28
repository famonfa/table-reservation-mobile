import { Provider } from "react-redux";
import { store } from "../store";
import { UserProvider } from "../context/user-context";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Provider store={store}>
        <UserProvider>
          <Slot />
        </UserProvider>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 40,
  },
});
