import React, { useState, useEffect } from "react";
import BgCloud from "./assets/bg-cloud.jpg";
import BgSun from "./assets/bg-sun.jpg";
import BgMist from "./assets/bg-mist.jpg";
import Bg from "./assets/bg.jpg";
import SearchForm from "./components/SearchForm";
import SunCloud from "./assets/sun-cloud.png";
import { getData } from "./service";
import Loader from "./common/Loader";
import Modal from "./components/Modal";
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("London");
  const [currentDay, setCurrentDay] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await getData(query);
        setTimeout(() => {
          if (response.error) {
            setError(response.error);
            document.getElementById("my_modal_1").showModal();
            setWeatherData(null);
          } else {
            setWeatherData(response);
            setError(false);
          }
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await getData(query);
      setTimeout(() => {
        if (response.error) {
          setError(response.error);
          document.getElementById("my_modal_1").showModal();
          setWeatherData(null);
        } else {
          setWeatherData(response);
          setError(false);
        }
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
      style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover" }}
      className="min-h-screen flex items-center justify-center flex-col px-4"
    >
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl">Weather</h1>
          <img src={SunCloud} alt="" className="w-24" />
        </div>
        <SearchForm query={query} setQuery={setQuery} onSearch={handleSearch} />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <>
            <Modal />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">
              {/* Celsius (°C) = Kelvin (K) - 273.15 */}
              {(weatherData.main.temp - 273.15).toFixed(2)}°C
            </h1>
            <h3>{weatherData.name}</h3>
            <p>{currentDay}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
              <div className="border border-neutral-content rounded-md p-2 cursor-pointer hover:bg-neutral-content hover:text-base-100 text-center">
                Feels Like Temperature
                <p>{(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
              </div>
              <div className="border border-neutral-content rounded-md p-2 cursor-pointer hover:bg-neutral-content hover:text-base-100 text-center">
                Ground Level Pressure
                <p>{weatherData.main.grnd_level} hPa</p>
              </div>
              <div className="border border-neutral-content rounded-md p-2 cursor-pointer hover:bg-neutral-content hover:text-base-100 text-center">
                Humidity
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className="border border-neutral-content rounded-md p-2 cursor-pointer hover:bg-neutral-content hover:text-base-100 text-center">
                Pressure
                <p>{weatherData.main.pressure} hPa</p>
              </div>
              <div className="border border-neutral-content rounded-md p-2 cursor-pointer hover:bg-neutral-content hover:text-base-100 text-center">
                Sea Level Pressure
                <p>{weatherData.main.sea_level} hPa</p>
              </div>
              <div className="border border-neutral-content rounded-md p-2 cursor-pointer hover:bg-neutral-content hover:text-base-100 text-center">
                Temperature
                <p>{(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
              </div>
              <div className="border border-neutral-content rounded-md p-2 cursor-pointer hover:bg-neutral-content hover:text-base-100 text-center">
                Maximum Temperature
                <p>{(weatherData.main.temp_max - 273.15).toFixed(2)}°C</p>
              </div>
              <div className="border border-neutral-content rounded-md p-2 cursor-pointer hover:bg-neutral-content hover:text-base-100 text-center">
                Minimum Temperature
                <p>{(weatherData.main.temp_min - 273.15).toFixed(2)}°C</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
