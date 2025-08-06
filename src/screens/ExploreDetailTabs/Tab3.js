import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import colors from '../../styles/colors';
import { localFestivalsData } from '../../data/localFestivals';

const Tab3 = ({ cityData }) => {
  const cityFestivals = localFestivalsData.filter(festival => festival.cityId === cityData?.id);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.festivalItem} onPress={() => item.link && Linking.openURL(item.link)}>
      <Text style={styles.festivalName}>{item.name}</Text>
      <Text style={styles.festivalDate}>{item.date}</Text>
      <Text style={styles.festivalDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>지역 축제</Text>
      {cityFestivals.length > 0 ? (
        <FlatList
          data={cityFestivals}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noDataText}>해당 도시의 지역 축제 정보가 없습니다.</Text>
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
  festivalItem: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  festivalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  festivalDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  festivalDescription: {
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

export default Tab3;