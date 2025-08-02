import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../styles/globalStyles';
import colors from '../styles/colors';
import { AuthContext } from '../context/AuthContext';

export default function MyPageScreen() {
  const { authState, logout } = useContext(AuthContext);
  const user = authState.user;

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileImagePlaceholder}>
          {/* User profile image will go here */}
          <Text style={styles.profileImageText}>사진</Text>
        </View>
        <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.userReward}>보유 리워드: 30,000 Almonds</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.container.backgroundColor, // globalStyles에서 배경색 가져오기
    alignItems: 'center',
    paddingTop: 50,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageText: {
    color: colors.textOnPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  userReward: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  logoutButton: {
    backgroundColor: colors.secondary, // 테마 색상으로 변경
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 50,
  },
  logoutButtonText: {
    color: colors.textOnPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});