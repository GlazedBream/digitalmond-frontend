import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../styles/colors";
import { missionsData } from "../data/missions";
import { AuthContext } from "../context/AuthContext";
import { citiesData } from "../data/cities"; // citiesData import

const MissionScreen = () => {
  const navigation = useNavigation();
  const [missions, setMissions] = useState(missionsData);
  const { authState, updateUserPoint } = useContext(AuthContext); // authState 추가

  const currentCityId = authState.user?.city_id;
  const currentCity = currentCityId
    ? citiesData.cities.find((city) => city.id === currentCityId)
    : null;
  const currentCityName = currentCity
    ? currentCity.province + " " + currentCity.name
    : "";

  const toggleComplete = (id) => {
    setMissions(
      missions.map((mission) => {
        if (mission.id === id) {
          const newCompletedStatus = !mission.completed;
          if (newCompletedStatus) {
            updateUserPoint(mission.reward); // 미션 완료 시 포인트 추가
          } else {
            updateUserPoint(-mission.reward); // 미션 완료 취소 시 포인트 차감
          }
          return { ...mission, completed: newCompletedStatus };
        }
        return mission;
      })
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.missionItem}>
      <View style={styles.missionContent}>
        <Text
          style={[styles.missionTitle, item.completed && styles.completedText]}
        >
          {item.title}
        </Text>
        <Text style={styles.missionHint}>힌트: {item.hint}</Text>
        <Text style={styles.missionReward}>{item.reward} Almond</Text>
      </View>
      <View style={styles.missionButtons}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() =>
            navigation.navigate("MissionDetail", { mission: item })
          }
        >
          <Text style={styles.detailButtonText}>정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            item.completed ? styles.completedButton : styles.incompleteButton,
          ]}
          onPress={() => toggleComplete(item.id)}
        >
          <Text style={styles.buttonText}>
            {item.completed ? "완료됨" : "완료 확인"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={missions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // keyExtractor 수정
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.header}>
              {currentCityName
                ? `${currentCityName}에서 Almond 수집 중`
                : "Almond를 모아보세요!"}
            </Text>
            <Text style={styles.almondBalance}>
              보유 Almond: {authState.user?.point} Almonds
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  almondBalance: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  missionItem: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  missionContent: {
    flex: 1,
    marginRight: 10,
  },
  missionTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "bold",
    marginBottom: 5,
  },
  missionHint: {
    fontSize: 14,
    fontStyle: "italic",
    color: colors.secondary,
    marginBottom: 5,
  },
  missionReward: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
  missionButtons: {
    width: 80, // 고정 폭
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  detailButton: {
    backgroundColor: colors.inactiveTab,
    paddingVertical: 8,
    paddingHorizontal: 8, // 패딩 조정
    borderRadius: 20,
    marginBottom: 5,
  },
  detailButtonText: {
    color: colors.textOnPrimary,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 8, // 패딩 조정
    borderRadius: 20,
  },
  incompleteButton: {
    backgroundColor: colors.primary,
  },
  completedButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.textOnPrimary,
  },
});

export default MissionScreen;
