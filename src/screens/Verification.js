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
          <Pressable
            onPress={() => navigation?.navigate?.("/login")}
            hitSlop={10}
            style={styles.backButton}
          >
            <ArrowLeftIcon />
          </Pressable>

          <Text style={styles.heading}>Verification</Text>
          <Text style={styles.description}>
            We've sent you the verification code on {maskedEmail}
          </Text>
          <View style={styles.content}>
            <Pressable
              onPress={() => navigation.navigate("forgotPassword")}
              hitSlop={10}
              style={styles.backButton}
            ></Pressable>

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
              <View style={styles.arrow}>
                <ArrowRightIcon />
              </View>
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
  backIcon: {
    color: "#120D26",
    fontSize: 32,
    lineHeight: 30,
    fontWeight: "300",
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
    marginBottom: -40,
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    paddingHorizontal: 4,
  },
  codeInput: {
    width: 50,
    height: 50,
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
    height: 56,
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: appColors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  disabledButton: { backgroundColor: "#C8CCD9", shadowOpacity: 0 },
  pressedButton: { opacity: 0.85 },
  continueText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: "600",
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
  errorText: {
    color: appColors.danger,
    fontSize: 12,
    marginBottom: 12,
  },

  resendRow: { alignItems: "center", marginTop: 15 },
  resendLink: { color: appColors.primary, fontSize: 14 },
});
