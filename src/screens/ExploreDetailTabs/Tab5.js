import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tab5 = () => (
  <View style={styles.container}>
    <Text>Tab 5 Content</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tab5;