import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useQuery } from "@tanstack/react-query";
import TopBar from "../components/TopBar"; // TopBar import
import Tab1 from "./ExploreDetailTabs/Tab1";
import Tab2 from "./ExploreDetailTabs/Tab2";
import Tab3 from "./ExploreDetailTabs/Tab3";
import Tab4 from "./ExploreDetailTabs/Tab4";
import Tab5 from "./ExploreDetailTabs/Tab5";
import colors from "../styles/colors";
import { getCityById } from "../api/cities";

const ExploreDetail = ({ route, navigation }) => {
  const { cardId } = route.params;
  const layout = useWindowDimensions();

  const {
    data: cityData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["city", cardId],
    queryFn: () => getCityById(cardId),
  });

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

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const renderScene = SceneMap({
    tab1: () => <Tab1 cityData={cityData} />,
    tab2: () => <Tab2 cityData={cityData} />,
    tab3: () => <Tab3 cityData={cityData} />,
    tab4: () => <Tab4 cityData={cityData} />,
    tab5: () => <Tab5 cityData={cityData} />,
  });

  return (
    <View style={styles.container}>
      <TopBar
        onBackPress={() => navigation.goBack()}
        title={cityData?.name}
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
            activeColor={colors.textPrimary} // 활성 탭 색상
            inactiveColor={colors.textSecondary} // 비활성 탭 색상
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
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
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
    color: colors.textSecondary,
    height: 50,
  },
  indicator: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.textSecondary, // 탭 라벨 색상을 textSecondary로 변경
    fontWeight: "bold",
    fontSize: 16,
  },
  tab: {
    width: 120,
  },
});

export default ExploreDetail;
