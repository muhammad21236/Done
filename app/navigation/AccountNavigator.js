import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../Screens/AccountScreen";
import MessagesScreen from "../Screens/MessagesScreen";
import ListingsScreen from "../Screens/ListingsScreen";
import UserProfileScreen from "../Screens/UserProfileScreen";
const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UserProfile"
      component={UserProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
  
);

export default AccountNavigator;
