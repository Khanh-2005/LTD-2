import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { appColors } from "../constants/appColors";
import Svg, { Path } from "react-native-svg";

const BackIcon = () => (
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

const MyProfileScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <StatusBar style="dark" />
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityLabel="Go back"
            onPress={() => navigation?.navigate("home")}
            style={styles.backButton}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileSummary}>
          <Image
            source={require("../assets/images/avatar3.png")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Ashfak Sayem</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>350</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>346</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Image
              source={require("../assets/images/edit.png")}
              style={styles.editIcon}
            />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>
            Enjoy your favorite dishe and a lovely your friends and family and
            have a great time. Food from local food trucks will be available for
            purchase. Read More
          </Text>
        </View>

        <View style={styles.interestHeader}>
          <Text style={styles.sectionTitle}>Interest</Text>
          <TouchableOpacity style={styles.changeButton}>
            <Image
              source={require("../assets/images/edit_mini.png")}
              style={styles.changeIcon}
            />
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chips}>
          <InterestChip label="Games Online" color="#7280FF" />
          <InterestChip label="Concert" color="#F06464" />
          <InterestChip label="Music" color="#FF8D5D" />
          <InterestChip label="Art" color="#7D67EE" />
          <InterestChip label="Movie" color="#38CFA2" />
          <InterestChip label="Others" color="#31C2D8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  </View>
);

const InterestChip = ({ label, color }) => (
  <View style={[styles.chip, { backgroundColor: color }]}>
    <Text style={styles.chipText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: "#DCDCDC", flex: 1 },
  safeArea: { backgroundColor: appColors.white, flex: 1, marginHorizontal: 5 },
  content: { paddingBottom: 40, paddingHorizontal: 22 },
  header: { alignItems: "center", flexDirection: "row", height: 72 },
  backButton: { alignItems: "flex-start", justifyContent: "center", width: 34 },
  headerTitle: {
    color: appColors.text,
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 3,
  },
  profileSummary: { alignItems: "center", paddingTop: 1 },
  avatar: { borderRadius: 43, height: 86, width: 86 },
  name: {
    color: appColors.text,
    fontSize: 19,
    fontWeight: "600",
    marginTop: 16,
  },
  statsRow: { flexDirection: "row", marginTop: 13 },
  stat: { alignItems: "center", marginHorizontal: 24 },
  statValue: { color: appColors.text, fontSize: 15, fontWeight: "600" },
  statLabel: { color: "#9B99A7", fontSize: 11, marginTop: 4 },
  editButton: {
    alignItems: "center",
    borderColor: appColors.primary,
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: "row",
    height: 42,
    justifyContent: "center",
    marginTop: 17,
    width: 144,
  },
  editIcon: { height: 18, marginRight: 8, width: 18 },
  editText: { color: appColors.primary, fontSize: 13 },
  section: { marginTop: 30 },
  sectionTitle: {
    color: appColors.text,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  aboutText: { color: "#777585", fontSize: 16, lineHeight: 20, maxWidth: 360 },
  interestHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },
  changeButton: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 4,
    padding: 4,
  },
  changeIcon: {
    height: 14,
    marginRight: 5,
    tintColor: appColors.primary,
    width: 14,
  },
  changeText: { color: appColors.primary, fontSize: 10 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderRadius: 13, paddingHorizontal: 13, paddingVertical: 7 },
  chipText: { color: appColors.white, fontSize: 11, fontWeight: "600" },
});

export default MyProfileScreen;
