import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const Tab3 = ({ cityData }) => (
  <View style={styles.container}>
    <Text style={styles.title}>커뮤니티</Text>
    <Text style={styles.content}>이곳은 {cityData?.name}의 커뮤니티 게시판입니다.</Text>
    <Text style={styles.content}>현지 거주자들과 소통하고 정보를 공유할 수 있습니다.</Text>
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

export default Tab3;