import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import colors from '../../styles/colors';
import { touristSpotsData } from '../../data/touristSpots';

const Tab2 = ({ cityData }) => {
  const cityTouristSpots = touristSpotsData.filter(spot => spot.cityId === cityData?.id);

  const renderItem = ({ item }) => (
    <View style={styles.spotItem}>
      <Image source={item.image} style={styles.spotImage} />
      <View style={styles.spotContent}>
        <Text style={styles.spotName}>{item.name}</Text>
        <Text style={styles.spotDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주요 관광지</Text>
      {cityTouristSpots.length > 0 ? (
        <FlatList
          data={cityTouristSpots}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noDataText}>해당 도시의 주요 관광지 정보가 없습니다.</Text>
      )}
    </View>
  );
};

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
  listContent: {
    paddingBottom: 20,
  },
  spotItem: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  spotImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  spotContent: {
    padding: 15,
  },
  spotName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  spotDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  noDataText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Tab2;