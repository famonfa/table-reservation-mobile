import React from "react";
import { ManagerRestaurants } from "../components/manager-restaurants";
import { Redirect } from "expo-router";
import { useUser } from "../context/user-context";

export default function App() {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return null;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }
  return <ManagerRestaurants />;
}
