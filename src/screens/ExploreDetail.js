import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import TopBar from "../components/TopBar"; // TopBar import
import Tab1 from "./ExploreDetailTabs/Tab1";
import Tab2 from "./ExploreDetailTabs/Tab2";
import Tab3 from "./ExploreDetailTabs/Tab3";
import Tab4 from "./ExploreDetailTabs/Tab4";
import Tab5 from "./ExploreDetailTabs/Tab5";
import colors from "../styles/colors";

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
      <TopBar
        onBackPress={() => navigation.goBack()}
        title={`City${cardId}`}
        rightComponent={
          <TouchableOpacity
            style={[
              styles.communityButton,
              isJoined ? styles.communityButtonJoined : null,
            ]}
            onPress={handleJoinToggle}
          >
            <Text style={styles.communityButtonText}>
              {isJoined ? "참가함" : "참가"}
            </Text>
          </TouchableOpacity>
        }
      />
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
    backgroundColor: colors.surface,
  },
  communityButton: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 5, // Adjust margin to fit within TopBar
    width: 70, // 고정 너비 추가
    alignItems: "center", // 텍스트 중앙 정렬을 위해 추가
  },
  communityButtonJoined: {
    backgroundColor: colors.secondary, // Lighter color when joined
  },
  communityButtonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  tabBar: {
    backgroundColor: colors.tabBarBackground,
    height: 50,
  },
  indicator: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: "bold",
    fontSize: 16,
  },
  tab: {
    width: 120,
  },
});

export default ExploreDetail;
