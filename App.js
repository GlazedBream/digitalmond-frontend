import { StyleSheet, Text, View, Dimensions } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
export default RootNavigator;

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const colors = {
  background: "#EED9C4",
  primary: "#5A4632",
  secondary: "#7A6F66",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.primary,
    fontSize: 100,
    fontWeight: 500,
  },
});
