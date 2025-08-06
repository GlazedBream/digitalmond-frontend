import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import TopBar from '../components/TopBar';

const MissionDetailScreen = ({ route }) => {
  const { mission } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.fullContainer}>
      <TopBar
        onBackPress={() => navigation.goBack()}
        title={mission?.title || "미션 상세"}
      />
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>{mission?.title || ""}</Text>
        <Text style={styles.description}>{mission?.description || ""}</Text>
        <Text style={styles.hint}>힌트: {mission?.hint || ""}</Text>
        <Text style={styles.reward}>보상: {mission?.reward || 0} Almond</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.textPrimary,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.textSecondary,
  },
  hint: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.secondary,
    marginBottom: 10,
  },
  reward: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 10,
  },
});

export default MissionDetailScreen;