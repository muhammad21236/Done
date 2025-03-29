import React from "react";

import Screen from "../components/Screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ListItem from "../components/ListItem";
import { StyleSheet, View, FlatList } from "react-native";
import colors from "../config/colors"; // Assuming the colors file defines dark/light themes
import Icon from "../components/Icon";
import ListItemSeperator from "../components/ListItemSeperator";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: "Feed",
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <GestureHandlerRootView style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/logo-red.png")}
          style={styles.listItem}
          onPress={() => navigation.navigate("UserProfile", { user })}
        />
      </GestureHandlerRootView>
      <View style={styles.container1}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <GestureHandlerRootView>
              <ListItem
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
                onPress={() => navigation.navigate(item.targetScreen)}
                style={styles.listItem}
              />
            </GestureHandlerRootView>
          )}
        />
      </View>
      <GestureHandlerRootView>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="red" />}
          onPress={() => logOut()}
          style={styles.listItem}
        />
      </GestureHandlerRootView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container1: {
    marginBottom: 20,
  },
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.darkBackground, // Dark background color
    padding: 10,
    marginTop: 10,
  },
  listItem: {
    borderRadius: 15, // Rounded corners for ListItems
    overflow: "hidden", // Ensures icons and text stay within the rounded corners
    marginBottom: 10, // Space between items
    backgroundColor: colors.darkItem, // Dark theme for list items
  },
});

export default AccountScreen;
