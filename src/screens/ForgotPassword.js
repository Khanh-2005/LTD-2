import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { appColors } from "../constants/appColors";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MailIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={5}
      width={18}
      height={14}
      rx={4}
      stroke="#8A8795"
      strokeWidth={1.7}
    />
    <Path
      d="M6.5 8.5 12 12.4l5.5-3.9"
      stroke="#8A8795"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const ArrowRightIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14"
      stroke="#FFFFFF"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <Path
      d="m13 6 6 6-6 6"
      stroke="#FFFFFF"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const ArrowLeftIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 6 9 12l6 6M9 12h11"
      stroke="#120D26"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const emailIsValid = emailRegex.test(email.trim());

  const handleSubmit = () => {
    setSubmitted(true);
    if (!emailIsValid) return;

    navigation?.navigate?.("verification", { email: email.trim() });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            onPress={() => navigation?.navigate?.("/login")}
            hitSlop={10}
            style={styles.backButton}
          >
            <ArrowLeftIcon />
          </Pressable>

          <Text style={styles.heading}>Reset Password?</Text>
          <Text style={styles.description}>
            Please enter your email address to request a password resetand we
            will send you a OTP to reset your password.
          </Text>

          <View
            style={[
              styles.inputBox,
              submitted && !emailIsValid && styles.inputError,
            ]}
          >
            <View style={styles.inputIcon}>
              <MailIcon />
            </View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="abc@email.com"
              placeholderTextColor="#8C8A9D"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>
          {submitted && !emailIsValid ? (
            <Text style={styles.errorText}>Email is invalid.</Text>
          ) : null}

          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.submitText}>SEND</Text>
            <View style={styles.arrow}>
              <ArrowRightIcon />
            </View>
          </Pressable>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Remember your password? </Text>
            <Pressable onPress={() => navigation?.navigate?.("/login")}>
              <Text style={styles.loginLink}>Sign in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FDFCFF" },
  keyboardView: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 36,
    paddingBottom: 34,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 28,
  },
  heading: {
    color: "#120D26",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    color: "#807A7A",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  inputBox: {
    height: 54,
    borderWidth: 1,
    borderColor: "#E3E1EA",
    borderRadius: 12,
    backgroundColor: appColors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inputError: { borderColor: appColors.danger },
  inputIcon: { width: 34, alignItems: "flex-start", justifyContent: "center" },
  input: { flex: 1, color: "#120D26", fontSize: 15, paddingVertical: 0 },
  errorText: { color: appColors.danger, fontSize: 12, marginBottom: 12 },
  submitButton: {
    height: 56,
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: appColors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  buttonPressed: { opacity: 0.85 },
  submitText: { color: appColors.white, fontSize: 15, fontWeight: "600" },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  arrow: {
    position: "absolute",
    right: 13,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  loginText: { color: "#120D26", fontSize: 14 },
  loginLink: { color: appColors.primary, fontSize: 14 },
});
