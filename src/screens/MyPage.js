import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import globalStyles from "../styles/globalStyles";
import colors from "../styles/colors";
import { AuthContext } from "../context/AuthContext";
import { useFilter } from "../context/FilterContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dummyUser } from "../data/users";

const filterLabels = {
  ageGroup: {
    "<20": "20대 미만",
    "20s": "20대",
    "30s": "30대",
    "40s": "40대",
    "50s": "50대",
    ">60": "60대 이상",
  },
  companion: {
    solo: "솔로",
    couple: "커플",
    family: "가족",
  },
  activityLevel: {
    quiet: "조용함",
    medium: "중간",
    active: "활동적",
  },
  preference: {
    work_environment: "쾌적한 업무환경",
    local_experience: "지역 체험",
    nature_friendly: "자연 친화",
    culture_art: "문화 예술",
  },
};

const initialRouteOptions = [
  { label: "탐색", value: "Explore" },
  { label: "생활", value: "Living" },
  { label: "홈", value: "Home" },
  { label: "미션", value: "Mission" },
];

export default function MyPageScreen() {
  const { logout } = useContext(AuthContext);
  const { ageGroup, companion, activityLevel, preference } = useFilter();
  const [user, setUser] = useState(dummyUser.user);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedInitialRoute, setSelectedInitialRoute] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      const route = await AsyncStorage.getItem("initialRoute");
      if (route) {
        setSelectedInitialRoute(route);
      }
      const imageUri = await AsyncStorage.getItem("profileImage");
      if (imageUri) {
        setProfileImage(imageUri);
      } else {
        // 로컬 더미 이미지 설정
        setUser(prevUser => ({
          ...prevUser,
          profile: {
            ...prevUser.profile,
            imgUrl: require("../../assets/images/profiles/profile-gandalf.png"),
          }
        }));
      }
    };
    loadInitialData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      await AsyncStorage.setItem("profileImage", imageUri);
      setUser(prevUser => ({
        ...prevUser,
        profile: { ...prevUser.profile, imgUrl: { uri: imageUri } }
      }));
    }
  };

  const handleInitialRouteChange = async (value) => {
    setSelectedInitialRoute(value);
    await AsyncStorage.setItem("initialRoute", value);
  };

  const renderFilterValue = (value, labels) => {
    return value && value.label ? value.label : "선택 안함";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage}>
          <Image 
            source={profileImage ? { uri: profileImage } : user.profile.imgUrl}
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{user.profile.nickname}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 선호 설정</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>연령대</Text>
          <Text style={styles.infoValue}>{renderFilterValue(ageGroup, filterLabels.ageGroup)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>동반자 여부</Text>
          <Text style={styles.infoValue}>{renderFilterValue(companion, filterLabels.companion)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>활동성</Text>
          <Text style={styles.infoValue}>{renderFilterValue(activityLevel, filterLabels.activityLevel)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>선호</Text>
          <Text style={styles.infoValue}>{renderFilterValue(preference, filterLabels.preference)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>개발자 설정</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>초기 화면 설정</Text>
          <View style={styles.radioGroup}>
            {initialRouteOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioButton}
                onPress={() => handleInitialRouteChange(option.value)}
              >
                <View style={[styles.radioCircle, selectedInitialRoute === option.value && styles.radioCircleSelected]} />
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30, // 상단 여백 추가
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 5, // 공백 더 줄임
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: 15,
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 5,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10, // 여백 더 줄임
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10, // 간격 좁힘
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  settingRow: {
    paddingVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 8,
  },
  radioCircleSelected: {
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  logoutButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 15, // 여백 줄임
    alignItems: "center",
  },
  logoutButtonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
