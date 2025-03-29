import client from "./client";

const endpoint = "/listings";

// Function to fetch listings
const getListings = () => client.get(endpoint);

// Function to add a new listing
const addListing = (listing, onUploadProgress) => {
  const data = new FormData();

  // Add basic listing information
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);

  // Ensure images exist and are an array
  if (Array.isArray(listing.images) && listing.images.length > 0) {
    listing.images.forEach((image, index) => {
      if (image?.uri) {  // Ensure `image.uri` exists
        const uri = image.uri.replace("file://", ""); // Remove the file:// prefix
        const file = {
          uri: uri,
          name: image.fileName || `image_${index}.jpg`,
          type: image.mimeType || "image/jpeg",
        };

        // Log the image file for debugging
        console.log("Image file being uploaded:", file);

        // Ensure we append the image to FormData as a File
        data.append("images", {
          uri: file.uri,
          name: file.name,
          type: file.type,
        });
      } else {
        console.warn(`Skipping invalid image at index ${index}:`, image);
      }
    });
  } else {
    console.warn("No valid images found in listing.");
  }

  // Add location if exists
  if (listing.location) {
    data.append("location", JSON.stringify(listing.location));
  }

  // Make the POST request to add listing
  return client.post(endpoint, data, { 
    headers: { "Content-Type": "multipart/form-data" }, 
    onUploadProgress 
  });
};
// In api/listings.js
const deleteListing = (id) => client.delete(`${endpoint}/${id}`);

export default {
  addListing,
  getListings,
  deleteListing,
};
