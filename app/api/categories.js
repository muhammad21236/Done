import client from "./client"; // Ensure you have an API client

const endpoint = "/store/categories";

const getCategories = async () => {
  const response = await client.get(endpoint);
  
  if (!response.ok || !response.data) {
    return { ok: false, data: [] }; // Prevent undefined data
  }

  return response;
};

export default {
  getCategories,
};
