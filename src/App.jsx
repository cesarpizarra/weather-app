import React, { useState, useEffect } from "react";
import { api } from "./api/api";
import BgCloud from "./assets/bg-cloud.jpg";
import BgSun from "./assets/bg-sun.jpg";
import BgMist from "./assets/bg-mist.jpg";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("Philippines");
  const [currentDay, setCurrentDay] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${api.base}weather?q=${query}&appid=${api.key}`
      );
      const data = await response.json();
      setWeatherData(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Changed duration to 2 seconds (2000 milliseconds)
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };

  const getBackgroundImage = () => {
    if (weatherData && weatherData.weather) {
      const weather = weatherData.weather[0].main.toLowerCase();
      if (weather === "clouds" || weather === "rain") {
        return `url(${BgCloud})`;
      } else if (weather === "clear" || weather === "sunny") {
        return `url(${BgSun})`;
      } else if (weather === "fog" || weather === "mist") {
        return `url(${BgMist})`;
      }
    }
    return "";
  };

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    setCurrentDay(days[dayIndex]);
  }, []);

  const weatherContainerStyle = {
    backgroundImage: getBackgroundImage(),
    backgroundSize: "cover",
    transition: "background-image 2.5s ease",
  };

  return (
    <div
      className="weather-app min-h-screen flex items-center justify-center bg-cover bg-center"
      style={weatherContainerStyle}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Weather App</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name"
            className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            onClick={handleSearch}
            className="hover:scale-[1.1] transition duration-300 px-4 rounded-r-lg bg-blue-500 text-white font-bold p-2 border-blue-700 border-t border-b border-r"
          >
            Search
          </button>
        </div>
        {isLoading ? (
          <div className="text-gray-800 flex items-center justify-center">
            <div className="spinner" />
          </div>
        ) : weatherData ? (
          <div className="text-gray-800">
            <h3 className="text-xl font-semibold mb-2">
              Weather in {weatherData.name}
            </h3>
            <p>Current Day: {currentDay}</p>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        ) : (
          <div className="text-gray-800">No weather data available</div>
        )}
      </div>
    </div>
  );
};

export default App;
