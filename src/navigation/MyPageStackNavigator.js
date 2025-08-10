import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPageScreen from "../screens/MyPage";
import DummyChatbotScreen from "../screens/DummyChatbotScreen";
import DummyCameraScreen from "../screens/DummyCameraScreen";

const MyPageStack = createStackNavigator();

function MyPageStackNavigator() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyPageMain"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
      <MyPageStack.Screen
        name="DummyChatbot"
        component={DummyChatbotScreen}
        options={{ title: "챗봇" }}
      />
      <MyPageStack.Screen
        name="DummyCamera"
        component={DummyCameraScreen}
        options={{ title: "미션 카메라" }}
      />
    </MyPageStack.Navigator>
  );
}

export default MyPageStackNavigator;
