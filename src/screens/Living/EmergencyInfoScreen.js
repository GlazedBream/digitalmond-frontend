import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import TopBar from '../../components/TopBar';
import { useNavigation } from '@react-navigation/native';

const EmergencyInfoScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopBar title="긴급 정보" onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.text}>긴급 정보</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

export default EmergencyInfoScreen;
