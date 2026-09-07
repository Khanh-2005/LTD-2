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
import Svg, { Path, Rect } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { appColors } from "../constants/appColors";

const ArrowLeftIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 6 9 12l6 6"
      stroke="#120D26"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 12h11" stroke="#120D26" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const EVENTS = [
  {
    image: require("../assets/images/event4.png"),
    date: "Wed, Apr 28 • 5:30 PM",
    title: "Jo Malon London’s Mother’s Day Presents",
    location: "Radius Gallery • Santa Cruz, CA",
  },
  {
    image: require("../assets/images/event5.png"),
    date: "Sat, May 1 • 2:00 PM",
    title: "A Virtual Evening of Smooth Jazz",
    location: "Lot 13 • Oakland, CA",
  },
  {
    image: require("../assets/images/event3.png"),
    date: "Sat, Apr 24 • 1:30 PM",
    title: "Women's Leadership Conference 2021",
    location: "53 Bush St • San Francisco, CA",
  },
  {
    image: require("../assets/images/event1.png"),
    date: "Fri, Apr 23 • 6:00 PM",
    title: "International Kids Safe Parents Night Out",
    location: "Lot 13 • Oakland, CA",
  },
  {
    image: require("../assets/images/event6.png"),
    date: "Mon, Jun 21 • 10:00 PM",
    title: "Collectively Plays the Music of Jimi",
    location: "Longboard Margarita Bar",
  },
  {
    image: require("../assets/images/event2.png"),
    date: "Sun, Apr 25 • 10:15 AM",
    title: "International Gala Music Festival",
    location: "36 Guild Street London, UK",
  },
  {
    image: require("../assets/images/event1.png"),
    date: "Fri, Apr 12 • 7:00 PM",
    title: "IOT & AI Conference 2021",
    location: "Lot 13 • Oakland, CA",
  },
  {
    image: require("../assets/images/event6.png"),
    date: "Mon, Jun 21 • 10:00 PM",
    title: "BTS Concert in Los Angeles",
    location: "Longboard Margarita Bar",
  },
];

const AllEvent = ({ navigation }) => (
  <View style={styles.screen}>
    <StatusBar style="dark" />
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityLabel="Go back"
          onPress={() => navigation?.navigate("home")}
          style={styles.backButton}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            accessibilityLabel="Search events"
            style={styles.searchButton}
          >
            <View style={styles.searchCircle} />
            <View style={styles.searchHandle} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="More options"
            style={styles.moreButton}
          >
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {EVENTS.map((event, index) => (
          <TouchableOpacity
            key={event.title}
            activeOpacity={0.86}
            onPress={() => navigation?.navigate("event-detail", { event })}
            style={styles.eventCard}
          >
            <Image source={event.image} style={styles.eventImage} />
            <View style={styles.eventCopy}>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Text style={styles.eventTitle} numberOfLines={2}>
                {event.title}
              </Text>
              <View style={styles.locationLine}>
                <Image
                  source={require("../assets/images/Location.png")}
                  style={styles.locationIcon}
                  resizeMode="contain"
                />
                <Text style={styles.locationText} numberOfLines={1}>
                  {event.location}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: "#DCDCDC", flex: 1 },
  safeArea: { backgroundColor: appColors.white, flex: 1, marginHorizontal: 5 },
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: 78,
    paddingHorizontal: 17,
  },
  backButton: { height: 42, justifyContent: "center", width: 30 },
  backIcon: {
    color: appColors.text,
    fontSize: 38,
    fontWeight: "300",
    lineHeight: 38,
  },
  headerTitle: {
    color: appColors.text,
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 7,
  },
  headerActions: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  searchButton: {
    height: 38,
    marginRight: 16,
    position: "relative",
    width: 30,
  },
  searchCircle: {
    borderColor: appColors.text,
    borderRadius: 9,
    borderWidth: 2,
    height: 16,
    left: 2,
    position: "absolute",
    top: 8,
    width: 16,
  },
  searchHandle: {
    backgroundColor: appColors.text,
    height: 2,
    position: "absolute",
    right: 8,
    top: 24,
    transform: [{ rotate: "45deg" }],
    width: 8,
  },
  moreButton: {
    alignItems: "center",
    height: 38,
    justifyContent: "center",
    width: 18,
  },
  moreIcon: { color: appColors.text, fontSize: 25, lineHeight: 25 },
  listContent: { paddingBottom: 12, paddingHorizontal: 20 },
  eventCard: {
    alignItems: "center",
    backgroundColor: appColors.white,
    borderRadius: 15,
    elevation: 2,
    flexDirection: "row",
    marginBottom: 12,
    minHeight: 86,
    padding: 7,
    shadowColor: "#242044",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  eventImage: { borderRadius: 11, height: 80, width: 68 },
  eventCopy: { flex: 1, justifyContent: "center", marginLeft: 15, minWidth: 0 },
  eventDate: { color: appColors.primary, fontSize: 11, marginBottom: 5 },
  eventTitle: {
    color: appColors.text,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    marginBottom: 5,
  },
  locationLine: { alignItems: "center", flexDirection: "row" },
  locationIcon: { height: 14, marginRight: 5, tintColor: "#A5A3B1", width: 14 },
  locationText: { color: "#858397", flex: 1, fontSize: 11 },
});

export default AllEvent;
