import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
  Image,
} from "react-native";
import { appColors } from "../constants/appColors";

export const InputComponent = ({
  value,
  onChangeText,
  placeholder,
  isPassword = false,
  allowClear = false,
  type,
  prefix,
  suffix,
  placeholderTextColor = appColors.textSecondary,
  style,
  inputStyle,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(isPassword);

  return (
    <View style={[styles.container, style]}>
      {prefix ? <View style={styles.prefix}>{prefix}</View> : null}
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={isShowPassword}
        keyboardType={type || "default"}
        autoCapitalize="none"
      />
      {suffix ? suffix : null}
      {isPassword ? (
        <TouchableOpacity
          onPress={() => setIsShowPassword(!isShowPassword)}
          style={styles.eyeBtn}
        ></TouchableOpacity>
      ) : value && allowClear ? (
        <TouchableOpacity
          onPress={() => onChangeText("")}
          style={styles.clearBtn}
        >
          <RNText style={styles.clearText}>✕</RNText>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: appColors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 56,
    backgroundColor: appColors.white,
  },
  prefix: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: appColors.text,
  },
  eyeBtn: {
    padding: 8,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: appColors.textSecondary,
  },
  clearBtn: {
    padding: 8,
  },
  clearText: {
    fontSize: 14,
    color: appColors.gray3,
  },
});

export default InputComponent;
