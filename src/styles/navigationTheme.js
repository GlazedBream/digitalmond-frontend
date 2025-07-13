import colors from "./colors";

const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.activeTab,
  tabBarInactiveTintColor: colors.inactiveTab,
  tabBarStyle: {
    backgroundColor: colors.tabBarBackground,
    borderTopWidth: 0,
    height: 100,
    paddingBottom: 8,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "600",
  },
};

export default tabBarOptions;
