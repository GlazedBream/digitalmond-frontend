import React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import FlippableCard from '../components/FlippableCard';
import globalStyles from '../styles/globalStyles';
import { getCities } from '../api/cities';
import colors from '../styles/colors';

const ExploreScreen = ({ navigation }) => {
  const { data: cities, isLoading, isError, error } = useQuery({
    queryKey: ['cities'],
    queryFn: getCities,
  });

  // --- DEBUG --- //
  console.log('isLoading:', isLoading);
  console.log('isError:', isError);
  if (cities) {
    console.log('Cities Data:', JSON.stringify(cities, null, 2));
  }
  if (error) {
    console.log('Error:', error.message);
  }
  // --- END DEBUG --- //

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cities?.cities} // API 응답 객체 안의 cities 배열을 전달
        renderItem={({ item }) => (
          <FlippableCard navigation={navigation} cardData={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
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