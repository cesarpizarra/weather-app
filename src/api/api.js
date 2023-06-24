// // this is the base url
// // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
export const api = {
  key: "e92d7daf60c8e14af0a632a6d6643343",
  base: "https://api.openweathermap.org/data/2.5/",
};

// For testing only
async function fetchWeatherData(cityName) {
  const url = `${api.base}weather?q=${cityName}&appid=${api.key}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    // console.log(data);
    // Do something with the data
  } catch (error) {
    // console.error("Error:", error);
  }
}

fetchWeatherData("arabia");
