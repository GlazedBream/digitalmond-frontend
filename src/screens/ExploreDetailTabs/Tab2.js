import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const Tab2 = ({ cityData }) => (
  <View style={styles.container}>
    <Text style={styles.title}>생활 정보</Text>
    <Text style={styles.content}>이곳은 {cityData?.name}의 생활 정보를 보여주는 탭입니다.</Text>
    <Text style={styles.content}>대중교통, 편의시설, 의료기관 등의 정보를 제공할 예정입니다.</Text>
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

export default Tab2;