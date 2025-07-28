import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/Explore";
import LivingScreen from "../screens/Living";
import HomeScreen from "../screens/Home";
import MissionScreen from "../screens/Mission";
import MyPageScreen from "../screens/MyPage";
import tabBarOptions from "../styles/navigationTheme";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Living" component={LivingScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mission" component={MissionScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
