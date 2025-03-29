import React, { useState } from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";
import * as Yup from "yup";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import useLocation from "../hooks/useLocation";

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please Select at least one Image."),
});

function ListingEditScreen() {
  const location = useLocation();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);

  const handleSubmit = async (listing) => {
    console.log("Uploading listing:", listing);

    const formattedImages = listing.images.map((img) => ({
      uri: img.uri,
      name: img.fileName || "upload.jpg",
      type: img.mimeType || "image/jpeg",
    }));

    try {
      const result = await listingsApi.addListing(
        { ...listing, images: formattedImages },
        (progress) => setUploadProgress(progress)
      );

      console.log("API Response:", result);

      if (!result.ok) {
        console.log("Server Error:", result.data);
        alert("Could not save the listing. Server returned an error.");
        return;
      }

      setAnimationVisible(true);
      setTimeout(() => setAnimationVisible(false), 2000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton
          title={
            uploading
              ? `Uploading ${Math.round(uploadProgress * 100)}%`
              : "Post"
          }
        />
      </Form>

      {/* Uploading Animation */}
      {uploading && (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator size="large" color="#fc5c65" />
        </View>
      )}

      {/* Success Animation Modal */}
      <Modal visible={animationVisible} transparent>
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../assets/animations/done.json")}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 50
  },
  uploadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  animation: {
    width: 150,
    height: 150,
  },
});

export default ListingEditScreen;
