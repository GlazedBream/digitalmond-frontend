import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import colors from "../styles/colors";

import { missionsData } from "../data/missions";

const MissionScreen = () => {
  const [missions, setMissions] = useState(missionsData);

  const toggleComplete = (id) => {
    setMissions(
      missions.map((mission) =>
        mission.id === id
          ? { ...mission, completed: !mission.completed }
          : mission
      )
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
        <Text style={styles.missionDescription}>{item.description}</Text>
        <Text style={styles.missionHint}>힌트: {item.hint}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          item.completed ? styles.completedButton : styles.incompleteButton,
        ]}
        onPress={() => toggleComplete(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.completed ? " 완료 됨  " : "완료 확인"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={missions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <Text style={styles.header}>Almond를 모아보세요!</Text>
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
    marginBottom: 20,
    textAlign: "center",
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
    flex: 1, // Ensure text wraps
  },
  completedText: {
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
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
