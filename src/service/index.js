export const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

export const getData = async (cityName) => {
  const url = `${api.base}weather?q=${cityName}&appid=${api.key}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: true,
        message: errorData.message || "Network response was not OK",
      };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
