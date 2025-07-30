import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import TopBar from "../components/TopBar"; // TopBar import
import Tab1 from "./ExploreDetailTabs/Tab1";
import Tab2 from "./ExploreDetailTabs/Tab2";
import Tab3 from "./ExploreDetailTabs/Tab3";
import Tab4 from "./ExploreDetailTabs/Tab4";
import Tab5 from "./ExploreDetailTabs/Tab5";

const renderScene = SceneMap({
  tab1: Tab1,
  tab2: Tab2,
  tab3: Tab3,
  tab4: Tab4,
  tab5: Tab5,
});

const ExploreDetail = ({ route, navigation }) => {
  const { cardId } = route.params;
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tab1", title: "Tab1" },
    { key: "tab2", title: "Tab2" },
    { key: "tab3", title: "Tab3" },
    { key: "tab4", title: "Tab4" },
    { key: "tab5", title: "Tab5" },
  ]);

  const [isJoined, setIsJoined] = useState(false);

  const handleJoinToggle = () => {
    setIsJoined(!isJoined);
  };

  return (
    <View style={styles.container}>
      <TopBar onBackPress={() => navigation.goBack()} title={`City${cardId}`} />
      <TouchableOpacity
        style={[
          styles.communityButton,
          isJoined ? styles.communityButtonJoined : null,
        ]}
        onPress={handleJoinToggle}
      >
        <Text style={styles.communityButtonText}>
          {isJoined ? "지역 커뮤니티에 참가함" : "지역 커뮤니티 참가"}
        </Text>
      </TouchableOpacity>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            labelStyle={styles.label}
            tabStyle={styles.tab}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  communityButton: {
    backgroundColor: "#5A4632",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  communityButtonJoined: {
    backgroundColor: "#A0A0A0", // Lighter color when joined
  },
  communityButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabBar: {
    backgroundColor: "lightgray", // Changed to lightgray for visibility check
    height: 50, // Explicitly set height for visibility
  },
  indicator: {
    backgroundColor: "#5A4632",
  },
  label: {
    color: "black", // Changed to black for better visibility
    fontWeight: "bold",
    fontSize: 16, // Set a reasonable font size
  },
  tab: {
    width: 120, // Set a fixed width for each tab to enable scrolling
  },
});

export default ExploreDetail;
