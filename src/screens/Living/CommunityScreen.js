import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "../../styles/colors";
import TopBar from "../../components/TopBar";
import { useNavigation } from "@react-navigation/native";

const dummyPosts = [
  {
    id: "1",
    type: "지역 정보",
    title: "영도구 맛집 추천! 숨겨진 보석 같은 곳",
    author: "영도사랑",
    date: "2025-07-28",
    comments: 5,
    likes: 12,
  },
  {
    id: "2",
    type: "잡담",
    title: "오늘 영도 날씨 정말 좋네요!",
    author: "영도주민",
    date: "2025-07-27",
    comments: 8,
    likes: 20,
  },
  {
    id: "3",
    type: "질문",
    title: "영도구에서 운동하기 좋은 곳 추천해주세요!",
    author: "운동초보",
    date: "2025-07-26",
    comments: 3,
    likes: 7,
  },
  {
    id: "4",
    type: "지역 정보",
    title: "영도다리축제 자원봉사자 모집합니다!",
    author: "축제운영팀",
    date: "2025-07-25",
    comments: 10,
    likes: 15,
  },
  {
    id: "5",
    type: "잡담",
    title: "영도구에 새로 생긴 카페 가보신 분?",
    author: "카페탐방러",
    date: "2025-07-24",
    comments: 6,
    likes: 9,
  },
];

const CommunityScreen = () => {
  const navigation = useNavigation();

  const renderPostItem = ({ item }) => (
    <TouchableOpacity style={styles.postItem}>
      <Text style={styles.postType}>{item.type}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <View style={styles.postMeta}>
        <Text style={styles.postAuthor}>{item.author}</Text>
        <Text style={styles.postDate}>{item.date}</Text>
        <Text style={styles.postStats}>
          댓글 {item.comments} | 좋아요 {item.likes}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TopBar title="커뮤니티" onBackPress={() => navigation.goBack()} />
      <FlatList
        data={dummyPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  postListContainer: {
    padding: 15,
  },
  postItem: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postType: {
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 5,
  },
  postMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postAuthor: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  postDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  postStats: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default CommunityScreen;
