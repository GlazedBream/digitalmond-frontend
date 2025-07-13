import { StyleSheet, Text, View, Dimensions } from "react-native";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello, World!</Text>
    </View>
  );
}

const colors = {
  background: "#EED9C4",
  primary: "#5A4632",
  secondary: "#7A6F66",
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hello: {
    color: colors.primary,
    fontSize: 100,
    fontWeight: 800,
    textAlign: "center",
    marginTop: WINDOW_WIDTH * 0.4,
  },
});
