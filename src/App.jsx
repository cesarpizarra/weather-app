import React, { useState, useEffect } from "react";
import Clouds from "./assets/clouds.jpg";
import FogMist from "./assets/fog-mist.jpg";
import SunnyClear from "./assets/sunny-clear.jpg";
import SearchForm from "./components/SearchForm";
import { getData } from "./service";
import Loader from "./common/Loader";
import Alert from "./components/Alert";
import Footer from "./components/Footer";
import "animate.css";
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("Philippines");
  const [currentDay, setCurrentDay] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await getData(query.toLowerCase());
        setTimeout(() => {
          if (response.error) {
            setError(response.error);
            setWeatherData(null);
          } else {
            setWeatherData(response);
            setError(false);
          }
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
        setError(true);
        setIsLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await getData(query.toLowerCase());
      setTimeout(() => {
        if (response.error) {
          setError(response.error);
          setWeatherData(null);
        } else {
          setWeatherData(response);
          setError(false);
        }
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setError(true);
      setIsLoading(false);
    }
  };

  const getBackgroundImage = () => {
    if (weatherData && weatherData.weather) {
      const weather = weatherData.weather[0].main.toLowerCase();
      if (weather === "clouds" || weather === "rain") {
        return `url(${Clouds})`;
      } else if (weather === "clear" || weather === "sunny") {
        return `url(${SunnyClear})`;
      } else if (weather === "fog" || weather === "mist") {
        return `url(${FogMist})`;
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

  const weatherBackground = {
    backgroundImage: getBackgroundImage(),
    backgroundSize: "cover",
    transition: "background-image 2.5s ease",
  };
  return (
    <div style={weatherBackground} className="min-h-screen w-full">
      <div className="flex items-center justify-center h-screen flex-col px-4 text-white font-semibold">
        <div className="w-full max-w-4xl">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Weather</h1>
            {weatherData && (
              <div className="flex items-center">
                <p className="font-semibold text-lg">
                  {weatherData.weather[0].main}
                </p>
                <img
                  id="wicon"
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  className="w-24 animate__animated animate__swing"
                />
              </div>
            )}
          </div>
          <SearchForm
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Alert />
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                {/* Celsius (°C) = Kelvin (K) - 273.15 */}
                {(weatherData.main.temp - 273.15).toFixed(2)}°C
              </h1>
              <h3>{weatherData.name}</h3>
              <p>{currentDay}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 animate__animated animate__fadeIn">
                <div className="bg-primary rounded-md p-2 cursor-pointer  text-center">
                  Feels Like Temperature
                  <p>{(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
                </div>
                <div className="bg-primary rounded-md p-2 cursor-pointer  text-center">
                  Ground Level Pressure
                  <p>{weatherData.main.grnd_level} hPa</p>
                </div>
                <div className="bg-primary rounded-md p-2 text-center">
                  Humidity
                  <p>{weatherData.main.humidity}%</p>
                </div>
                <div className="bg-primary rounded-md p-2 text-center">
                  Pressure
                  <p>{weatherData.main.pressure} hPa</p>
                </div>
                <div className="bg-primary rounded-md p-2 text-center">
                  Sea Level Pressure
                  <p>{weatherData.main.sea_level} hPa</p>
                </div>
                <div className="bg-primary rounded-md p-2 text-center">
                  Temperature
                  <p>{(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                </div>
                <div className="bg-primary rounded-md p-2 text-center">
                  Maximum Temperature
                  <p>{(weatherData.main.temp_max - 273.15).toFixed(2)}°C</p>
                </div>
                <div className="bg-primary rounded-md p-2 text-center">
                  Minimum Temperature
                  <p>{(weatherData.main.temp_min - 273.15).toFixed(2)}°C</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
