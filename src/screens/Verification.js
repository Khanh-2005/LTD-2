import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { appColors } from "../constants/appColors";

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

const VerificationScreen = ({ navigation, route }) => {
  const email = route?.params?.email || "your email address";
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const updateCode = (value, index) => {
    const digits = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];
    nextCode[index] = digits;
    setCode(nextCode);
    setError("");
    if (digits && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join("");
    if (enteredCode.length !== 4) return;
    navigation.navigate("home");
  };

  const handleResend = () => {
    setCode(["", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const maskedEmail = email.replace(/^(.{2}).+(@.*)$/, "$1***$2");

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
          <View style={styles.content}>
            <Pressable
              onPress={() => navigation.navigate("forgotPassword")}
              hitSlop={10}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <Text style={styles.heading}>Verification</Text>
            <Text style={styles.description}>
              We've sent you the verification code on {maskedEmail}
            </Text>
            <View style={styles.codeRow}>
              {code.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(input) => {
                    inputRefs.current[index] = input;
                  }}
                  value={value}
                  onChangeText={(text) => updateCode(text, index)}
                  onKeyPress={(event) => handleKeyPress(event, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  style={[styles.codeInput, value && styles.filledInput]}
                />
              ))}
            </View>
            <Pressable
              onPress={handleVerify}
              disabled={code.join("").length !== 4}
              style={({ pressed }) => [
                styles.continueButton,
                code.join("").length !== 4 && styles.disabledButton,
                pressed && styles.pressedButton,
              ]}
            >
              <Text style={styles.continueText}>CONTINUE</Text>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.resendRow}>
              <Pressable onPress={handleResend}>
                <Text style={styles.resendLink}>Re-send code</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FDFCFF" },
  keyboardView: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 28 },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    marginBottom: 10,
  },
  backIcon: {
    color: "#120D26",
    fontSize: 32,
    lineHeight: 30,
    fontWeight: "300",
  },
  heading: {
    color: "#120D26",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: { color: "#514D5D", fontSize: 11, lineHeight: 17 },
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 26,
    paddingHorizontal: 4,
  },
  codeInput: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: "#E3E1EA",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    color: "#120D26",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  filledInput: { borderColor: appColors.primary },
  continueButton: {
    height: 36,
    marginTop: 25,
    borderRadius: 9,
    backgroundColor: appColors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: appColors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  disabledButton: { backgroundColor: "#C8CCD9", shadowOpacity: 0 },
  pressedButton: { opacity: 0.85 },
  continueText: {
    color: appColors.white,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  arrow: {
    marginLeft: 10,
    color: appColors.white,
    fontSize: 22,
    lineHeight: 20,
  },
  errorText: {
    color: appColors.danger,
    textAlign: "center",
    fontSize: 11,
    marginTop: 12,
  },
  resendRow: { alignItems: "center", marginTop: 15 },
  resendLink: { color: appColors.primary, fontSize: 11, fontWeight: "600" },
});
