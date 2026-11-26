import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { appColors } from "../constants/appColors";

const FRIENDS = [
  {
    id: "f-1",
    name: "Alex Lee",
    followers: "2k Followers",
    avatar: require("../assets/images/avatar_noti2.png"),
    defaultSelected: true,
  },
  {
    id: "f-2",
    name: "Micheal Ulasi",
    followers: "56 Followers",
    avatar: require("../assets/images/avatar_noti1.png"),
    defaultSelected: false,
  },
  {
    id: "f-3",
    name: "Cristofer",
    followers: "300 Followers",
    avatar: require("../assets/images/avatar_noti3.png"),
    defaultSelected: true,
  },
  {
    id: "f-4",
    name: "David Silbia",
    followers: "5k Followers",
    avatar: require("../assets/images/avatar_noti4.png"),
    defaultSelected: false,
  },
  {
    id: "f-5",
    name: "Ashfak Sayem",
    followers: "402 Followers",
    avatar: require("../assets/images/avatar_noti5.png"),
    defaultSelected: true,
  },
  {
    id: "f-6",
    name: "Rocks Velkeinjen",
    followers: "893 Followers",
    avatar: require("../assets/images/avatar_noti6.png"),
    defaultSelected: false,
  },
  {
    id: "f-7",
    name: "Roman Kutepov",
    followers: "225 Followers",
    avatar: require("../assets/images/avatar.png"),
    defaultSelected: true,
  },
  {
    id: "f-8",
    name: "Cristofer Nolan",
    followers: "322 Followers",
    avatar: require("../assets/images/avatar2.png"),
    defaultSelected: false,
  },
  {
    id: "f-9",
    name: "Jhon Wick",
    followers: "2k Followers",
    avatar: require("../assets/images/avatar3.png"),
    defaultSelected: true,
  },
  {
    id: "f-10",
    name: "Zenifero Bolex",
    followers: "3k Followers",
    avatar: require("../assets/images/avatar_noti1.png"),
    defaultSelected: false,
  },
];

const CheckIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 13l4 4L19 7"
      stroke={appColors.white}
      strokeWidth={2.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowRightIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14"
      stroke={appColors.white}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <Path
      d="m13 6 6 6-6 6"
      stroke={appColors.white}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InviteFriendContent = ({ onClose, onInvite }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState(() =>
    FRIENDS.reduce((acc, friend) => {
      if (friend.defaultSelected) {
        acc[friend.id] = true;
      }
      return acc;
    }, {}),
  );

  const filteredFriends = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) {
      return FRIENDS;
    }
    return FRIENDS.filter((friend) =>
      friend.name.toLowerCase().includes(keyword),
    );
  }, [searchQuery]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInvite = () => {
    const invitedIds = Object.keys(selectedIds).filter((id) => selectedIds[id]);
    onInvite?.(invitedIds);
    onClose?.();
  };

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        <TouchableOpacity
          accessibilityLabel="Close invite friend"
          onPress={onClose}
          style={styles.handleWrapper}
          activeOpacity={0.8}
        >
          <View style={styles.handle} />
        </TouchableOpacity>

        <Text style={styles.title}>Invite Friend</Text>

        <View style={styles.searchBox}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            placeholderTextColor="#8193AE"
            style={styles.searchInput}
          />
          <Image
            source={require("../assets/images/search.png")}
            style={styles.searchIcon}
            resizeMode="contain"
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {filteredFriends.map((friend) => {
            const isSelected = Boolean(selectedIds[friend.id]);

            return (
              <TouchableOpacity
                key={friend.id}
                onPress={() => toggleSelect(friend.id)}
                style={styles.friendRow}
                activeOpacity={0.75}
              >
                <Image source={friend.avatar} style={styles.avatar} />
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendFollowers}>{friend.followers}</Text>
                </View>
                <View
                  style={[
                    styles.checkCircle,
                    isSelected
                      ? styles.checkCircleSelected
                      : styles.checkCircleUnselected,
                  ]}
                >
                  <CheckIcon />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleInvite}
            style={styles.inviteButton}
            activeOpacity={0.85}
          >
            <Text style={styles.inviteButtonText}>INVITE</Text>
            <View style={styles.inviteArrow}>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const InviteFriendScreen = ({
  visible = true,
  onClose,
  onInvite,
  navigation,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    navigation?.navigate("event-detail");
  };

  if (onClose !== undefined) {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <InviteFriendContent onClose={handleClose} onInvite={onInvite} />
      </Modal>
    );
  }

  return <InviteFriendContent onClose={handleClose} onInvite={onInvite} />;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(6, 5, 24, 0.55)",
  },
  sheet: {
    height: "90%",
    backgroundColor: appColors.white,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  handleWrapper: {
    alignItems: "center",
    paddingVertical: 6,
  },
  handle: {
    width: 34,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E4DFDF",
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "600",
    color: appColors.text,
  },
  searchBox: {
    marginTop: 18,
    height: 50,
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: "#F0F0F0",
    backgroundColor: appColors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: appColors.text,
  },
  searchIcon: {
    width: 16,
    height: 16,
    tintColor: appColors.primary,
    marginLeft: 8,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 110,
    gap: 16,
  },
  friendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 12,
  },
  friendName: {
    fontSize: 14,
    fontWeight: "600",
    color: appColors.text,
  },
  friendFollowers: {
    marginTop: 3,
    fontSize: 13,
    color: "#747688",
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleSelected: {
    backgroundColor: appColors.primary,
  },
  checkCircleUnselected: {
    backgroundColor: "#E2E2E2",
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 26,
    alignItems: "center",
  },
  inviteButton: {
    width: 271,
    height: 58,
    borderRadius: 15,
    backgroundColor: appColors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: appColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 6,
  },
  inviteButtonText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    color: appColors.white,
  },
  inviteArrow: {
    position: "absolute",
    right: 14,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#3D56F0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InviteFriendScreen;
