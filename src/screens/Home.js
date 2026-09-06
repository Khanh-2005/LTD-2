import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { appColors } from "../constants/appColors";
import { TextComponent, SpaceComponent } from "../components";

const { width } = Dimensions.get("window");

const CATEGORIES = [
  {
    id: "1",
    title: "Sports",
    color: "#F0635A",
    image: require("../assets/images/ball_icon.png"),
  },
  {
    id: "2",
    title: "Music",
    color: "#F59762",
    image: require("../assets/images/music_icon.png"),
  },
  {
    id: "3",
    title: "Food",
    color: "#29D697",
    image: require("../assets/images/food_icon.png"),
  },
  {
    id: "4",
    title: "Art",
    color: "#46CDFB",
    image: null, // Sử dụng icon Art vẽ vector outline đồng bộ
  },
];

const UPCOMING_EVENTS = [
  {
    id: "e1",
    title: "International Band Music Concert",
    date: "10 JUNE",
    time: "4:00 PM - 9:00 PM",
    location: "36 Guild Street London, UK",
    joinedCount: 20,
    avatarColors: ["#5669FF", "#FF8D5D", "#00F8FF"],
    bgGradient: "#4A54F1",
    tag: "Music",
  },
  {
    id: "e2",
    title: "Joash Gala Music Festival 2026",
    date: "12 JUNE",
    time: "6:30 PM - 11:00 PM",
    location: "Radius Gallery Santa Cruz, CA",
    joinedCount: 15,
    avatarColors: ["#FF5656", "#29D697", "#FF8D5D"],
    bgGradient: "#5B41D9",
    tag: "Music",
  },
];

const NEARBY_EVENTS = [
  {
    id: "n1",
    title: "Design Workshop & UI Meetup",
    date: "15 JUNE",
    location: "Silicon Valley, CA",
    joinedCount: 35,
    price: "$25.00",
    color: "#3D56F0",
  },
  {
    id: "n2",
    title: "Food Festival & Night Market",
    date: "18 JUNE",
    location: "Greenwich St, New York",
    joinedCount: 50,
    price: "Free",
    color: "#FF6B6B",
  },
];

