import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import ListingEditScreen from "../Screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import useNotifications from "../hooks/useNotifications";
import Screen from "../components/Screen";
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications();

  return (
    <Screen style={styles.bar}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home-variant-outline"
                color={color}
                size={size + 4} // Slightly bigger icon
                style={styles.iconShadow}
              />
            ),
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "#B0B0B0",
          }}
        />
        <Tab.Screen
          name="Listing Edit"
          component={ListingEditScreen}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarButton: () => (
              <NewListingButton
                onPress={() => navigation.navigate("Listing Edit")}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Account"
          component={AccountNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle-outline"
                color={color}
                size={size + 4}
                style={styles.iconShadow}
              />
            ),
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "#B0B0B0",
          }}
        />
      </Tab.Navigator>
    </Screen>
  );
};

const styles = StyleSheet.create({
  bar: {
    marginBottom: -20,
  },
  tabBar: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    height: 65,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default AppNavigator;
