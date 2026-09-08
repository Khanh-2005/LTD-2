// import React from "react";
// import {
//   Image,
//   ImageBackground,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { appColors } from "../constants/appColors";
// import Svg, { Path } from "react-native-svg";

// const BackIcon = () => (
//   <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M15 6 9 12l6 6"
//       stroke={appColors.text}
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M9 12h11"
//       stroke={appColors.text}
//       strokeWidth={2}
//       strokeLinecap="round"
//     />
//   </Svg>
// );

// const MAP_EVENTS = [
//   {
//     image: require("../assets/images/event4.png"),
//     color: "#F45C6A",
//     style: "markerOne",
//   },
//   {
//     image: require("../assets/images/event5.png"),
//     color: "#5D6EF4",
//     style: "markerTwo",
//   },
//   {
//     image: require("../assets/images/event3.png"),
//     color: "#35C8E6",
//     style: "markerThree",
//   },
//   {
//     image: require("../assets/images/event2.png"),
//     color: "#36CFA4",
//     style: "markerFour",
//   },
//   {
//     image: require("../assets/images/event6.png"),
//     color: "#5669FF",
//     style: "markerFive",
//   },
// ];

// const MapScreen = ({ navigation }) => (
//   <View style={styles.screen}>
//     <StatusBar style="dark" />
//     <ImageBackground
//       source={require("../assets/images/map_view.png")}
//       style={styles.map}
//       imageStyle={styles.mapImage}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <View style={[styles.topControls, { marginTop: 20 }]}>
//           <TouchableOpacity
//             accessibilityLabel="Go back"
//             onPress={() => navigation?.navigate("home")}
//             style={styles.backButton}
//           >
//             <BackIcon />
//           </TouchableOpacity>
//           <View style={styles.searchBox}>
//             <Image
//               source={require("../assets/images/search.png")}
//               style={styles.searchIcon}
//             />
//             <TextInput
//               placeholder="Find for food or restaurant..."
//               placeholderTextColor="#B7B6BE"
//               style={styles.searchInput}
//             />
//             <Image
//               source={require("../assets/images/GPS_icon.png")}
//               style={styles.gpsIcon}
//             />
//           </View>
//         </View>

//         <View style={styles.categories}>
//           <Category
//             label="Sports"
//             color="#F45C6A"
//             source={require("../assets/images/ball_icon.png")}
//           />
//           <Category
//             label="Music"
//             color="#6473F4"
//             source={require("../assets/images/music_icon.png")}
//           />
//           <Category
//             label="Food"
//             color="#25CFA0"
//             source={require("../assets/images/food_icon.png")}
//           />
//           <Category
//             label="Art"
//             color="#F2B648"
//             source={require("../assets/images/filter.png")}
//           />
//         </View>

//         {MAP_EVENTS.map((event, index) => (
//           <View
//             key={index}
//             style={[
//               styles.marker,
//               styles[event.style],
//               { backgroundColor: event.color },
//             ]}
//           >
//             <Image source={event.image} style={styles.markerImage} />
//           </View>
//         ))}

//         <TouchableOpacity
//           style={styles.currentLocation}
//           accessibilityLabel="Current location"
//         >
//           <Image
//             source={require("../assets/images/GPS_icon.png")}
//             style={styles.currentLocationIcon}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={() =>
//             navigation?.navigate("event-detail", {
//               event: {
//                 image: require("../assets/images/event4.png"),
//                 title: "Jo Malon London’s Mother’s Day Presents",
//                 date: "28 April, 2021",
//                 time: "Wednesday, 5:30PM - 8:00PM",
//                 location: "Radius Gallery",
//                 address: "Santa Cruz, CA",
//               },
//             })
//           }
//           style={styles.eventPreview}
//         >
//           <Image
//             source={require("../assets/images/event4.png")}
//             style={styles.previewImage}
//           />
//           <View style={styles.previewCopy}>
//             <Text style={styles.previewDate}>Wed, Apr 28 • 5:30 PM</Text>
//             <Text style={styles.previewTitle} numberOfLines={2}>
//               Jo Malon London’s Mother’s Day Presents
//             </Text>
//             <View style={styles.previewLocation}>
//               <Image
//                 source={require("../assets/images/Location.png")}
//                 style={styles.previewLocationIcon}
//               />
//               <Text style={styles.previewLocationText}>
//                 Radius Gallery • Santa Cruz, CA
//               </Text>
//             </View>
//           </View>
//           <Image
//             source={require("../assets/images/like.png")}
//             style={styles.previewBookmark}
//           />
//         </TouchableOpacity>
//       </SafeAreaView>
//     </ImageBackground>
//   </View>
// );

