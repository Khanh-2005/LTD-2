import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { appColors } from "../constants/appColors";

const FALLBACK_EVENT = {
  title: "International Band Music Concert",
  date: "14 December, 2021",
  time: "Tuesday, 4:00PM - 9:00PM",
  location: "Gala Convention Center",
  address: "36 Guild Street London, UK",
  organizer: "Ashfak Sayem",
};

const avatars = [
  require("../assets/images/avatar.png"),
  require("../assets/images/avatar2.png"),
  require("../assets/images/avatar2.png"),
];

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
      d="M15 6 9 12l6 6"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 12h11" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const EventDetail = ({ navigation, route }) => {
  const event = { ...FALLBACK_EVENT, ...(route?.params?.event || {}) };
  const [isSaved, setIsSaved] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImageBackground
          source={require("../assets/images/bg_eventDetail.png")}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <SafeAreaView style={styles.heroSafeArea}>
            <View style={styles.header}>
              <TouchableOpacity
                accessibilityLabel="Go back"
                onPress={() => navigation?.navigate("home")}
                style={styles.headerButton}
              >
                <ArrowLeftIcon />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Event Details</Text>
              <TouchableOpacity
                accessibilityLabel={isSaved ? "Remove bookmark" : "Save event"}
                onPress={() => setIsSaved((saved) => !saved)}
                style={styles.bookmarkButton}
              >
                <Text
                  style={[styles.bookmarkIcon, isSaved && styles.savedIcon]}
                >
                  {isSaved ? "●" : "▮"}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>

        <View style={styles.attendeesBar}>
          <View style={styles.avatarStack}>
            {avatars.map((avatar, index) => (
              <Image
                key={index}
                source={avatar}
                style={[styles.avatar, index > 0 && styles.avatarOverlap]}
              />
            ))}
          </View>
          <Text style={styles.goingText}>+20 Going</Text>
          <TouchableOpacity style={styles.inviteButton} activeOpacity={0.8}>
            <Text style={styles.inviteText}>Invite</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          <InfoRow
            icon={require("../assets/images/Calendar.png")}
            title={event.date}
            detail={event.time}
          />
          <InfoRow
            icon={require("../assets/images/Location.png")}
            title={event.location}
            detail={event.address}
          />

          <View style={styles.organizerRow}>
            <Image
              source={require("../assets/images/avatar2.png")}
              style={styles.organizerAvatar}
            />
            <View style={styles.organizerCopy}>
              <Text style={styles.organizerName}>{event.organizer}</Text>
              <Text style={styles.organizerRole}>Organizer</Text>
            </View>
            <TouchableOpacity style={styles.followButton} activeOpacity={0.8}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 35 }]}>
            About Event
          </Text>
          <Text style={styles.description}>
            Enjoy your favorite dishe and a lovely your friends and family and
            have a great time. Food from local food trucks will be available for
            purchase. Read More
          </Text>
        </View>

        <View style={styles.ticketBar}>
          <Pressable>
            <TouchableOpacity style={styles.ticketButton} activeOpacity={0.88}>
              <Text style={styles.ticketText}>BUY TICKET $120</Text>
              <View style={styles.arrowCircle}>
                <ArrowRightIcon />
              </View>
            </TouchableOpacity>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ icon, title, detail }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconBox}>
      <Image source={icon} style={styles.infoIcon} resizeMode="contain" />
    </View>
    <View style={styles.infoCopy}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoDetail}>{detail}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.white },
  scrollContent: { paddingBottom: 112 },
  hero: { height: 206, justifyContent: "flex-start" },
  heroImage: { resizeMode: "cover" },
  heroSafeArea: { flex: 1 },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: Platform.OS === "android" ? 18 : 4,
  },
  headerButton: { width: 42, height: 42, justifyContent: "center" },
  backIcon: {
    color: appColors.white,
    fontSize: 38,
    fontWeight: "300",
    lineHeight: 38,
  },
  headerTitle: {
    color: appColors.white,
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
  },
  bookmarkButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.74)",
    borderRadius: 10,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  bookmarkIcon: { color: appColors.white, fontSize: 22 },
  savedIcon: { color: appColors.primary },
  attendeesBar: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: appColors.white,
    borderRadius: 32,
    elevation: 5,
    flexDirection: "row",
    height: 54,
    marginTop: -27,
    paddingHorizontal: 12,
    shadowColor: "#1A1A2E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    width: "82%",
    zIndex: 2,
  },
  avatarStack: { flexDirection: "row", width: 76 },
  avatar: {
    borderColor: appColors.white,
    borderRadius: 17,
    borderWidth: 2,
    height: 34,
    width: 34,
  },
  avatarOverlap: { marginLeft: -10 },
  goingText: {
    color: "#3E3C52",
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },
  inviteButton: {
    alignItems: "center",
    backgroundColor: appColors.primary,
    borderRadius: 8,
    height: 28,
    justifyContent: "center",
    width: 62,
  },
  inviteText: { color: appColors.white, fontSize: 12, fontWeight: "600" },
  content: { paddingHorizontal: 18, paddingTop: 25 },
  eventTitle: {
    color: appColors.text,
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 42,
    marginBottom: 22,
  },
  infoRow: { alignItems: "center", flexDirection: "row", marginBottom: 18 },
  infoIconBox: {
    alignItems: "center",
    backgroundColor: "#EEF0FF",
    borderRadius: 11,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  infoIcon: { height: 24, tintColor: appColors.primary, width: 24 },
  infoCopy: { flex: 1, marginLeft: 12 },
  infoTitle: {
    color: "#3E3C52",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 7,
  },
  infoDetail: { color: "#858397", fontSize: 12 },
  organizerRow: { alignItems: "center", flexDirection: "row", marginTop: 2 },
  organizerAvatar: {
    height: 44,
    width: 44,
  },
  organizerCopy: { flex: 1, marginLeft: 12 },
  organizerName: { color: appColors.text, fontSize: 14, marginBottom: 5 },
  organizerRole: { color: "#858397", fontSize: 12 },
  followButton: {
    alignItems: "center",
    backgroundColor: "#EEF0FF",
    borderRadius: 8,
    height: 28,
    justifyContent: "center",
    width: 56,
  },
  followText: { color: appColors.primary, fontSize: 11 },
  sectionTitle: {
    color: "#3E3C52",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 14,
  },
  description: { color: "#5D5A6F", fontSize: 15, lineHeight: 27 },
  ticketBar: {
    backgroundColor: appColors.white,
    bottom: 0,
    left: 0,
    paddingHorizontal: 46,
    paddingTop: 9,
    position: "absolute",
    right: 0,
    shadowColor: "#24336B",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  ticketButton: {
    marginBottom: 30,
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
  ticketText: {
    color: appColors.white,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.7,
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
  arrow: {
    color: appColors.white,
    fontSize: 29,
    fontWeight: "300",
    lineHeight: 29,
  },
});

export default EventDetail;
