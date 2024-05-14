export const apiRequests = async (url, options = {}) => {
  try {
    // Fetch the token from local storage
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    // Convert response to JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any other errors
    console.error("Error:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};


export const fetchData = async (url) => {
    try {
      const data = await apiRequests(url);
      console.log('Data:', data);
      return data; // Return the data if you need to use it further
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };