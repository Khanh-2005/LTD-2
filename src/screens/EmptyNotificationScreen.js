import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";
import { appColors } from "../constants/appColors";

const ArrowLeftIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 6 9 12l6 6"
      stroke={appColors.text}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 12h11"
      stroke={appColors.text}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const EmptyNotificationScreen = ({ navigation, onMorePress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityLabel="Go back"
          onPress={() => navigation?.navigate("home")}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity
          accessibilityLabel="More options"
          onPress={onMorePress}
          style={styles.moreButton}
          activeOpacity={0.7}
        >
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../assets/images/empty-notification.png")}
          style={styles.artwork}
          resizeMode="contain"
        />
        <Text style={styles.title}>No Notifications!</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          tempor
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 62,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 32,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 24,
    fontWeight: "600",
    color: appColors.text,
  },
  moreButton: {
    width: 32,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  moreIcon: {
    fontSize: 24,
    lineHeight: 24,
    color: appColors.text,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  artwork: {
    width: 156,
    height: 170,
  },
  title: {
    marginTop: 40,
    fontSize: 18,
    lineHeight: 34,
    fontWeight: "600",
    color: "#344B67",
    textAlign: "center",
  },
  description: {
    marginTop: 8,
    maxWidth: 336,
    fontSize: 16,
    lineHeight: 28,
    color: "#344B67",
    opacity: 0.7,
    textAlign: "center",
  },
});

export default EmptyNotificationScreen;
