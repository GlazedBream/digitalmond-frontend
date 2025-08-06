import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const Tab4 = ({ cityData }) => (
  <View style={styles.container}>
    <Text style={styles.title}>미션</Text>
    <Text style={styles.content}>이곳은 {cityData?.name}에서 수행할 수 있는 미션 목록입니다.</Text>
    <Text style={styles.content}>미션을 완료하고 Almond를 획득하세요!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.textPrimary,
  },
  content: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 10,
  },
});

export default Tab4;