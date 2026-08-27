import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { appColors } from "../constants/appColors";
import { appInfo } from "../constants/appInfos";
import { fontFamilies } from "../constants/fontFamilies";

const onboardingImages = [
  require("../assets/images/onboarding-1.png"),
  require("../assets/images/onboarding-2.png"),
  require("../assets/images/onboarding-3.png"),
];

const OnboardingScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < onboardingImages.length - 1) {
      setIndex(index + 1);
      return;
    }

    navigation?.navigate?.("LoginScreen");
  };

  const handleSkip = () => {
    navigation?.navigate?.("LoginScreen");
  };

  return (
    <ImageBackground source={onboardingImages[index]} style={styles.container} resizeMode="cover">
      <View style={styles.dots}>
        {onboardingImages.map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[styles.dot, dotIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleSkip} style={styles.button}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.nextText}>
            {index === onboardingImages.length - 1 ? "Start" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    justifyContent: "flex-end",
  },
  dots: {
    position: "absolute",
    bottom: 86,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: appColors.gray2,
  },
  activeDot: {
    width: 18,
    backgroundColor: appColors.white,
  },
  actions: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    minWidth: 72,
    minHeight: 44,
    justifyContent: "center",
  },
  skipText: {
    color: appColors.gray2,
    fontFamily: fontFamilies.medium,
    fontSize: 16,
  },
  nextText: {
    color: appColors.white,
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    textAlign: "right",
  },
});
