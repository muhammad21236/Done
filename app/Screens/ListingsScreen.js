import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  const filteredListings = (listings || []).filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Screen style={styles.screen}>
      {error ? (
        <>
          <AppText style={styles.errorText}>
            Couldn't retrieve the listings.
          </AppText>
          <AppButton title="Retry" onPress={loadListings} />
        </>
      ) : loading ? (
        <ActivityIndicator animating size="large" color={colors.primary} />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search listings..."
              placeholderTextColor={colors.medium}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
          </View>
          <FlatList
            data={filteredListings}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                subTitle={"$" + item.price}
                imageUrl={item.images?.[0]?.url}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <AppText style={styles.emptyText}>
                  No listings found matching your search.
                </AppText>
              </View>
            }
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  searchContainer: {
    paddingVertical: 15,
  },
  searchInput: {
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    borderColor: colors.light,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  listContent: {
    paddingBottom: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    color: colors.medium,
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    marginBottom: 15,
    color: colors.danger,
  },
});

export default ListingsScreen;
