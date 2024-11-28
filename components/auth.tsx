import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Error", error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Error", error.message);
    else
      Alert.alert("Success", "Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
        <Input
          placeholder="Email"
          leftIcon={{
            type: "font-awesome",
            name: "envelope",
            color: "#86939e",
            size: 20,
          }}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
        />
        <Input
          placeholder="Password"
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            color: "#86939e",
            size: 20,
          }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
        />
        <Button
          title={isLogin ? "Sign In" : "Sign Up"}
          onPress={isLogin ? signInWithEmail : signUpWithEmail}
          disabled={loading}
          loading={loading}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
        <TouchableOpacity
          onPress={() => setIsLogin(!isLogin)}
          style={styles.switchContainer}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputText: {
    color: "#333",
  },
  button: {
    backgroundColor: "#4c669f",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  switchContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  switchText: {
    color: "#4c669f",
    fontSize: 14,
  },
});
