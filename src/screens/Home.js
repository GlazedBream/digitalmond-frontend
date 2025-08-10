import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Swiper from "react-native-swiper";
import colors from "../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const bannerItems = [
  "다음 여행지 고성을 추천합니다!\n고성을 확인해보세요!",
  "탐색에서 당신의 도시를 선택해주세요!",
  "영도구에 거주한 지 5일째",
  "관심있을만한 관광명소",
  "곧 열릴 축제",
  "화제의 게시글",
];

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (e) {
        console.error("Failed to load todos.", e);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      } catch (e) {
        console.error("Failed to save todos.", e);
      }
    };
    saveTodos();
  }, [todos]);

  const addTodo = () => {
    if (text.trim().length === 0) return;
    if (editingId) {
      setTodos(
        todos.map((todo) => (todo.id === editingId ? { ...todo, text } : todo))
      );
      setEditingId(null);
    } else {
      setTodos([
        ...todos,
        { id: Date.now().toString(), text, completed: false },
      ]);
    }
    setText("");
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setText(todo.text);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renderTodo = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={() => toggleComplete(item.id)}
        style={styles.todoTextContainer}
      >
        <Icon
          name={item.completed ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={item.completed ? colors.grey : colors.primary}
        />
        <Text
          style={[styles.todoText, item.completed && styles.todoTextCompleted]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <View style={styles.todoButtons}>
        <TouchableOpacity onPress={() => startEditing(item)}>
          <Icon name="edit" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteTodo(item.id)}
          style={{ marginLeft: 10 }}
        >
          <Icon name="delete" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.swiperContainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            autoplay
            autoplayTimeout={3}
            paginationStyle={styles.pagination}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
          >
            {bannerItems.map((item, index) => (
              <View style={styles.slide} key={index}>
                <Text style={styles.slideText}>{item}</Text>
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.todoContainer}>
          <Text style={styles.todoHeader}>To-Do List</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a new task..."
              value={text}
              onChangeText={setText}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTodo}>
              <Text style={styles.addButtonText}>
                {editingId ? "Update" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // To allow parent ScrollView to control scrolling
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                아직 할 일이 없어요! 새로운 할 일을 추가해보세요.
              </Text>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  swiperContainer: {
    height: 200,
    marginBottom: 20,
    marginTop: 20, // Add margin to the top
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  slideText: {
    color: colors.textOnPrimary,
    fontSize: 20,
    fontWeight: "bold",
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: "rgba(255,255,255,.3)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: colors.living.community,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  todoContainer: {
    paddingHorizontal: 20,
  },
  todoHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: colors.white,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
  },
  addButtonText: {
    color: colors.textOnPrimary,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  todoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
  todoButtons: {
    flexDirection: "row",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
