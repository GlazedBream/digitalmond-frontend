import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tab3 = () => (
  <View style={styles.container}>
    <Text>Tab 3 Content</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tab3;