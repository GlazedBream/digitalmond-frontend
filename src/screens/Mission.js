import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import colors from '../styles/colors';

const initialMissions = [
  { id: '1', title: '가이드 미션: 체류 시작하기', completed: false },
  { id: '2', title: '현지 음식 체험: 안동 찜닭 먹기', completed: false },
  { id: '3', title: '이벤트 체험: 안동 국제 탈춤 페스티벌 방문', completed: false },
  { id: '4', title: '관광명소 방문: 하회마을 둘러보기', completed: false },
  { id: '5', title: '커뮤니티 활동: 첫 게시글 작성하기', completed: false },
];

const MissionScreen = () => {
  const [missions, setMissions] = useState(initialMissions);

  const toggleComplete = (id) => {
    setMissions(
      missions.map((mission) =>
        mission.id === id ? { ...mission, completed: !mission.completed } : mission
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.missionItem}>
      <Text style={[styles.missionTitle, item.completed && styles.completedText]}>
        {item.title}
      </Text>
      <TouchableOpacity 
        style={[styles.button, item.completed ? styles.completedButton : styles.incompleteButton]}
        onPress={() => toggleComplete(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.completed ? '완료 취소' : '완료 확인'}
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
        ListHeaderComponent={() => <Text style={styles.header}>Almond를 모아보세요!</Text>}
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
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  missionItem: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  missionTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1, // Ensure text wraps
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  incompleteButton: {
    backgroundColor: colors.primary,
  },
  completedButton: {
    backgroundColor: colors.grey,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default MissionScreen;
