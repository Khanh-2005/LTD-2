import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { appColors } from "../constants/appColors";

export const ButtonComponent = ({
  text,
  onPress,
  color = appColors.primary,
  textColor = appColors.white,
  type = "primary",
  style,
  textStyle,
  icon,
  iconFlex = "right",
  loading = false,
  disabled = false,
}) => {
  if (type === "link") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.linkBtn, style]}
      >
        <Text
          style={[
            styles.linkText,
            { color: textColor || appColors.white },
            textStyle,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        {
          backgroundColor: color,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && iconFlex === "left" ? icon : null}
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {text}
          </Text>
          {icon && iconFlex === "right" ? icon : null}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: appColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  linkBtn: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.8,
  },
});

export default ButtonComponent;
