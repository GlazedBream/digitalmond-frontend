import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Alert, // Alert import
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useQuery } from "@tanstack/react-query";
import TopBar from "../components/TopBar";
import Tab1 from "./ExploreDetailTabs/Tab1";
import Tab2 from "./ExploreDetailTabs/Tab2";
import Tab3 from "./ExploreDetailTabs/Tab3";
import Tab4 from "./ExploreDetailTabs/Tab4";
import colors from "../styles/colors";
import { citiesData } from "../data/cities";
import { AuthContext } from "../context/AuthContext"; // AuthContext import

const ExploreDetail = ({ route, navigation }) => {
  const { cardId } = route.params;
  const layout = useWindowDimensions();
  const { authState, updateUserCityId } = useContext(AuthContext); // AuthContext 사용

  console.log("ExploreDetail - cardId:", cardId);

  const {
    data: cityData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["city", cardId],
    queryFn: () => {
      const foundCity = citiesData.cities.find((city) => city.id === cardId);
      console.log("ExploreDetail - cityData from queryFn:", foundCity);
      return foundCity;
    },
  });

  console.log("ExploreDetail - cityData (after query):");
  console.log(cityData);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tab1", title: "기본 정보" },
    { key: "tab2", title: "주요 관광지" },
    { key: "tab3", title: "지역 축제" },
    { key: "tab4", title: "통계" },
  ]);

  // isJoined 상태를 authState.user.city_id와 연동
  const isJoined = authState.user?.city_id === cardId;

  const handleJoinToggle = () => {
    if (isJoined) {
      // 이미 참가 중인 경우, 참가 취소 (city_id를 null로 설정)
      updateUserCityId(null);
    } else {
      // 참가 중인 도시가 없는 경우
      if (!authState.user?.city_id) {
        updateUserCityId(cardId);
      } else {
        // 다른 도시에 참가 중인 경우
        const currentCity = citiesData.cities.find(
          (city) => city.id === authState.user.city_id
        );
        const currentCityName = currentCity
          ? currentCity.name
          : "알 수 없는 도시";
        Alert.alert(
          "다른 도시에 참가 중",
          `${currentCityName}에 참가 중입니다. 먼저 참가 취소해주세요.`,
          [{ text: "확인", onPress: () => console.log("Alert 확인 버튼 클릭") }]
        );
      }
    }
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
    tab1: () => (cityData ? <Tab1 cityData={cityData} /> : <View />),
    tab2: () => (cityData ? <Tab2 cityData={cityData} /> : <View />),
    tab3: () => (cityData ? <Tab3 cityData={cityData} /> : <View />),
    tab4: () => (cityData ? <Tab4 cityData={cityData} /> : <View />),
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
    backgroundColor: colors.background,
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
