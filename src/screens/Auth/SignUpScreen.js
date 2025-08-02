import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
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
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="성 (Last Name)"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="이름 (First Name)"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="국가"
          value={country}
          onChangeText={setCountry}
        />
        <TextInput
          style={styles.input}
          placeholder="도시 코드 (City Code)"
          value={cityCode}
          onChangeText={setCityCode}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="도시 ID (City ID, 선택 사항)"
          value={cityId}
          onChangeText={setCityId}
          keyboardType="numeric"
        />
        <Button title="가입하기" onPress={handleSignUp} color={colors.primary} />
        <Button
          title="로그인 화면으로"
          onPress={() => navigation.navigate('Login')}
          color={colors.secondary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: colors.surface,
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
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default SignUpScreen;
