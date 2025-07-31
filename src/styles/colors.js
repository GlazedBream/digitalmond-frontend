// src/styles/colors.js

// 1. 기본 색상 팔레트를 정의합니다.
// 앱의 핵심 색상들을 모아둡니다.
const palette = {
  almond: {
    light: '#F5E8D7', // 기존 tabBarBackground
    medium: '#EED9C4', // 기존 background
    dark: '#7A6F66',   // 기존 secondary, inactiveTab
    deep: '#5A4632',   // 기존 primary
  },
  common: {
    black: '#1A1A1A',   // 기존 activeTab
    white: '#FFFFFF',
    grey: '#BDBDBD',
  },
  // 앱의 상태를 나타내는 시맨틱 컬러 (선택 사항)
  status: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    like: '#FF69B4',
  }
};

// 2. 역할에 따른 시맨틱 색상 이름을 정의합니다.
// 실제 컴포넌트에서는 이 이름들을 사용합니다.
const colors = {
  // 기본
  primary: palette.almond.deep,
  secondary: palette.almond.dark,
  background: palette.almond.medium,
  surface: palette.common.white, // 카드, 모달 등 표면 색상
  border: palette.common.grey,

  // 텍스트
  textPrimary: palette.almond.deep,
  textSecondary: palette.almond.dark,
  textOnPrimary: palette.common.white,

  // 탭 네비게이션
  tabBarBackground: palette.almond.light,
  activeTab: palette.common.black,
  inactiveTab: palette.almond.dark,

  // 상태
  success: palette.status.success,
  error: palette.status.error,
  warning: palette.status.warning,
  like: palette.status.like,
};

export default colors;