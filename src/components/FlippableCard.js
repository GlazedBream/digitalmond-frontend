import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Fontisto } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../styles/colors";

const weatherIcons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

import { city02Images } from "../../assets/images";

const cardImages = {
  2: city02Images,
  // Add more cities here as needed
};

const FlippableCard = ({ navigation, cardData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const images = cardImages[cardData.id];
    if (images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [cardData.id]); // Reset interval when cardId changes

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsLiked(!isLiked);
  };

  const handleDetailPress = () => {
    navigation.navigate("ExploreDetail", { cardId: cardData.id });
  };

  const renderIndicators = () => {
    const indicators = [
      { name: "test1", value: 0.7 },
      { name: "test2", value: 0.5 },
      { name: "test3", value: 0.9 },
      { name: "test4", value: 0.3 },
      { name: "DN Score", value: cardData.dnScore / 100 }, // dnScore를 0-1 범위로 변환
    ];

    const getGaugeColor = (value) => {
      if (value >= 0.7) {
        return colors.success;
      }
      if (value >= 0.4) {
        return colors.warning;
      }
      return colors.error;
    };

    return (
      <View style={styles.indicatorsContainer}>
        {indicators.map((indicator, index) => (
          <View key={index} style={styles.indicatorRow}>
            <Text style={styles.indicatorName}>{indicator.name}</Text>
            <View style={styles.gaugeBackground}>
              <View
                style={[
                  styles.gaugeFill,
                  {
                    width: `${indicator.value * 100}%`,
                    backgroundColor: getGaugeColor(indicator.value),
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={handleFlip}
      activeOpacity={1}
      style={[styles.cardContainer, isLiked && styles.likedBorder]}
    >
      <ImageBackground
        source={
          cardImages[cardData.id]
            ? cardImages[cardData.id][currentImageIndex]
            : null
        }
        style={[
          styles.card,
          styles.cardFront,
          { opacity: isFlipped ? 0 : 1 },
          isLiked && styles.compensatedCard,
        ]} // compensatedCard 적용
        resizeMode="cover"
      >
        <View style={styles.cardFrontOverlay} />
        <View style={styles.cardFrontTopRow}>
          <View />
          <View style={styles.internetContainer}>
            <AntDesign name="wifi" size={24} color={colors.textOnPrimary} />
            <View style={styles.internetTextContainer}>
              <Text style={styles.internetSpeed}>100</Text>
              <Text style={styles.internetUnit}>Mbps</Text>
            </View>
          </View>
        </View>
        <View style={styles.centerTextContainer}>
          <Text style={styles.provinceText}>{cardData.country}</Text>
          <Text style={styles.cityTextFront}>{cardData.name}</Text>
        </View>
        <View style={styles.cardFrontBottomRow}>
          <View style={styles.weatherContainer}>
            <Fontisto
              name={weatherIcons["Clear"]} // Example usage, replace with actual weather data
              size={20}
              color={colors.textOnPrimary}
            />
            <View style={styles.temperatureContainer}>
              <Text style={styles.feelsLikeTemp}>
                체감 35
                <MaterialCommunityIcons
                  name="temperature-celsius"
                  size={10}
                  color={colors.textOnPrimary}
                />
              </Text>
              <Text style={styles.actualTemp}>
                32
                <MaterialCommunityIcons
                  name="temperature-celsius"
                  size={14}
                  color={colors.textOnPrimary}
                />
              </Text>
            </View>
          </View>
          <View style={styles.costContainer}>
            <Text style={styles.costAmount}>$2,000/mo</Text>
            <Text style={styles.costLabel}>FOR A NOMAD</Text>
          </View>
        </View>
      </ImageBackground>

      <View
        style={[
          styles.card,
          styles.cardBack,
          { opacity: isFlipped ? 1 : 0 },
          isLiked && styles.compensatedCard,
        ]} // compensatedCard 적용
      >
        {renderIndicators()}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={24}
              color={isLiked ? colors.like : colors.textPrimary}
            />
          </TouchableOpacity>
          <Text style={styles.cityName}>{cardData.name}</Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              handleDetailPress();
            }}
            style={styles.detailButton}
          >
            <AntDesign name="enter" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "48%",
    aspectRatio: 0.8,
    margin: "1%",
    borderRadius: 30, // cardContainer에서 이동
    overflow: "hidden", // cardContainer에서 이동
  },
  likedBorder: {
    borderWidth: 4,
    borderColor: colors.like,
  },
  card: {
    flex: 1,
    padding: 15,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  compensatedCard: {
    margin: -4, // 테두리 굵기만큼 음수 마진
  },
  cardFront: {
    justifyContent: "space-between",
  },
  cardFrontOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", // Semi-transparent overlay
  },
  cardBack: {
    backgroundColor: colors.tabBarBackground,
    justifyContent: "space-between",
  },

  cardFrontTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  internetContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  internetTextContainer: {
    marginLeft: 8,
    alignItems: "center",
  },
  internetSpeed: {
    color: colors.textOnPrimary,
    fontWeight: "bold",
    fontSize: 16,
  },
  internetUnit: {
    color: colors.textOnPrimary,
    fontSize: 12,
  },
  centerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  provinceText: {
    fontSize: 18,
    color: colors.textOnPrimary,
  },
  cityTextFront: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textOnPrimary,
  },
  cardFrontBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1, // Allow this container to shrink
    marginRight: 10, // Add margin to create space
  },
  temperatureContainer: {
    marginLeft: 6,
  },
  feelsLikeTemp: {
    fontSize: 10,
    color: colors.textOnPrimary,
  },
  actualTemp: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textOnPrimary,
  },
  costContainer: {
    alignItems: "flex-end",
  },
  costAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textOnPrimary,
  },
  costLabel: {
    fontSize: 10,
    color: colors.textOnPrimary,
  },
  // Back Card Styles
  indicatorsContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "space-around",
  },
  indicatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  indicatorName: {
    width: "30%",
    fontSize: 14,
    color: colors.textPrimary,
  },
  gaugeBackground: {
    flex: 1,
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 5,
    overflow: "hidden",
  },
  gaugeFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
  },
  likeButton: {
    padding: 5,
  },
  cityName: {
    flex: 1, // 중앙 차지를 위해 flex: 1 추가
    textAlign: "center", // 텍스트 중앙 정렬
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  detailButton: {
    padding: 5,
  },
});

export default FlippableCard;
