import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Image,
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

const LockIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Rect
      x={5}
      y={10}
      width={14}
      height={10}
      rx={3}
      stroke="#8A8795"
      strokeWidth={1.7}
    />
    <Path
      d="M8.5 10V8a3.5 3.5 0 0 1 7 0v2"
      stroke="#8A8795"
      strokeWidth={1.7}
      strokeLinecap="round"
    />
    <Path
      d="M12 14v2"
      stroke="#8A8795"
      strokeWidth={1.7}
      strokeLinecap="round"
    />
  </Svg>
);

const EyeIcon = ({ isVisible }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5Z"
      stroke="#9B98A7"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
      stroke="#9B98A7"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {!isVisible && (
      <Path
        d="M4.5 19.5 19.5 4.5"
        stroke="#9B98A7"
        strokeWidth={2}
        strokeLinecap="round"
      />
    )}
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

const GoogleIcon = () => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
    <Path
      d="M13.0005 5.02721C14.8632 4.99855 16.6646 5.69251 18.0267 6.96346L21.6955 3.37596C19.3417 1.17039 16.2259 -0.0390273 13.0005 0.000960935C10.5905 0.000404079 8.22797 0.670256 6.17696 1.93561C4.12596 3.20096 2.46738 5.01192 1.38672 7.16596L5.59047 10.4297C6.10448 8.86678 7.09614 7.50463 8.42559 6.53535C9.75505 5.56607 11.3552 5.03856 13.0005 5.02721Z"
      fill="#E43E2B"
    />
    <Path
      d="M25.48 13.2901C25.4953 12.3964 25.403 11.5042 25.205 10.6326H13V15.4576H20.165C20.0291 16.3035 19.7235 17.1132 19.2666 17.838C18.8097 18.5628 18.2109 19.1877 17.5062 19.6751L21.6087 22.8526C22.8873 21.6182 23.8928 20.1293 24.5602 18.4822C25.2277 16.8351 25.5423 15.0663 25.4837 13.2901H25.48Z"
      fill="#3B7DED"
    />
    <Path
      d="M5.60543 15.5715C5.3212 14.7439 5.17467 13.8753 5.17168 13.0003C5.17686 12.1267 5.31814 11.2592 5.59043 10.429L1.38668 7.16528C0.47492 8.97545 0 10.9741 0 13.0009C0 15.0277 0.47492 17.0264 1.38668 18.8365L5.60543 15.5715Z"
      fill="#F0B501"
    />
    <Path
      d="M13.0004 26.0008C16.167 26.0903 19.2476 24.9635 21.6091 22.852L17.5066 19.6745C16.1764 20.5663 14.6011 21.0207 13.0004 20.9745C11.3565 20.9647 9.7575 20.4376 8.43013 19.4679C7.10275 18.4982 6.11443 17.1351 5.60536 15.572L1.40161 18.837C2.47936 20.9901 4.13522 22.8006 6.18375 24.0659C8.23229 25.3311 10.5926 26.0011 13.0004 26.0008Z"
      fill="#2BA24C"
    />
  </Svg>
);

