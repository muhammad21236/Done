import React, { useState } from "react";
import { 
  Image, 
  StyleSheet, 
  View, 
  TouchableOpacity,
  Dimensions 
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

function ViewImageScreen({ route }) {
  const { images, currentIndex } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const navigation = useNavigation();

  const handleSwipe = (direction) => {
    const newIndex = direction === "right" 
      ? currentImageIndex - 1 
      : currentImageIndex + 1;
      
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentImageIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="close" size={40} color={colors.white} />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.swipeLeft}
          onPress={() => handleSwipe("left")}
        />
        <TouchableOpacity
          style={styles.swipeRight}
          onPress={() => handleSwipe("right")}
        />
        
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: images[currentImageIndex]?.url }}
        />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  closeIcon: {
    position: "absolute",
    top: 40,
    left: 30,
    zIndex: 3,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  swipeLeft: {
    position: "absolute",
    left: 0,
    height: "100%",
    width: "50%",
    zIndex: 1,
  },
  swipeRight: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: "50%",
    zIndex: 1,
  },
});

export default ViewImageScreen;