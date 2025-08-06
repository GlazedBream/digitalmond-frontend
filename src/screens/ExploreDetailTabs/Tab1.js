import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../../styles/colors";

const Tab1 = ({ cityData }) => {
  console.log("Tab1 - cityData:", cityData); // 디버깅 로그 유지

  return (
    <View style={styles.container}>
      <Text style={styles.title}>기본 정보</Text>

      {/* 이미지 컨테이너 */}
      <View style={styles.imageContainer}>
        {cityData?.imageUrls && cityData.imageUrls[0] && (
          <Image source={cityData.imageUrls[0]} style={styles.cityImage} />
        )}
        {cityData?.imageUrls && cityData.imageUrls[1] && (
          <Image source={cityData.imageUrls[1]} style={styles.cityImage} />
        )}
      </View>

      {/* 정보 항목들 */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>이름:</Text>
        <Text style={styles.value}>{cityData?.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>지역:</Text>
        <Text style={styles.value}>{cityData?.province}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>설명:</Text>
        <Text style={styles.value}>{cityData?.description}</Text>
      </View>
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
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPrimary,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  cityImage: {
    width: "48%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    width: 130,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 18,
    flex: 1,
    color: colors.textPrimary,
  },
});

export default Tab1;
