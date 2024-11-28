import { Provider } from "react-redux";
import { store } from "../store";
import { UserProvider } from "../context/user-context";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <UserProvider>
        <Slot />
      </UserProvider>
    </Provider>
  );
}
