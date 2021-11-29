import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [isFahrenheit, setTempType] = useState(true);
  const [temp, currentTemp] = useState(0);
  const apiURL = process.env.REACT_APP_BASE_URL;

  const getCoordinates = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  useEffect(() => {
    async function fetchData() {
      const position = await getCoordinates();
      const data = await axios.get(
        `${apiURL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=imperial`
      );
      setWeather(data.data);
      currentTemp(data.data.main.temp);
    }
    fetchData();
  }, [apiURL]);

  const convertTemp = (temp) => {
    if (isFahrenheit) {
      temp = Math.round((temp - 32) * (5 / 9) * 100) / 100;
    } else {
      temp = Math.round((temp * (9 / 5) + 32) * 100) / 100;
    }
    currentTemp(temp);
    return temp;
  };

  return weather ? (
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <h1>{weather.name}</h1>
      <h2>{`${temp} \u00b0 ${isFahrenheit ? 'F' : 'C'}`}</h2>
      <button
        onClick={() => {
          setTempType(!isFahrenheit);
          convertTemp(temp);
        }}
      >
        Celsius / Fahrenheit
      </button>
    </div>
  ) : null;
};
