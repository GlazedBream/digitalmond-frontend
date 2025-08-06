import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import colors from "../styles/colors";

const TopBar = ({ onBackPress, title, rightComponent }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{String(title)}</Text>
        </View>
        <View style={styles.rightComponentContainer}>{rightComponent}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.surface,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 60, // 고정 너비
    justifyContent: "center",
    alignItems: "flex-start", // 왼쪽 정렬
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  rightComponentContainer: {
    width: 60, // 고정 너비
    justifyContent: "center",
    alignItems: "flex-end", // 오른쪽 정렬
  },
});

export default TopBar;
