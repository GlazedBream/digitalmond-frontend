import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlippableCard from "../components/FlippableCard";
import globalStyles from "../styles/globalStyles";
import { citiesData } from "../data/cities";
import colors from "../styles/colors";

const ExploreScreen = ({ navigation }) => {
  const {
    data: initialCities,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: () => citiesData,
  });

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const loadLikedCities = async () => {
      if (initialCities) {
        try {
          const likedCities = await AsyncStorage.getItem("likedCities");
          const likedCityIds = likedCities ? JSON.parse(likedCities) : [];

          const updatedCities = initialCities.cities.map((city) => ({
            ...city,
            liked: likedCityIds.includes(city.id),
          }));

          updatedCities.sort((a, b) => {
            if (a.liked !== b.liked) {
              return b.liked - a.liked; // Liked items come first
            }
            return a.id - b.id; // Then sort by id
          });
          setCities(updatedCities);
          updatedCities.forEach((city) => {
            if (Array.isArray(city.imageUrls)) {
              city.imageUrls.forEach((url) => {
                if (typeof url === "string") {
                  Image.prefetch(url);
                }
              });
            }
          });
        } catch (e) {
          console.error("Failed to load liked cities.", e);
          setCities(initialCities.cities);
        }
      }
    };

    loadLikedCities();
  }, [initialCities]);

  const handleLike = useCallback(
    async (cityId) => {
      try {
        const updatedCities = cities.map((city) =>
          city.id === cityId ? { ...city, liked: !city.liked } : city
        );

        updatedCities.sort((a, b) => {
          if (a.liked !== b.liked) {
            return b.liked - a.liked; // Liked items come first
          }
          return a.id - b.id; // Then sort by id
        });
        setCities(updatedCities);

        const likedCityIds = updatedCities
          .filter((city) => city.liked)
          .map((city) => city.id);
        await AsyncStorage.setItem("likedCities", JSON.stringify(likedCityIds));
      } catch (e) {
        console.error("Failed to save liked cities.", e);
      }
    },
    [cities]
  );

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
        data={cities}
        renderItem={({ item }) => (
          <FlippableCard
            navigation={navigation}
            cardData={item}
            onLike={handleLike}
            isLiked={item.liked}
          />
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
    justifyContent: "center",
  },
});

export default ExploreScreen;
