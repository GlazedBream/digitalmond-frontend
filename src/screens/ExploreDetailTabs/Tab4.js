import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const Tab4 = ({ cityData }) => (
  <View style={styles.container}>
    <Text style={styles.title}>통계</Text>
    <Text style={styles.content}>이곳은 {cityData?.name}에 대한 다양한 통계 데이터를 보여주는 탭입니다.</Text>
    <Text style={styles.content}>인구, 경제, 환경 등 상세 정보를 확인할 수 있습니다.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
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