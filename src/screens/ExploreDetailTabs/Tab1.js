import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const Tab1 = ({ cityData }) => (
  <View style={styles.container}>
    <Text style={styles.title}>기본 정보</Text>
    <View style={styles.infoContainer}>
      <Text style={styles.label}>이름:</Text>
      <Text style={styles.value}>{cityData?.name}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.label}>국가:</Text>
      <Text style={styles.value}>{cityData?.country}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.label}>설명:</Text>
      <Text style={styles.value}>{cityData?.description}</Text>
    </View>
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
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 80,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 18,
    flex: 1,
    color: colors.textPrimary,
  },
});

export default Tab1;
