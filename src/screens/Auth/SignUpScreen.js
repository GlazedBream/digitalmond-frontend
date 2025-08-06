import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as authApi from '../../api/auth';
import colors from '../../styles/colors';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [country, setCountry] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [cityId, setCityId] = useState(''); // Assuming cityId can be string for input

  const handleSignUp = async () => {
    if (!email || !password || !password2 || !lastName || !firstName || !country || !cityCode) {
      Alert.alert('입력 오류', '모든 필수 필드를 입력해주세요.');
      return;
    }
    if (password !== password2) {
      Alert.alert('비밀번호 불일치', '비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      await authApi.signup({
        cityId: cityId ? Number(cityId) : null, // Convert to number or null
        email,
        password,
        password2,
        lastName,
        firstName,
        country,
        cityCode: Number(cityCode),
      });
      Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('회원가입 실패', '오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor={colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          placeholderTextColor={colors.textSecondary}
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="성 (Last Name)"
          placeholderTextColor={colors.textSecondary}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="이름 (First Name)"
          placeholderTextColor={colors.textSecondary}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="국가"
          placeholderTextColor={colors.textSecondary}
          value={country}
          onChangeText={setCountry}
        />
        <TextInput
          style={styles.input}
          placeholder="도시 코드 (City Code)"
          placeholderTextColor={colors.textSecondary}
          value={cityCode}
          onChangeText={setCityCode}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="도시 ID (City ID, 선택 사항)"
          placeholderTextColor={colors.textSecondary}
          value={cityId}
          onChangeText={setCityId}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>가입하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>로그인 화면으로</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: colors.background, // 배경색 변경
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.textPrimary,
  },
  input: {
    height: 50, // 높이 증가
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8, // 둥근 모서리
    marginBottom: 15,
    paddingHorizontal: 15,
    color: colors.textPrimary, // 텍스트 색상
    backgroundColor: colors.surface, // 입력 필드 배경색
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