// const Category = ({ label, color, icon }) => (
//   <View style={styles.category}>
//     <Text style={[styles.categoryIcon, { color }]}>{icon}</Text>
//     <Text style={styles.categoryText}>{label}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   screen: { backgroundColor: "#DCDCDC", flex: 1 },
//   map: { flex: 1, overflow: "hidden" },
//   mapImage: { opacity: 0.82, resizeMode: "cover" },
//   safeArea: { flex: 1, paddingHorizontal: 14 },
//   topControls: { alignItems: "center", flexDirection: "row", paddingTop: 8 },
//   backButton: {
//     alignItems: "center",
//     backgroundColor: appColors.white,
//     borderRadius: 9,
//     height: 38,
//     justifyContent: "center",
//     marginRight: 7,
//     width: 32,
//   },
//   backIcon: { color: appColors.text, fontSize: 30, lineHeight: 30 },
//   searchBox: {
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.95)",
//     borderRadius: 9,
//     flex: 1,
//     flexDirection: "row",
//     height: 38,
//     paddingHorizontal: 9,
//   },
//   searchIcon: { height: 15, marginRight: 7, tintColor: "#A4A2AC", width: 15 },
//   searchInput: { color: appColors.text, flex: 1, fontSize: 10, height: "100%" },
//   gpsIcon: { height: 17, tintColor: appColors.primary, width: 17 },
//   categories: { flexDirection: "row", gap: 7, marginTop: 10 },
//   category: {
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.94)",
//     borderRadius: 14,
//     flexDirection: "row",
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   categoryIcon: { fontSize: 12, marginRight: 5 },
//   categoryText: { color: "#858397", fontSize: 10 },
//   marker: {
//     alignItems: "center",
//     borderColor: appColors.white,
//     borderRadius: 8,
//     borderWidth: 2,
//     height: 24,
//     justifyContent: "center",
//     position: "absolute",
//     width: 24,
//   },
//   markerIcon: { color: appColors.white, fontSize: 12, fontWeight: "700" },
//   markerOne: { left: "20%", top: "54%" },
//   markerTwo: { left: "27%", top: "35%" },
//   markerThree: { left: "62%", top: "40%" },
//   markerFour: { left: "58%", top: "26%" },
//   markerFive: { right: "8%", top: "68%" },
//   currentLocation: {
//     alignItems: "center",
//     backgroundColor: appColors.white,
//     borderRadius: 17,
//     bottom: 140,
//     elevation: 3,
//     height: 34,
//     justifyContent: "center",
//     position: "absolute",
//     right: 15,
//     width: 34,
//   },
//   currentLocationIcon: { height: 20, tintColor: appColors.primary, width: 20 },
//   eventPreview: {
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.96)",
//     borderRadius: 13,
//     bottom: 22,
//     flexDirection: "row",
//     left: 14,
//     padding: 7,
//     position: "absolute",
//     right: 14,
//   },
//   previewImage: { borderRadius: 9, height: 58, width: 56 },
//   previewCopy: { flex: 1, marginLeft: 10, minWidth: 0 },
//   previewDate: { color: appColors.primary, fontSize: 9, marginBottom: 3 },
//   previewTitle: {
//     color: appColors.text,
//     fontSize: 11,
//     fontWeight: "700",
//     lineHeight: 14,
//   },
//   previewLocation: { alignItems: "center", flexDirection: "row", marginTop: 3 },
//   previewLocationIcon: {
//     height: 11,
//     marginRight: 3,
//     tintColor: "#AAA8B3",
//     width: 11,
//   },
//   previewLocationText: { color: "#858397", flex: 1, fontSize: 8 },
//   previewBookmark: {
//     height: 16,
//     marginLeft: 6,
//     tintColor: "#ED6671",
//     width: 16,
//   },
// });

// export default MapScreen;
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
const MAP_EVENTS = [
  {
    image: require("../assets/images/ball_icon.png"),
    color: "#F45C6A",
    style: "markerOne",
  },
  {
    image: require("../assets/images/music_icon.png"),
    color: "#5D6EF4",
    style: "markerTwo",
  },
  {
    image: require("../assets/images/food_icon.png"),
    color: "#35C8E6",
    style: "markerThree",
  },
  {
    image: require("../assets/images/music_icon.png"),
    color: "#5D6EF4",
    style: "markerFour",
  },
  {
    image: require("../assets/images/food_icon.png"),
    color: "#35C8E6",
    style: "markerFive",
  },
];

const MapScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <StatusBar style="dark" />
    <ImageBackground
      source={require("../assets/images/map_view.png")}
      style={styles.map}
      imageStyle={styles.mapImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.topControls, { marginTop: 20 }]}>
          <TouchableOpacity
            accessibilityLabel="Go back"
            onPress={() => navigation?.navigate("home")}
            style={styles.backButton}
          >
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <Image
              source={require("../assets/images/search.png")}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Find for food or restaurant..."
              placeholderTextColor="#B7B6BE"
              style={styles.searchInput}
            />
            <Image
              source={require("../assets/images/GPS_icon.png")}
              style={styles.gpsIcon}
            />
          </View>
        </View>

        <View style={styles.categories}>
          <Category
            label="Sports"
            color="#F45C6A"
            source={require("../assets/images/ball_icon.png")}
          />
          <Category
            label="Music"
            color="#6473F4"
            source={require("../assets/images/music_icon.png")}
          />
          <Category
            label="Food"
            color="#25CFA0"
            source={require("../assets/images/food_icon.png")}
          />
        </View>

        {MAP_EVENTS.map((event, index) => (
          <View
            key={index}
            style={[
              styles.marker,
              styles[event.style],
              { backgroundColor: event.color },
            ]}
          >
            <Image source={event.image} style={styles.markerImage} />
          </View>
        ))}

        <TouchableOpacity
          style={styles.currentLocation}
          accessibilityLabel="Current location"
        >
          <Image
            source={require("../assets/images/filter.png")}
            style={styles.currentLocationIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation?.navigate("event-detail", {
              event: {
                image: require("../assets/images/event4.png"),
                title: "Jo Malon London's Mother's Day Presents",
                date: "28 April, 2021",
                time: "Wednesday, 5:30PM - 8:00PM",
                location: "Radius Gallery",
                address: "Santa Cruz, CA",
              },
            })
          }
          style={[styles.eventPreview, { marginBottom: 20 }]}
        >
          <Image
            source={require("../assets/images/event4.png")}
            style={styles.previewImage}
          />
          <View style={styles.previewCopy}>
            <Text style={styles.previewDate}>Wed, Apr 28 • 5:30 PM</Text>
            <Text style={styles.previewTitle} numberOfLines={2}>
              Jo Malon London's Mother's Day Presents
            </Text>
            <View style={styles.previewLocation}>
              <Image
                source={require("../assets/images/Location.png")}
                style={styles.previewLocationIcon}
              />
              <Text style={styles.previewLocationText}>
                Radius Gallery • Santa Cruz, CA
              </Text>
            </View>
          </View>
          <Image
            source={require("../assets/images/like.png")}
            style={styles.previewBookmark}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  </View>
);

const Category = ({ label, color, source }) => (
  <View style={styles.category}>
    <Image
      source={source}
      style={[styles.categoryIcon, { tintColor: color }]}
    />
    <Text style={styles.categoryText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: "#DCDCDC", flex: 1 },
  map: { flex: 1, overflow: "hidden" },
  mapImage: { opacity: 0.82, resizeMode: "cover" },
  safeArea: { flex: 1, paddingHorizontal: 14 },
  topControls: { alignItems: "center", flexDirection: "row", paddingTop: 8 },
  backButton: {
    alignItems: "center",
    backgroundColor: appColors.white,
    borderRadius: 9,
    height: 38,
    justifyContent: "center",
    marginRight: 7,
    width: 32,
  },
  backIcon: {
    height: 18,
    tintColor: appColors.text,
    transform: [{ rotate: "-90deg" }],
    width: 18,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 9,
    flex: 1,
    flexDirection: "row",
    height: 38,
    paddingHorizontal: 9,
  },
  searchIcon: { height: 15, marginRight: 7, tintColor: "#A4A2AC", width: 15 },
  searchInput: { color: appColors.text, flex: 1, fontSize: 10, height: "100%" },
  gpsIcon: { height: 17, tintColor: appColors.primary, width: 17 },
  categories: { flexDirection: "row", gap: 7, marginTop: 10 },
  category: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 14,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryIcon: { height: 13, marginRight: 5, width: 13 },
  categoryText: { color: "#858397", fontSize: 10 },
  marker: {
    alignItems: "center",
    borderColor: appColors.white,
    borderRadius: 8,
    borderWidth: 2,
    height: 24,
    justifyContent: "center",
    position: "absolute",
    width: 24,
  },
  markerImage: { borderRadius: 5, height: 17, width: 17 },
  markerOne: { left: "20%", top: "54%" },
  markerTwo: { left: "27%", top: "35%" },
  markerThree: { left: "62%", top: "40%" },
  markerFour: { left: "58%", top: "26%" },
  markerFive: { right: "8%", top: "68%" },
  currentLocation: {
    alignItems: "center",
    backgroundColor: appColors.white,
    borderRadius: 17,
    bottom: 140,
    elevation: 3,
    height: 34,
    justifyContent: "center",
    position: "absolute",
    right: 15,
    width: 34,
  },
  currentLocationIcon: { height: 20, tintColor: appColors.primary, width: 20 },
  eventPreview: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 13,
    bottom: 22,
    flexDirection: "row",
    left: 14,
    padding: 7,
    position: "absolute",
    right: 14,
  },
  previewImage: { borderRadius: 9, height: 58, width: 56 },
  previewCopy: { flex: 1, marginLeft: 10, minWidth: 0 },
  previewDate: { color: appColors.primary, fontSize: 9, marginBottom: 3 },
  previewTitle: {
    color: appColors.text,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
  previewLocation: { alignItems: "center", flexDirection: "row", marginTop: 3 },
  previewLocationIcon: {
    height: 11,
    marginRight: 3,
    tintColor: "#AAA8B3",
    width: 11,
  },
  previewLocationText: { color: "#858397", flex: 1, fontSize: 8 },
  previewBookmark: {
    height: 16,
    marginLeft: 6,
    tintColor: "#ED6671",
    width: 16,
  },
});

export default MapScreen;
