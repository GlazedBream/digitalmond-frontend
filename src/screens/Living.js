import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

const menuItems = [
  { id: '1', title: '편의 정보', screen: 'ConvenienceInfo', color: colors.living.convenience },
  { id: '2', title: '긴급 정보', screen: 'EmergencyInfo', color: colors.living.emergency },
  { id: '3', title: '커뮤니티', screen: 'Community', color: colors.living.community },
  { id: '4', title: '예비', screen: 'ComingSoon', color: colors.living.comingSoon },
];

const LivingScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <FlatList
            data={menuItems}
            renderItem={renderItem}
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
    backgroundColor: colors.background,
    padding: 10,
  },
  list: {
    justifyContent: 'center',
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 10,
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // for Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

export default LivingScreen;
