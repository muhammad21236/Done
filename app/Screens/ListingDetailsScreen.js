import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AppText from "../components/AppText";
import listingsApi from "../api/listings";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import ContactSellerForm from "../components/ContactSellerForm";
import useAuth from "../auth/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListingDetailsScreen({ route }) {
  const { user } = useAuth();
  const listing = route.params;
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadListings();
    // Set up header delete button
    navigation.setOptions({
      headerRight: () => (
        isOwner() && (
          <TouchableOpacity onPress={handleDeletePress} style={styles.headerButton}>
            {loading ? (
              <ActivityIndicator color={colors.danger} />
            ) : (
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={24}
                color={colors.danger}
              />
            )}
          </TouchableOpacity>
        )
      ),
    });
  }, [navigation, loading]);

  const loadListings = async () => {
    const response = await listingsApi.getListings();
    setListings(response.data);
  };

  const isOwner = () => {
    return listing.user && user && listing.user._id === user._id;
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this listing?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: handleDeleteListing },
      ]
    );
  };

  const handleDeleteListing = async () => {
    setLoading(true);
    try {
      const response = await listingsApi.deleteListing(listing._id);
      if (!response.ok) throw new Error("Failed to delete listing");
      
      Alert.alert("Success", "Listing deleted successfully", [
        { text: "OK", onPress: () => navigation.navigate("Feed") },
      ]);
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Could not delete listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleListItemClick = () => {
    navigation.navigate("Feed", { listings });
  };

  const handleImagePress = () => {
    navigation.navigate("ViewImage", {
      images: listing.images,
      currentIndex: 0,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <View>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            style={styles.image}
            source={{ uri: listing.images?.[0]?.url }}
          />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{listing.title}</AppText>
          <AppText style={styles.price}>${listing.price}</AppText>
          <View style={styles.userContainer}>
            <TouchableOpacity onPress={handleListItemClick}>
              <ListItem
                image={require("../assets/logo-red.png")}
                title={user?.name || "Unknown User"}
                subTitle={`${listings.filter(l => l.user?._id === user?._id).length} Listings`}
              />
            </TouchableOpacity>
          </View>
          <ContactSellerForm listing={listing} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 10,
  },
  headerButton: {
    marginRight: 15,
    padding: 5,
  },
});

export default ListingDetailsScreen;