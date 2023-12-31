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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${api.base}weather?q=${query}&appid=${api.key}`
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setIsModalVisible(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="weather-app min-h-screen flex items-center justify-center bg-cover bg-center px-10"
      style={weatherContainerStyle}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Weather App</h2>
        <div className="flex flex-col md:flex-row md:items-center mb-4">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name"
            className="rounded p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 md:mb-0 md:mr-2"
          />
          <button
            onClick={handleSearch}
            className="hover:scale-[1.1] transition duration-300 px-4 rounded-md md:rounded-r-lg bg-blue-500 text-white font-bold p-2 border-blue-700 border-t border-b border-r"
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
      {isModalVisible && (
        <div className="weather-modal">
          <div className="weather-modal-content">
            <h2 className="weather-modal-title">City Not Found</h2>
            <p className="weather-modal-message">
              The entered city was not found. Please try again.
            </p>
            <button onClick={closeModal} className="weather-modal-close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
