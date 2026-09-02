import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { appColors } from "../constants/appColors";

const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.content}>
      <Text style={styles.title}>Welcome to EventHub</Text>
      <Text style={styles.subtitle}>
        Your account has been verified successfully.
      </Text>
      <Pressable
        onPress={() => navigation.navigate("login")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>SIGN OUT</Text>
      </Pressable>
    </View>
  </SafeAreaView>
);

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FDFCFF" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "#120D26",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#807A7A",
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },
  button: {
    marginTop: 28,
    backgroundColor: appColors.primary,
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  buttonText: {
    color: appColors.white,
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 1,
  },
});
