import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import colors from '../../styles/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor={colors.textSecondary} // Placeholder 색상 추가
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor={colors.textSecondary} // Placeholder 색상 추가
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background, // 배경색 변경
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

export default LoginScreen;
