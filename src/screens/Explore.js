import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlippableCard from "../components/FlippableCard";
import globalStyles from "../styles/globalStyles";
import { citiesData } from "../data/cities";
import colors from "../styles/colors";
import FilterDropdown from "../components/FilterDropdown";
import { useFilter } from "../context/FilterContext";
import { Ionicons } from "@expo/vector-icons";

const ageGroupOptions = [
  { label: "20대 미만", value: "<20" },
  { label: "20대", value: "20s" },
  { label: "30대", value: "30s" },
  { label: "40대", value: "40s" },
  { label: "50대", value: "50s" },
  { label: "60대 이상", value: ">60" },
];

const companionOptions = [
  { label: "솔로", value: "solo" },
  { label: "커플", value: "couple" },
  { label: "가족", value: "family" },
];

const activityOptions = [
  { label: "조용함", value: "quiet" },
  { label: "중간", value: "medium" },
  { label: "활동적", value: "active" },
];

const preferenceOptions = [
  { label: "쾌적한 업무환경", value: "work_environment" },
  { label: "지역 체험", value: "local_experience" },
  { label: "자연 친화", value: "nature_friendly" },
  { label: "문화 예술", value: "culture_art" },
];

const ExploreScreen = ({ navigation }) => {
  const {
    ageGroup,
    setAgeGroup,
    companion,
    setCompanion,
    activityLevel,
    setActivityLevel,
    preference,
    setPreference,
  } = useFilter();
  const [activeFilter, setActiveFilter] = useState(null);

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
  const [likedCityIds, setLikedCityIds] = useState([]);

  useEffect(() => {
    const loadLikedCityIds = async () => {
      const storedLikedCities = await AsyncStorage.getItem("likedCities");
      if (storedLikedCities) {
        setLikedCityIds(JSON.parse(storedLikedCities));
      }
    };
    loadLikedCityIds();
  }, []);

  useEffect(() => {
    const applyFiltersAndSort = async () => {
      if (initialCities) {
        try {
          let processedCities = initialCities.cities.map((city) => ({
            ...city,
            liked: likedCityIds.includes(city.id),
          }));

          const calculateMatchScore = (city) => {
            let score = 0;
            if (ageGroup?.value && city.tags.includes(ageGroup.value)) score++;
            if (companion?.value && city.tags.includes(companion.value)) score++;
            if (preference?.value && city.tags.includes(preference.value)) score++;
            return score;
          };

          processedCities = processedCities.map(city => ({ ...city, matchScore: calculateMatchScore(city) }));

          // 활동성 필터 (기존 로직 유지)
          if (activityLevel && activityLevel.value) {
            processedCities = processedCities.filter(city => {
              const level = activityLevel.value;
              const activity = city.activityLevel;
              if (level === 'quiet') return activity < 33;
              if (level === 'medium') return activity >= 33 && activity < 66;
              if (level === 'active') return activity >= 66;
              return true;
            });
          }

          // 매치 점수가 0보다 큰 도시만 포함 (선택 안함 필터가 아닌 경우)
          // if (ageGroup?.value || companion?.value || preference?.value) {
          //   processedCities = processedCities.filter(city => city.matchScore > 0);
          // }

          // 정렬: 좋아요 여부 > 매치 점수 > ID
          processedCities.sort((a, b) => {
            if (a.liked !== b.liked) {
              return b.liked - a.liked; // Liked items come first
            }
            if (b.matchScore !== a.matchScore) {
              return b.matchScore - a.matchScore;
            }
            return a.id - b.id;
          });

          setCities(processedCities);
          console.log("4. processedCities (before setCities):");
          processedCities.forEach(city => console.log(`  ${city.name}: liked=${city.liked}, matchScore=${city.matchScore}`));
          console.log("5. Current Filters:", {
            ageGroup: ageGroup?.value,
            companion: companion?.value,
            activityLevel: activityLevel?.value,
            preference: preference?.value,
          });

        } catch (e) {
          console.error("Failed to load liked cities or apply filters.", e);
          setCities(initialCities.cities);
        }
      }
    };

    applyFiltersAndSort();
  }, [initialCities, ageGroup, companion, activityLevel, preference, likedCityIds]);

  const handleLike = useCallback(
    async (cityId) => {
      try {
        const newLikedCityIds = likedCityIds.includes(cityId)
          ? likedCityIds.filter((id) => id !== cityId)
          : [...likedCityIds, cityId];

        await AsyncStorage.setItem("likedCities", JSON.stringify(newLikedCityIds));
        setLikedCityIds(newLikedCityIds); // 상태 업데이트
      } catch (e) {
        console.error("Failed to save liked cities.", e);
      }
    },
    [likedCityIds] // 의존성 배열 수정
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
      <View style={styles.filterContainer}>
        <FilterDropdown
          label="연령대"
          iconName="person-outline"
          options={ageGroupOptions}
          selectedValue={ageGroup}
          onValueChange={setAgeGroup}
          isActive={activeFilter === 'ageGroup'}
          onToggle={() => setActiveFilter(activeFilter === 'ageGroup' ? null : 'ageGroup')}
        />
        <FilterDropdown
          label="동반자 여부"
          iconName="people-outline"
          options={companionOptions}
          selectedValue={companion}
          onValueChange={setCompanion}
          isActive={activeFilter === 'companion'}
          onToggle={() => setActiveFilter(activeFilter === 'companion' ? null : 'companion')}
        />
        <FilterDropdown
          label="활동성"
          iconName="walk-outline"
          options={activityOptions}
          selectedValue={activityLevel}
          onValueChange={setActivityLevel}
          isActive={activeFilter === 'activityLevel'}
          onToggle={() => setActiveFilter(activeFilter === 'activityLevel' ? null : 'activityLevel')}
        />
        <FilterDropdown
          label="선호"
          iconName="heart-outline"
          options={preferenceOptions}
          selectedValue={preference}
          onValueChange={setPreference}
          isActive={activeFilter === 'preference'}
          onToggle={() => setActiveFilter(activeFilter === 'preference' ? null : 'preference')}
        />
      </View>
      <FlatList
        style={styles.listContainer}
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
    backgroundColor: globalStyles.container.backgroundColor,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 5,
    paddingBottom: 10,
    zIndex: 1, // FlatList 위에 오도록 설정
  },
  listContainer: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 5,
    justifyContent: "center",
  },
});

export default ExploreScreen;