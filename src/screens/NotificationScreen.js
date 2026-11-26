import React, { useState } from "react";
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

const INITIAL_NOTIFICATIONS = [
  {
    id: "noti-1",
    name: "David Silbia",
    message: "Invite Jo Malone London’s Mother’s",
    time: "Just now",
    avatar: require("../assets/images/avatar_noti1.png"),
    hasActions: true,
    event: {
      id: "noti-event-1",
      image: require("../assets/images/event4.png"),
      date: "Wed, Apr 28 • 5:30 PM",
      title: "Jo Malone London’s Mother’s Day Presents",
      location: "Radius Gallery • Santa Cruz, CA",
    },
  },
  {
    id: "noti-2",
    name: "Adnan Safi",
    message: "Started following you",
    time: "5 min ago",
    avatar: require("../assets/images/avatar_noti2.png"),
    hasActions: true,
    event: {
      id: "noti-event-2",
      image: require("../assets/images/event3.png"),
      date: "Fri, Aug 23 • 6:00 PM",
      title: "International Kids Safe Parents Night Out",
      location: "Lot 13 • Oakland, CA",
    },
  },
  {
    id: "noti-3",
    name: "Joan Baker",
    message: "Invite A virtual Evening of Smooth Jazz",
    time: "20 min ago",
    avatar: require("../assets/images/avatar_noti3.png"),
    hasActions: true,
    event: {
      id: "noti-event-3",
      image: require("../assets/images/event5.png"),
      date: "Sat, May 1 • 2:00 PM",
      title: "A Virtual Evening of Smooth Jazz",
      location: "Lot 13 • Oakland, CA",
    },
  },
  {
    id: "noti-4",
    name: "Ronald C. Kinch",
    message: "Like you events",
    time: "1 hr ago",
    avatar: require("../assets/images/avatar_noti4.png"),
    hasActions: true,
    event: {
      id: "noti-event-4",
      image: require("../assets/images/event2.png"),
      date: "Fri, Aug 23 • 6:00 PM",
      title: "International Kids Safe Parents Night Out",
      location: "Lot 13 • Oakland, CA",
    },
  },
  {
    id: "noti-5",
    name: "Clara Tolson",
    message: "Join your Event Gala Music Festival",
    time: "9 hr ago",
    avatar: require("../assets/images/avatar_noti5.png"),
    hasActions: true,
    event: {
      id: "noti-event-5",
      image: require("../assets/images/event6.png"),
      date: "Fri, Aug 23 • 6:00 PM",
      title: "Gala Music Festival",
      location: "Lot 13 • Oakland, CA",
    },
  },
  {
    id: "noti-6",
    name: "Jennifer Fritz",
    message: "Invite you International Kids Safe",
    time: "Tue , 5:10 pm",
    avatar: require("../assets/images/avatar_noti6.png"),
    hasActions: true,
    event: {
      id: "noti-event-6",
      image: require("../assets/images/event1.png"),
      date: "Fri, Aug 23 • 6:00 PM",
      title: "International Kids Safe Parents Night Out",
      location: "Lot 13 • Oakland, CA",
    },
  },
  {
    id: "noti-7",
    name: "Eric G. Prickett",
    message: "Started following you",
    time: "Wed, 3:30 pm",
    avatar: require("../assets/images/avatar_noti3.png"),
    hasActions: true,
    event: {
      id: "noti-event-7",
      image: require("../assets/images/event5.png"),
      date: "Sat, May 1 • 2:00 PM",
      title: "A Virtual Evening of Smooth Jazz",
      location: "Lot 13 • Oakland, CA",
    },
  },
];

export { INITIAL_NOTIFICATIONS };

const NotificationScreen = ({
  navigation,
  notifications: controlledNotifications,
  onAccept,
  onReject,
}) => {
  const [localNotifications, setLocalNotifications] = useState(
    INITIAL_NOTIFICATIONS,
  );
  const notifications = controlledNotifications ?? localNotifications;

  const removeAndCheckEmpty = (id) => {
    setLocalNotifications((prev) => {
      const next = prev.filter((item) => item.id !== id);
      if (next.length === 0 || !next.some((item) => item.hasActions)) {
        navigation?.navigate("empty-notification");
      }
      return next;
    });
  };

  const handleReject = (item) => {
    if (onReject) {
      onReject(item);
      return;
    }
    removeAndCheckEmpty(item.id);
  };

  const handleAccept = (item) => {
    if (onAccept) {
      onAccept(item);
      return;
    }
    removeAndCheckEmpty(item.id);
  };

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
          style={styles.moreButton}
          activeOpacity={0.7}
        >
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {notifications.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.itemBody}>
              <View style={styles.topRow}>
                <Text style={styles.messageText}>
                  <Text style={styles.nameText}>{item.name} </Text>
                  {item.message}
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              {item.hasActions && (
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    onPress={() => handleReject(item)}
                    style={styles.rejectButton}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleAccept(item)}
                    style={styles.acceptButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.acceptText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    gap: 18,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  itemBody: {
    flex: 1,
    marginLeft: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#3C3E56",
  },
  nameText: {
    fontWeight: "600",
    color: "#060518",
  },
  timeText: {
    marginLeft: 10,
    marginTop: 2,
    fontSize: 12,
    color: "#3C3E56",
    textAlign: "right",
  },
  actionsRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 13,
  },
  rejectButton: {
    width: 95,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: appColors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  rejectText: {
    fontSize: 14,
    color: "#706D6D",
  },
  acceptButton: {
    width: 95,
    height: 36,
    borderRadius: 6,
    backgroundColor: appColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptedButton: {
    opacity: 0.7,
  },
  acceptText: {
    fontSize: 14,
    color: appColors.white,
  },
});

export default NotificationScreen;
