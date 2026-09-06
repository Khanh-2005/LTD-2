import React from "react";
import { StyleSheet, Text as RNText } from "react-native";
import { appColors } from "../constants/appColors";

export const TextComponent = ({
  text,
  size = 14,
  color = appColors.text,
  fontFamily,
  style,
  flex,
  numberOfLines,
  children,
  weight,
}) => {
  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: size,
          color: color,
          flex: flex ? 1 : 0,
          fontWeight: weight || (size >= 24 ? "bold" : "normal"),
        },
        style,
      ]}
    >
      {text || children}
    </RNText>
  );
};

export default TextComponent;
