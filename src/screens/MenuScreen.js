import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  Image,
} from "react-native";
import { appColors } from "../constants/appColors";
import { Text, Space } from "../components";

// ─── SVG-like vector icons as inline components ─────────────────────────────

const IconProfile = ({ color = "#120D26", size = 22 }) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <View
      style={{
        width: size * 0.5,
        height: size * 0.5,
        borderRadius: (size * 0.5) / 2,
        borderWidth: 1.8,
        borderColor: color,
        marginBottom: 2,
      }}
    />
    <View
      style={{
        width: size * 0.72,
        height: size * 0.3,
        borderTopLeftRadius: (size * 0.72) / 2,
        borderTopRightRadius: (size * 0.72) / 2,
        borderWidth: 1.8,
        borderBottomWidth: 0,
        borderColor: color,
      }}
    />
  </View>
);

const IconMessage = ({ color = "#120D26", size = 22 }) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <View
      style={{
        width: size * 0.9,
        height: size * 0.65,
        borderRadius: 5,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 3,
      }}
    >
      <View style={{ flexDirection: "row", gap: 3 }}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{
              width: size * 0.15,
              height: 2,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
        ))}
      </View>
    </View>
    <View
      style={{
        width: 8,
        height: 6,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 6,
        borderStyle: "solid",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: color,
        marginTop: -1,
        marginLeft: -size * 0.3,
      }}
    />
  </View>
);

const IconCalendar = ({ color = "#120D26", size = 22 }) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <View
      style={{
        width: size * 0.85,
        height: size * 0.75,
        borderRadius: 4,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: size * 0.22,
          backgroundColor: color,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          opacity: 0.15,
        }}
      />
    </View>
    <View
      style={{
        position: "absolute",
        top: 0,
        left: size * 0.2,
        width: 2.5,
        height: size * 0.25,
        backgroundColor: color,
        borderRadius: 2,
      }}
    />
    <View
      style={{
        position: "absolute",
        top: 0,
        right: size * 0.2,
        width: 2.5,
        height: size * 0.25,
        backgroundColor: color,
        borderRadius: 2,
      }}
    />
  </View>
);

const IconBookmark = ({ color = appColors.primary, size = 22 }) => (
  <Image
    source={require("../../img/Vector.png")}
    style={{ width: size, height: size, tintColor: color }}
    resizeMode="contain"
  />
);

const IconMail = ({ color = "#120D26", size = 22 }) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <View
      style={{
        width: size * 0.82,
        height: size * 0.62,
        borderWidth: 1.8,
        borderColor: color,
        borderRadius: 2,
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* đường chéo bên trái */}
      <View
        style={{
          position: "absolute",
          width: size * 0.55,
          height: 1.8,
          backgroundColor: color,
          transform: [{ rotate: "32deg" }],
          left: -size * 0.08,
          top: size * 0.2,
        }}
      />

      {/* đường chéo bên phải */}
      <View
        style={{
          position: "absolute",
          width: size * 0.55,
          height: 1.8,
          backgroundColor: color,
          transform: [{ rotate: "-32deg" }],
          right: -size * 0.08,
          top: size * 0.2,
        }}
      />
    </View>
  </View>
);
const IconSettings = ({ color = "#120D26", size = 22 }) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text text="⚙" size={size * 0.9} color={color} />
  </View>
);

const IconHelp = ({ color = "#120D26", size = 22 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 1.8,
      borderColor: color,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text text="?" size={size * 0.6} color={color} weight="700" />
  </View>
);

const IconMoon = ({ color = "#120D26", size = 22 }) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text text="🌙" size={size * 0.85} />
  </View>
);

const IconLogout = ({ color = "#F0635A", size = 22 }) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text text="→" size={size} color={color} weight="700" />
  </View>
);

// ─── Avatar placeholder ──────────────────────────────────────────────────────

