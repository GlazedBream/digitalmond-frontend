import React, { useState, useEffect, memo } from "react";
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
  cloudy: "cloudy",
  sunny: "day-sunny",
  "partly-cloudy": "cloudy",
  rainy: "rains",
  snow: "snow",
  // Add more mappings as needed
};

const FlippableCard = ({ navigation, cardData, onLike, isLiked }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [localImageIndex, setLocalImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalImageIndex((prev) => prev + 1);
    }, 3000); // 3초마다 전환

    return () => clearInterval(interval);
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onLike(cardData.id);
  };

  const handleDetailPress = () => {
    navigation.navigate("ExploreDetail", { cardId: cardData.id });
  };

  const renderIndicators = () => {
    const indicators = [
      { name: "Almond 인덱스", key: "almondIndex" },
      { name: "물가", key: "costLevel" },
      { name: "인터넷", key: "internetQuality" },
      { name: "업무 환경", key: "workEnvironment" },
      { name: "활동성", key: "activityLevel" },
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

    const getActivitySegment = (value) => {
      if (value < 0.33) return 0; // 조용함
      if (value < 0.66) return 1; // 중간
      return 2; // 활동적
    };

    return (
      <View style={styles.indicatorsContainer}>
        {indicators.map((indicator, index) => {
          const value = cardData[indicator.key] / 100; // 데이터는 0-100 범위라고 가정
          return (
            <View key={index} style={styles.indicatorWrapper}>
              <View style={styles.indicatorRow}>
                <Text style={styles.indicatorName}>{indicator.name}</Text>
                {indicator.key === "activityLevel" ? (
                  <View style={styles.activityGauge}>
                    {["조용함", "중간", "활동적"].map((label, i) => {
                      const isActive = getActivitySegment(value) === i;
                      return (
                        <View
                          key={label}
                          style={[
                            styles.activitySegment,
                            isActive && styles.activeSegment,
                          ]}
                        >
                          <Text
                            style={[
                              styles.segmentText,
                              isActive && styles.activeSegmentText,
                            ]}
                          >
                            {label}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <View style={styles.gaugeBackground}>
                    <View
                      style={[
                        styles.gaugeFill,
                        {
                          width: `${value * 100}%`,
                          backgroundColor: getGaugeColor(value),
                        },
                      ]}
                    />
                  </View>
                )}
              </View>
            </View>
          );
        })}
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
          cardData.imageUrls && cardData.imageUrls.length > 0
            ? cardData.imageUrls[localImageIndex % cardData.imageUrls.length]
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
          <View style={styles.weatherContainer}>
            <Fontisto
              name={weatherIcons[cardData.weatherIcon]} // Use weatherIcon from cardData
              size={24}
              color={colors.textOnPrimary}
            />
            <View style={styles.temperatureContainer}>
              <Text style={styles.feelsLikeTemp}>
                체감 {cardData.feelsLikeTemperature}
                <MaterialCommunityIcons
                  name="temperature-celsius"
                  size={10}
                  color={colors.textOnPrimary}
                />
              </Text>
              <Text style={styles.actualTemp}>
                {cardData.currentTemperature}
                <MaterialCommunityIcons
                  name="temperature-celsius"
                  size={14}
                  color={colors.textOnPrimary}
                />
              </Text>
            </View>
          </View>
          <View style={styles.internetContainer}>
            <AntDesign name="wifi" size={24} color={colors.textOnPrimary} />
            <View style={styles.internetTextContainer}>
              <Text style={styles.internetSpeed}>
                {cardData.averageInternetSpeed}
              </Text>
              <Text style={styles.internetUnit}>Mbps</Text>
            </View>
          </View>
        </View>
        <View style={styles.centerTextContainer}>
          <Text style={styles.provinceText}>{cardData.province}</Text>
          <Text style={styles.cityTextFront}>{cardData.name}</Text>
        </View>
        <View style={styles.cardFrontBottomRow}>
          <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={24}
              color={isLiked ? colors.like : colors.textOnPrimary}
            />
          </TouchableOpacity>
          <View style={styles.costContainer}>
            <Text style={styles.costAmount}>${cardData.costOfLiving}/mo</Text>
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
    alignItems: "center",
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1, // Allow this container to shrink
  },
  temperatureContainer: {
    marginLeft: 6,
  },
  feelsLikeTemp: {
    fontSize: 12,
    color: colors.textOnPrimary,
  },
  actualTemp: {
    fontSize: 16,
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
  indicatorWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  indicatorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicatorName: {
    width: "35%",
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
  activityGauge: {
    flex: 1,
    flexDirection: "row",
    height: 20, // 높이를 게이지와 유사하게 설정
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  activitySegment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tabBarBackground, // 비활성 색상
  },
  activeSegment: {
    backgroundColor: colors.primary, // 활성 색상
  },
  segmentText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  activeSegmentText: {
    color: colors.textOnPrimary,
    fontWeight: "bold",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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

function areEqual(prevProps, nextProps) {
  return (
    prevProps.cardData.id === nextProps.cardData.id &&
    prevProps.isLiked === nextProps.isLiked &&
    prevProps.currentImageIndex === nextProps.currentImageIndex
  );
}

export default memo(FlippableCard, areEqual);
