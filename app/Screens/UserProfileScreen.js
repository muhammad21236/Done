import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert, Image } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import * as ImagePicker from "expo-image-picker";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import apiClient from "../api/client";

function UserProfileScreen({ route, navigation }) {
  console.log("Route Params:", route.params); // Debugging log

  const { user } = route.params || {}; // Default to empty object to prevent crashes

  const { updateUser } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUri, setImageUri] = useState(user?.profileImage || null);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.post("/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.ok) {
        Alert.alert("Success", "Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Alert.alert("Error", response.data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("profileImage", {
      uri,
      name: "profile.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await apiClient.post("/upload-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        updateUser(response.data.user);
        Alert.alert("Success", "Profile picture updated");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile picture");
    }
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={
            imageUri ? { uri: imageUri } : require("../assets/logo-red.png")
          }
          style={styles.profileImage}
        />
        <AppButton
          title="Change Profile Picture"
          onPress={pickImage}
          color="secondary"
        />

        <AppTextInput
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <AppTextInput
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <AppTextInput
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <AppButton
          title="Change Password"
          onPress={handleChangePassword}
          loading={loading}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.darkBackground,
  },
  container: {
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
});

export default UserProfileScreen;
