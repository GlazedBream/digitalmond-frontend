import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FlippableCard from '../components/FlippableCard';
import globalStyles from '../styles/globalStyles';

const data = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
];

const ExploreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <FlippableCard navigation={navigation} cardId={item.id} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 50,
    backgroundColor: globalStyles.container.backgroundColor,
  },
  list: {
    justifyContent: 'center',
  },
});

export default ExploreScreen;