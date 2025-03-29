import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {  // Allow passing arguments
    setLoading(true);
    const response = await apiFunc(...args);  // Call API function with parameters
    setLoading(false);

    if (!response.ok) {
      setError(true);
      return response;  // Ensure response is returned
    }

    setError(false);
    setData(response.data);
    return response;  // Return response for external use
  };

  return { data, error, loading, request };
};
