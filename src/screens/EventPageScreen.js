import React, { useMemo, useState } from "react";
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
import Svg, { Path, Rect } from "react-native-svg";

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

const PAST_EVENTS = [
  {
    id: "past-1",
    image: require("../assets/images/event4.png"),
    date: "Wed, Apr 28 • 5:30 PM",
    title: "Jo Malon London’s Mother’s Day Presents",
    location: "Radius Gallery • Santa Cruz, CA",
  },
  {
    id: "past-2",
    image: require("../assets/images/event5.png"),
    date: "Sat, May 1 • 2:00 PM",
    title: "A Virtual Evening of Smooth Jazz",
    location: "Lot 13 • Oakland, CA",
  },
];

const EventPage = ({ navigation, savedEvents = {}, onToggleBookmark }) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const savedUpcoming = useMemo(
    () => Object.values(savedEvents).filter((event) => event?.date),
    [savedEvents],
  );
  const events = activeTab === "upcoming" ? savedUpcoming : PAST_EVENTS;

  return (
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
          <TouchableOpacity
            accessibilityLabel="More options"
            style={styles.moreButton}
          >
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab("upcoming")}
            style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "upcoming" && styles.activeTabText,
              ]}
            >
              UPCOMING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("past")}
            style={[styles.tab, activeTab === "past" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "past" && styles.activeTabText,
              ]}
            >
              PAST EVENTS
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "upcoming" && events.length === 0 ? (
          <View style={styles.emptyState}>
            <Image
              source={require("../assets/images/emptyevent.png")}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>No Upcoming Event</Text>
            <Text style={styles.emptyDescription}>
              Lorem ipsum dolor sit amet,{"\n"}consectetur
            </Text>

            <TouchableOpacity
              onPress={() => navigation?.navigate("all-event")}
              style={styles.exploreButton}
            >
              <Text style={styles.exploreText}>EXPLORE EVENTS</Text>
              <View style={[styles.exploreArrow, { marginLeft: 14 }]}>
                <ArrowRightIcon />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                activeOpacity={0.85}
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
                {activeTab === "upcoming" && (
                  <TouchableOpacity
                    accessibilityLabel="Remove bookmark"
                    onPress={(pressEvent) => {
                      pressEvent?.stopPropagation?.();
                      onToggleBookmark?.(event.id);
                    }}
                    style={styles.bookmarkButton}
                  >
                    <Image
                      source={require("../assets/images/like.png")}
                      style={styles.bookmarkIcon}
                    />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: "#DCDCDC", flex: 1 },
  safeArea: { backgroundColor: appColors.white, flex: 1, marginHorizontal: 5 },
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: 62,
    paddingHorizontal: 16,
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
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 6,
  },
  moreButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 24,
  },
  moreIcon: { color: appColors.text, fontSize: 25, lineHeight: 25 },
  tabs: {
    alignSelf: "center",
    backgroundColor: "#F7F7F8",
    borderRadius: 24,
    flexDirection: "row",
    height: 46,
    marginTop: 1,
    padding: 4,
    width: "84%",
  },
  tab: {
    alignItems: "center",
    borderRadius: 21,
    flex: 1,
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: appColors.white,
    elevation: 3,
    shadowColor: "#46464C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
  },
  tabText: { color: "#9998A1", fontSize: 13 },
  activeTabText: { color: appColors.primary },
  emptyState: { alignItems: "center", flex: 1, paddingTop: 98 },
  emptyImage: { height: 205, width: 205 },
  emptyTitle: {
    color: appColors.text,
    fontSize: 23,
    fontWeight: "700",
    marginTop: 27,
  },
  emptyDescription: {
    color: "#858397",
    fontSize: 16,
    lineHeight: 25,
    marginTop: 13,
    textAlign: "center",
  },
  exploreButton: {
    alignItems: "center",
    backgroundColor: appColors.primary,
    borderRadius: 14,
    bottom: 50,
    flexDirection: "row",
    height: 58,
    justifyContent: "center",
    position: "absolute",
    width: "70%",
  },
  exploreText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  exploreArrow: {
    alignItems: "center",
    backgroundColor: "#4055E8",
    borderRadius: 17,
    fontSize: 29,
    height: 34,
    justifyContent: "center",
    lineHeight: 29,
    marginLeft: 14,
    width: 34,
  },
  listContent: { padding: 20 },
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
  bookmarkButton: {
    alignItems: "center",
    height: 38,
    justifyContent: "center",
    marginLeft: 8,
    width: 30,
  },
  bookmarkIcon: { height: 19, tintColor: appColors.primary, width: 19 },
});

export default EventPage;
