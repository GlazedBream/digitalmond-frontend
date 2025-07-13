import { View, Text } from "react-native";
import globalStyles from "../styles/globalStyles";

export default function MyPageScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>My Page Screen</Text>
    </View>
  );
}