const FacebookIcon = () => (
  <Svg width={31} height={31} viewBox="0 0 31 31" fill="none">
    <Rect width={30.7551} height={30.7551} rx={15.3776} fill="#1977F3" />
    <Path
      d="M18.0967 30.515C17.2141 30.6725 16.3055 30.7547 15.3777 30.7547C14.5554 30.7547 13.7481 30.6901 12.9607 30.5658V20.2757H8.7876V15.5405H12.9607V11.9314C12.9607 7.82681 15.413 5.55884 19.1684 5.55884C20.4008 5.576 21.6303 5.68299 22.8471 5.87893V9.9105H20.7735C18.7322 9.9105 18.0967 11.1731 18.0967 12.4699V15.5412H22.6547L21.926 20.2757H18.0967V30.515Z"
      fill="#FFFFFF"
    />
  </Svg>
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted && !emailRegex.test(email.trim());
  const passwordError = submitted && password.trim().length === 0;

  const canSubmit = useMemo(() => {
    return emailRegex.test(email.trim()) && password.trim().length > 0;
  }, [email, password]);

  const handleSignIn = () => {
    setSubmitted(true);

    if (!canSubmit) {
      return;
    }

    Alert.alert("Success", "Login UI validation passed.");
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brand}>
            <Image
              style={styles.logo}
              source={require("../assets/images/text-logo.png")}
            />
          </View>

          <Text style={styles.heading}>Sign in</Text>

          <View style={[styles.inputBox, emailError && styles.inputError]}>
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
          {emailError && (
            <Text style={styles.errorText}>Email is invalid.</Text>
          )}

          <View style={[styles.inputBox, passwordError && styles.inputError]}>
            <View style={styles.inputIcon}>
              <LockIcon />
            </View>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
              placeholderTextColor="#8C8A9D"
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
            />
            <Pressable
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              hitSlop={10}
              style={styles.eyeButton}
            >
              <EyeIcon isVisible={isPasswordVisible} />
            </Pressable>
          </View>
          {passwordError && (
            <Text style={styles.errorText}>Password is required.</Text>
          )}

          <View style={styles.optionRow}>
            <Pressable
              onPress={() => setIsRemember(!isRemember)}
              style={styles.remember}
            >
              <Switch
                value={isRemember}
                onValueChange={setIsRemember}
                trackColor={{ false: "#DDE0EE", true: appColors.primary }}
                thumbColor={appColors.white}
                ios_backgroundColor="#DDE0EE"
                style={styles.switch}
              />
              <Text style={styles.optionText}>Remember Me</Text>
            </Pressable>

            <Pressable
              onPress={() => Alert.alert("Forgot Password", "Coming soon.")}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleSignIn}
            style={({ pressed }) => [
              styles.signInButton,
              !canSubmit && submitted && styles.signInButtonDisabled,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.signInText}>SIGN IN</Text>
            <View style={styles.arrowCircle}>
              <ArrowRightIcon />
            </View>
          </Pressable>

          <Text style={styles.orText}>OR</Text>

          <Pressable style={styles.socialButton}>
            <View style={styles.socialIcon}>
              <GoogleIcon />
            </View>
            <Text style={styles.socialText}>Login with Google</Text>
          </Pressable>

          <Pressable style={styles.socialButton}>
            <View style={styles.socialIcon}>
              <FacebookIcon />
            </View>
            <Text style={styles.socialText}>Login with Facebook</Text>
          </Pressable>

          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Pressable onPress={() => navigation?.navigate?.("/signup")}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FDFCFF",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 52,
    paddingBottom: 34,
  },
  brand: {
    alignItems: "center",
    marginBottom: 34,
  },
  logoMark: {
    width: 74,
    height: 74,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  logoLetter: {
    color: appColors.primary,
    fontSize: 78,
    fontWeight: "800",
    lineHeight: 80,
  },
  logoSlash: {
    position: "absolute",
    width: 39,
    height: 10,
    borderRadius: 8,
    backgroundColor: "#00D9E7",
    transform: [{ rotate: "-30deg" }],
  },
  brandName: {
    color: "#37344B",
    fontSize: 34,
    fontWeight: "700",
  },
  heading: {
    color: "#120D26",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 22,
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
    marginBottom: 18,
  },
  inputError: {
    borderColor: appColors.danger,
  },
  inputIcon: {
    width: 34,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    color: "#120D26",
    fontSize: 15,
    paddingVertical: 0,
  },
  eyeButton: {
    minWidth: 44,
    alignItems: "flex-end",
  },
  errorText: {
    color: appColors.danger,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 36,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    transform: [{ scaleX: 0.78 }, { scaleY: 0.78 }],
    marginLeft: -7,
    marginRight: 2,
  },
  optionText: {
    color: "#120D26",
    fontSize: 14,
  },
  forgotText: {
    color: "#120D26",
    fontSize: 14,
  },
  signInButton: {
    height: 56,
    marginHorizontal: 23,
    borderRadius: 12,
    backgroundColor: appColors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: appColors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 8,
  },
  signInButtonDisabled: {
    opacity: 0.82,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  signInText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0,
  },
  arrowCircle: {
    position: "absolute",
    right: 13,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A5DF2",
  },
  orText: {
    color: "#9D9BA5",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 34,
    marginBottom: 12,
  },
  socialButton: {
    height: 54,
    marginHorizontal: 23,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: appColors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#D3D0DD",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 4,
  },
  socialIcon: {
    position: "absolute",
    left: 40,
    width: 31,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    color: "#120D26",
    fontSize: 16,
  },
  signUpRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  signUpText: {
    color: "#120D26",
    fontSize: 15,
  },
  signUpLink: {
    color: appColors.primary,
    fontSize: 15,
  },
});