export const HomeScreen = ({
  onOpenDrawer,
  onNotificationPress,
  onEventPress,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("explore"); // explore | events | map | profile
  const [savedEvents, setSavedEvents] = useState({});

  const toggleBookmark = (id) => {
    setSavedEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={appColors.primary} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section (Blue Background) */}
        <View style={styles.headerContainer}>
          <SafeAreaView>
            {/* Top Bar: Menu / Location / Notification */}
            <View style={styles.topBar}>
              {/* Menu Button */}
              <TouchableOpacity
                onPress={onOpenDrawer}
                style={styles.headerIconBtn}
                activeOpacity={0.7}
              >
                <TextComponent text="☰" size={22} color={appColors.white} />
              </TouchableOpacity>

              {/* Location Selector */}
              <View style={styles.locationContainer}>
                <View style={styles.locationRow}>
                  <TextComponent
                    text="Current Location"
                    size={12}
                    color="rgba(255, 255, 255, 0.7)"
                  />
                  <TextComponent
                    text=" ▾"
                    size={12}
                    color="rgba(255, 255, 255, 0.7)"
                  />
                </View>
                <TextComponent
                  text="New York, USA"
                  size={14}
                  weight="600"
                  color={appColors.white}
                />
              </View>

              {/* Notification Button */}
              <TouchableOpacity
                onPress={onNotificationPress}
                style={styles.notificationBtn}
                activeOpacity={0.7}
              >
                <Image
                  source={require("../assets/images/ring_icon.png")}
                  style={{ width: 18, height: 18, tintColor: appColors.white }}
                  resizeMode="contain"
                />
                <View style={styles.badgeDot} />
              </TouchableOpacity>
            </View>

            <SpaceComponent height={20} />

            {/* Search Bar + Filter Button */}
            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Image
                  source={require("../assets/images/search.png")}
                  style={{ width: 18, height: 18, tintColor: appColors.white }}
                  resizeMode="contain"
                />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search..."
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  style={styles.searchInput}
                />
              </View>

              <TouchableOpacity style={styles.filterBtn} activeOpacity={0}>
                <Image
                  source={require("../assets/images/filter.png")}
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
                <TextComponent
                  text="Filter"
                  size={14}
                  weight="600"
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>

            <SpaceComponent height={20} />
          </SafeAreaView>
        </View>

        {/* Floating Categories Bar */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const iconTintColor = isSelected ? appColors.white : cat.color;

              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  activeOpacity={0.8}
                  style={[
                    styles.categoryItem,
                    {
                      backgroundColor: isSelected ? cat.color : appColors.white,
                    },
                  ]}
                >
                  {cat.image ? (
                    <Image
                      source={cat.image}
                      style={{
                        width: 17,
                        height: 17,
                        marginRight: 6,
                        tintColor: iconTintColor,
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    /* Art Icon vector vẽ theo style outline tối giản đồng bộ */
                    <View style={styles.artIconContainer}>
                      <View
                        style={[
                          styles.artPalette,
                          { borderColor: iconTintColor },
                        ]}
                      >
                        <View
                          style={[
                            styles.artHole,
                            { backgroundColor: iconTintColor },
                          ]}
                        />
                      </View>
                    </View>
                  )}
                  <TextComponent
                    text={cat.title}
                    size={14}
                    weight="500"
                    color={isSelected ? appColors.white : "#8A8D9F"}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <SpaceComponent height={24} />

        {/* Section 1: Upcoming Events */}
        <View style={styles.sectionHeader}>
          <TextComponent
            text="Upcoming Events"
            size={18}
            weight="700"
            color={appColors.text}
          />
          <TouchableOpacity activeOpacity={0.6}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextComponent
                text="See All "
                size={14}
                color={appColors.textSecondary}
              />
              <TextComponent
                text="▸"
                size={14}
                color={appColors.textSecondary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <SpaceComponent height={14} />

        {/* Upcoming Events Horizontal List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.upcomingScroll}
        >
          {UPCOMING_EVENTS.map((event) => {
            const isBookmarked = savedEvents[event.id];
            return (
              <TouchableOpacity
                key={event.id}
                activeOpacity={0.9}
                onPress={() => onEventPress && onEventPress(event)}
                style={styles.eventCard}
              >
                {/* Event Image / Banner Background */}
                <ImageBackground
                  source={require("../assets/images/bg_event.png")}
                  style={[
                    styles.eventBanner,
                    { backgroundColor: event.bgGradient },
                  ]}
                  imageStyle={styles.eventBannerImage}
                >
                  {/* Date Badge */}
                  <View style={styles.dateBadge}>
                    <TextComponent
                      text={event.date.split(" ")[0]}
                      size={18}
                      weight="700"
                      color="#EB5757"
                    />
                    <TextComponent
                      text={event.date.split(" ")[1]}
                      size={10}
                      weight="700"
                      color="#EB5757"
                    />
                  </View>

                  {/* Bookmark Button */}
                  <TouchableOpacity
                    onPress={() => toggleBookmark(event.id)}
                    style={styles.bookmarkBtn}
                    activeOpacity={0.7}
                  >
                    <TextComponent
                      text={isBookmarked ? "🔖" : "🏷️"}
                      size={14}
                      color={isBookmarked ? "#EB5757" : appColors.white}
                    />
                  </TouchableOpacity>
                </ImageBackground>

                {/* Event Details */}
                <View style={styles.eventInfo}>
                  <TextComponent
                    text={event.title}
                    size={16}
                    weight="700"
                    color={appColors.text}
                    numberOfLines={1}
                  />

                  <SpaceComponent height={8} />

                  {/* Attendees Row */}
                  <View style={styles.attendeesRow}>
                    <View style={styles.avatarGroup}>
                      {event.avatarColors.map((color, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.avatarCircle,
                            {
                              backgroundColor: color,
                              marginLeft: idx > 0 ? -8 : 0,
                            },
                          ]}
                        >
                          <Image
                            source={require("../assets/images/Profile.png")}
                            style={{
                              width: 12,
                              height: 12,
                              tintColor: appColors.white,
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      ))}
                    </View>
                    <TextComponent
                      text={` +${event.joinedCount} Going`}
                      size={12}
                      weight="600"
                      color={appColors.primary}
                    />
                  </View>

                  <SpaceComponent height={10} />

                  {/* Location */}
                  <View style={styles.locationRowCard}>
                    <Image
                      source={require("../assets/images/Location.png")}
                      style={{
                        width: 14,
                        height: 14,
                        tintColor: appColors.textSecondary,
                        marginRight: 4,
                      }}
                      resizeMode="contain"
                    />
                    <TextComponent
                      text={event.location}
                      size={13}
                      color={appColors.textSecondary}
                      numberOfLines={1}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <SpaceComponent height={24} />

        {/* Invite Friends Banner */}
        <View style={styles.inviteBanner}>
          <View style={{ flex: 1 }}>
            <TextComponent
              text="Invite your friends"
              size={18}
              weight="700"
              color={appColors.text}
            />
            <SpaceComponent height={4} />
            <TextComponent
              text="Get $20 for ticket"
              size={13}
              color={appColors.textSecondary}
            />
            <SpaceComponent height={12} />
            <TouchableOpacity style={styles.inviteBtn} activeOpacity={0.8}>
              <TextComponent
                text="INVITE"
                size={12}
                weight="700"
                color={appColors.white}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inviteGraphic}>
            <TextComponent text="🎁" size={54} />
          </View>
        </View>

        <SpaceComponent height={24} />

        {/* Section 2: Nearby Events */}
        <View style={styles.sectionHeader}>
          <TextComponent
            text="Nearby You"
            size={18}
            weight="700"
            color={appColors.text}
          />
          <TouchableOpacity activeOpacity={0.6}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextComponent
                text="See All "
                size={14}
                color={appColors.textSecondary}
              />
              <TextComponent
                text="▸"
                size={14}
                color={appColors.textSecondary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <SpaceComponent height={14} />

        {/* Nearby Events Vertical List */}
        {NEARBY_EVENTS.map((event) => (
          <TouchableOpacity
            key={event.id}
            activeOpacity={0.9}
            onPress={() => onEventPress && onEventPress(event)}
            style={styles.nearbyCard}
          >
            <View
              style={[
                styles.nearbyImageThumb,
                { backgroundColor: event.color },
              ]}
            >
              <Image
                source={require("../assets/images/Calendar.png")}
                style={{ width: 28, height: 28, tintColor: appColors.white }}
                resizeMode="contain"
              />
            </View>
            <View style={styles.nearbyInfo}>
              <TextComponent
                text={`${event.date} • ${event.price}`}
                size={12}
                weight="600"
                color={appColors.primary}
              />
              <SpaceComponent height={4} />
              <TextComponent
                text={event.title}
                size={15}
                weight="700"
                color={appColors.text}
                numberOfLines={1}
              />
              <SpaceComponent height={6} />
              <View style={styles.locationRowCard}>
                <Image
                  source={require("../assets/images/Location.png")}
                  style={{
                    width: 12,
                    height: 12,
                    tintColor: appColors.textSecondary,
                    marginRight: 4,
                  }}
                  resizeMode="contain"
                />
                <TextComponent
                  text={event.location}
                  size={12}
                  color={appColors.textSecondary}
                  numberOfLines={1}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <SpaceComponent height={90} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("explore")}
          style={styles.navTab}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/images/compass.png")}
            style={[
              styles.navTabIcon,
              {
                tintColor:
                  activeTab === "explore" ? appColors.primary : "#8A8D9F",
              },
            ]}
            resizeMode="contain"
          />
          <TextComponent
            text="Explore"
            size={11}
            weight={activeTab === "explore" ? "700" : "500"}
            color={activeTab === "explore" ? appColors.primary : "#8A8D9F"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("events")}
          style={styles.navTab}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/images/Calendar.png")}
            style={[
              styles.navTabIcon,
              {
                tintColor:
                  activeTab === "events" ? appColors.primary : "#8A8D9F",
              },
            ]}
            resizeMode="contain"
          />
          <TextComponent
            text="Events"
            size={11}
            weight={activeTab === "events" ? "700" : "500"}
            color={activeTab === "events" ? appColors.primary : "#8A8D9F"}
          />
        </TouchableOpacity>

        {/* Center Floating Action Button */}
        <TouchableOpacity
          onPress={() => console.log("Create Event")}
          style={styles.centerAddBtn}
          activeOpacity={0.85}
        >
          <View style={styles.centerAddCircle}>
            <TextComponent
              text="+"
              size={28}
              weight="400"
              color={appColors.white}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("map")}
          style={styles.navTab}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/images/Location.png")}
            style={[
              styles.navTabIcon,
              {
                tintColor: activeTab === "map" ? appColors.primary : "#8A8D9F",
              },
            ]}
            resizeMode="contain"
          />
          <TextComponent
            text="Map"
            size={11}
            weight={activeTab === "map" ? "700" : "500"}
            color={activeTab === "map" ? appColors.primary : "#8A8D9F"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("profile")}
          style={styles.navTab}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/images/Profile.png")}
            style={[
              styles.navTabIcon,
              {
                tintColor:
                  activeTab === "profile" ? appColors.primary : "#8A8D9F",
              },
            ]}
            resizeMode="contain"
          />
          <TextComponent
            text="Profile"
            size={11}
            weight={activeTab === "profile" ? "700" : "500"}
            color={activeTab === "profile" ? appColors.primary : "#8A8D9F"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    backgroundColor: appColors.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 36 : 12,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  locationContainer: {
    alignItems: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00F8FF",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: appColors.white,
    height: "100%",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryContainer: {
    marginTop: -16,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  artIconContainer: {
    width: 17,
    height: 17,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  artPalette: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1.8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 2,
  },
  artHole: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  upcomingScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  eventCard: {
    width: width * 0.65,
    backgroundColor: appColors.white,
    borderRadius: 18,
    padding: 10,
    shadowColor: "#505588",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  eventBanner: {
    height: 130,
    borderRadius: 14,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dateBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  bookmarkBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  eventInfo: {
    paddingHorizontal: 6,
    paddingTop: 12,
    paddingBottom: 4,
  },
  attendeesRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: appColors.white,
  },
  locationRowCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  inviteBanner: {
    marginHorizontal: 24,
    backgroundColor: "#D1E6FF",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inviteBtn: {
    backgroundColor: "#00F8FF",
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  inviteGraphic: {
    marginLeft: 12,
  },
  nearbyCard: {
    marginHorizontal: 24,
    marginBottom: 14,
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#505588",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  nearbyImageThumb: {
    width: 74,
    height: 74,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  nearbyInfo: {
    flex: 1,
    marginLeft: 14,
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: appColors.white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
    paddingBottom: Platform.OS === "ios" ? 12 : 0,
  },
  navTab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navTabIcon: {
    width: 20,
    height: 20,
    marginBottom: 4,
  },
  centerAddBtn: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  centerAddCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: appColors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: appColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
});

export default HomeScreen;
