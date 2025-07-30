import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Fontisto } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FlippableCard = ({ navigation, cardId }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDetailPress = () => {
    navigation.navigate("ExploreDetail", { cardId });
  };

  const renderIndicators = () => {
    const indicators = [
      { name: "test1", value: 0.7 },
      { name: "test2", value: 0.5 },
      { name: "test3", value: 0.9 },
      { name: "test4", value: 0.4 },
      { name: "test5", value: 0.6 },
    ];

    return (
      <View style={styles.indicatorsContainer}>
        {indicators.map((indicator, index) => (
          <View key={index} style={styles.indicatorRow}>
            <Text style={styles.indicatorName}>{indicator.name}</Text>
            <View style={styles.gaugeBackground}>
              <View
                style={[
                  styles.gaugeFill,
                  { width: `${indicator.value * 100}%` },
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
      style={styles.cardContainer}
    >
      {isFlipped ? (
        <View style={[styles.card, styles.cardBack]}>
          {renderIndicators()}
          <View style={styles.bottomContainer}>
            <Text style={styles.cityName}>{`City${cardId}`}</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                handleDetailPress();
              }}
              style={styles.detailButton}
            >
              <AntDesign name="enter" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={[styles.card, styles.cardFront]}>
          <View style={styles.cardFrontTopRow}>
            <View />
            <View style={styles.internetContainer}>
              <AntDesign name="wifi" size={24} color="white" />
              <View style={styles.internetTextContainer}>
                <Text style={styles.internetSpeed}>100</Text>
                <Text style={styles.internetUnit}>Mbps</Text>
              </View>
            </View>
          </View>
          <View style={styles.centerTextContainer}>
            <Text style={styles.provinceText}>{`Province${cardId}`}</Text>
            <Text style={styles.cityTextFront}>{`City${cardId}`}</Text>
          </View>
          <View style={styles.cardFrontBottomRow}>
            <View style={styles.weatherContainer}>
              <Fontisto name="day-sunny" size={20} color="white" />
              <View style={styles.temperatureContainer}>
                <Text style={styles.feelsLikeTemp}>
                  체감 35
                  <MaterialCommunityIcons
                    name="temperature-celsius"
                    size={10}
                    color="white"
                  />
                </Text>
                <Text style={styles.actualTemp}>
                  32
                  <MaterialCommunityIcons
                    name="temperature-celsius"
                    size={14}
                    color="white"
                  />
                </Text>
              </View>
            </View>
            <View style={styles.costContainer}>
              <Text style={styles.costAmount}>$2,000/mo</Text>
              <Text style={styles.costLabel}>FOR A NOMAD</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "48%",
    aspectRatio: 0.8,
    margin: "1%",
  },
  card: {
    flex: 1,
    borderRadius: 30,
    padding: 15,
  },
  cardFront: {
    backgroundColor: "#5A4632",
    justifyContent: "space-between",
  },
  cardBack: {
    backgroundColor: "#f0f0f0",
    justifyContent: "space-between",
  },
  // Front Card Styles
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
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  internetUnit: {
    color: "white",
    fontSize: 12,
  },
  centerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  provinceText: {
    fontSize: 18,
    color: "white",
  },
  cityTextFront: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
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
    color: "white",
  },
  actualTemp: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  costContainer: {
    alignItems: "flex-end",
  },
  costAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  costLabel: {
    fontSize: 10,
    color: "white",
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
    color: "black",
  },
  gaugeBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  gaugeFill: {
    height: "100%",
    backgroundColor: "#5A4632",
    borderRadius: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
  },
  cityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  detailButton: {
    padding: 5,
  },
});

export default FlippableCard;
