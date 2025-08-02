import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import TopBar from '../../components/TopBar';
import { useNavigation } from '@react-navigation/native';

const ComingSoonScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopBar title="예비" onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.text}>Coming Soon</Text>
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

export default ComingSoonScreen;
