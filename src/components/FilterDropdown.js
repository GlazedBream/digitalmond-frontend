import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";

const FilterDropdown = ({
  label,
  iconName,
  options,
  selectedValue,
  onValueChange,
  isActive,
  onToggle,
}) => {
  const handlePress = (value) => {
    onValueChange(value);
    onToggle(); // Close dropdown after selection
  };

  const displayLabel =
    selectedValue && selectedValue.label ? selectedValue.label : "선택안함";

  const allOptions = [{ label: "선택안함", value: null }, ...options];

  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
      <TouchableOpacity
        style={styles.header}
        onPress={onToggle}
      >
        <Ionicons
          name={iconName}
          size={20}
          color={colors.primary}
        />
        <Text style={styles.headerText}>{displayLabel}</Text>
        <Ionicons
          name={isActive ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
      {isActive && (
        <View style={styles.optionsContainer}>
          {allOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionItem}
              onPress={() => handlePress(option)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 5,
    width: 170, // 고정 폭
  },
  activeContainer: {
    zIndex: 100, // 활성화된 드롭다운이 최상위로 오도록 설정
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.dropdownBackground,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.textPrimary,
  },
  optionsContainer: {
    position: "absolute",
    top: "100%", // Position below the header
    left: 0,
    right: 0,
    backgroundColor: colors.dropdownBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 5,
    zIndex: 20, // Higher than container to appear above next dropdown's header
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});

export default FilterDropdown;