const AvatarPlaceholder = ({ size = 72 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: "#E8EAFF",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    {/* Simple person silhouette */}
    <View
      style={{
        width: size * 0.38,
        height: size * 0.38,
        borderRadius: (size * 0.38) / 2,
        backgroundColor: "#5669FF",
        marginBottom: 2,
      }}
    />
    <View
      style={{
        width: size * 0.6,
        height: size * 0.36,
        borderTopLeftRadius: (size * 0.6) / 2,
        borderTopRightRadius: (size * 0.6) / 2,
        backgroundColor: "#5669FF",
      }}
    />
  </View>
);

// ─── Menu Item ───────────────────────────────────────────────────────────────

const MenuItem = ({ icon, label, onPress, showArrow = true, rightContent }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuIconWrap}>{icon}</View>
    <Text
      text={label}
      size={15}
      weight="500"
      color={appColors.text}
      style={{ flex: 1 }}
    />
    {rightContent ? (
      rightContent
    ) : showArrow ? (
      <Text
        text="›"
        size={22}
        color={appColors.textSecondary}
        style={{ marginTop: -2 }}
      />
    ) : null}
  </TouchableOpacity>
);

// ─── Main Screen ─────────────────────────────────────────────────────────────

export const MenuScreen = ({ onNavigateBack, onNavigateTo }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={appColors.white} />

      {/* Header */}
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onNavigateBack}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Text
              text="‹"
              size={28}
              color={appColors.text}
              style={{ marginTop: -4 }}
            />
          </TouchableOpacity>
          <Text text="Profile" size={18} weight="700" color={appColors.text} />
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <AvatarPlaceholder size={80} />
            {/* Online badge */}
            <View style={styles.onlineBadge} />
          </View>
          <Space height={12} />
          <Text
            text="Andrew Ainsley"
            size={20}
            weight="700"
            color={appColors.text}
          />
          <Space height={4} />
          <Text
            text="andrew_ainsley@yourdomain.com"
            size={13}
            color={appColors.textSecondary}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu Items Group 1 */}
        <View style={styles.menuGroup}>
          <MenuItem
            icon={<IconProfile color={appColors.primary} size={22} />}
            label="My Profile"
            onPress={() => onNavigateTo && onNavigateTo("profile")}
          />
          <MenuItem
            icon={<IconMessage color={appColors.primary} size={22} />}
            label="Message"
            onPress={() => onNavigateTo && onNavigateTo("message")}
          />
          <MenuItem
            icon={<IconBookmark color={appColors.primary} size={22} />}
            label="Bookmarks"
            onPress={() => onNavigateTo && onNavigateTo("bookmarks")}
          />
          <MenuItem
            icon={<IconCalendar color={appColors.primary} size={22} />}
            label="Calender"
            onPress={() => onNavigateTo && onNavigateTo("calender")}
          />
          <MenuItem
            icon={<IconMail color={appColors.primary} size={22} />}
            label="Contact Us"
            onPress={() => onNavigateTo && onNavigateTo("contact")}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu Items Group 2 */}
        <View style={styles.menuGroup}>
          <MenuItem
            icon={<IconSettings color={appColors.primary} size={22} />}
            label="Settings"
            onPress={() => onNavigateTo && onNavigateTo("settings")}
          />
          <MenuItem
            icon={<IconHelp color={appColors.primary} size={22} />}
            label="Help Center"
            onPress={() => onNavigateTo && onNavigateTo("help")}
          />
          <MenuItem
            icon={<IconMoon color={appColors.primary} size={22} />}
            label="Dark Mode"
            showArrow={false}
            rightContent={
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: "#E4DFDF", true: appColors.primary }}
                thumbColor={appColors.white}
                ios_backgroundColor="#E4DFDF"
              />
            }
          />
        </View>

        <Space height={24} />

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={() => onNavigateTo && onNavigateTo("logout")}
        >
          <View style={styles.logoutIconWrap}>
            <IconLogout color={appColors.danger} size={20} />
          </View>
          <Text text="Logout" size={15} weight="600" color={appColors.danger} />
        </TouchableOpacity>

        <Space height={40} />
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  safeHeader: {
    backgroundColor: appColors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Profile
  profileSection: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  avatarWrapper: {
    position: "relative",
  },
  onlineBadge: {
    position: "absolute",
    bottom: 3,
    right: 3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#29D697",
    borderWidth: 2,
    borderColor: appColors.white,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#F5F5F5",
    marginHorizontal: 0,
  },

  // Menu
  menuGroup: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  // Logout
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#FFF0EF",
  },
  logoutIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFE0DE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
});
