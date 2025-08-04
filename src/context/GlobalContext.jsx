import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  // states
  const [searchedCity, setSearchedCity] = useState("");
  const [cityArray, setCityArray] = useState([]);
  const [weatherResult, setWeatherResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // location function with fetch on form submit
  const fetchLocation = (form) => {
    form.preventDefault();

    if (!searchedCity) {
      return;
    }
    setWeatherResult([]);
    setCityArray([]);
    setIsLoading(true);
    const formCity = form.target.city.value;

    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://us1.locationiq.com/v1/search?addressdetails=1&normalizeaddress=1&q=${formCity}&format=json&limit=10&key=pk.5de778617138b4b5dc62d48a839fa325`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);

        console.log(res);
        setCityArray(res);
      })
      .catch((err) => console.error(err));
  };

  // function to get wheather from coordinates
  const getWheather = (city) => {
    setIsLoading(true);
    console.log(city.address.city);

    setCityArray([]);
    const latitude = city.lat;
    const longitude = city.lon;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=relative_humidity_2m,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,cloud_cover,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&past_days=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);

        setWeatherResult(data);
        console.log(data);
        setSearchedCity(city);
      })
      .catch((err) => console.error(err));
  };

  // function to convert date from yyyy-mm-dd to dd-mm-yyyy
  const convertDate = (date) => {
    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
  };

  // weather codes
  const weatherCodes = {
    0: {
      day: {
        description: "Sunny",
        image: "http://openweathermap.org/img/wn/01d@2x.png",
      },
      night: {
        description: "Clear",
        image: "http://openweathermap.org/img/wn/01n@2x.png",
      },
    },
    1: {
      day: {
        description: "Mainly Sunny",
        image: "http://openweathermap.org/img/wn/01d@2x.png",
      },
      night: {
        description: "Mainly Clear",
        image: "http://openweathermap.org/img/wn/01n@2x.png",
      },
    },
    2: {
      day: {
        description: "Partly Cloudy",
        image: "http://openweathermap.org/img/wn/02d@2x.png",
      },
      night: {
        description: "Partly Cloudy",
        image: "http://openweathermap.org/img/wn/02n@2x.png",
      },
    },
    3: {
      day: {
        description: "Cloudy",
        image: "http://openweathermap.org/img/wn/03d@2x.png",
      },
      night: {
        description: "Cloudy",
        image: "http://openweathermap.org/img/wn/03n@2x.png",
      },
    },
    45: {
      day: {
        description: "Foggy",
        image: "http://openweathermap.org/img/wn/50d@2x.png",
      },
      night: {
        description: "Foggy",
        image: "http://openweathermap.org/img/wn/50n@2x.png",
      },
    },
    48: {
      day: {
        description: "Rime Fog",
        image: "http://openweathermap.org/img/wn/50d@2x.png",
      },
      night: {
        description: "Rime Fog",
        image: "http://openweathermap.org/img/wn/50n@2x.png",
      },
    },
    51: {
      day: {
        description: "Light Drizzle",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Light Drizzle",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    53: {
      day: {
        description: "Drizzle",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Drizzle",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    55: {
      day: {
        description: "Heavy Drizzle",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Heavy Drizzle",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    56: {
      day: {
        description: "Light Freezing Drizzle",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Light Freezing Drizzle",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    57: {
      day: {
        description: "Freezing Drizzle",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Freezing Drizzle",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    61: {
      day: {
        description: "Light Rain",
        image: "http://openweathermap.org/img/wn/10d@2x.png",
      },
      night: {
        description: "Light Rain",
        image: "http://openweathermap.org/img/wn/10n@2x.png",
      },
    },
    63: {
      day: {
        description: "Rain",
        image: "http://openweathermap.org/img/wn/10d@2x.png",
      },
      night: {
        description: "Rain",
        image: "http://openweathermap.org/img/wn/10n@2x.png",
      },
    },
    65: {
      day: {
        description: "Heavy Rain",
        image: "http://openweathermap.org/img/wn/10d@2x.png",
      },
      night: {
        description: "Heavy Rain",
        image: "http://openweathermap.org/img/wn/10n@2x.png",
      },
    },
    66: {
      day: {
        description: "Light Freezing Rain",
        image: "http://openweathermap.org/img/wn/10d@2x.png",
      },
      night: {
        description: "Light Freezing Rain",
        image: "http://openweathermap.org/img/wn/10n@2x.png",
      },
    },
    67: {
      day: {
        description: "Freezing Rain",
        image: "http://openweathermap.org/img/wn/10d@2x.png",
      },
      night: {
        description: "Freezing Rain",
        image: "http://openweathermap.org/img/wn/10n@2x.png",
      },
    },
    71: {
      day: {
        description: "Light Snow",
        image: "http://openweathermap.org/img/wn/13d@2x.png",
      },
      night: {
        description: "Light Snow",
        image: "http://openweathermap.org/img/wn/13n@2x.png",
      },
    },
    73: {
      day: {
        description: "Snow",
        image: "http://openweathermap.org/img/wn/13d@2x.png",
      },
      night: {
        description: "Snow",
        image: "http://openweathermap.org/img/wn/13n@2x.png",
      },
    },
    75: {
      day: {
        description: "Heavy Snow",
        image: "http://openweathermap.org/img/wn/13d@2x.png",
      },
      night: {
        description: "Heavy Snow",
        image: "http://openweathermap.org/img/wn/13n@2x.png",
      },
    },
    77: {
      day: {
        description: "Snow Grains",
        image: "http://openweathermap.org/img/wn/13d@2x.png",
      },
      night: {
        description: "Snow Grains",
        image: "http://openweathermap.org/img/wn/13n@2x.png",
      },
    },
    80: {
      day: {
        description: "Light Showers",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Light Showers",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    81: {
      day: {
        description: "Showers",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Showers",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    82: {
      day: {
        description: "Heavy Showers",
        image: "http://openweathermap.org/img/wn/09d@2x.png",
      },
      night: {
        description: "Heavy Showers",
        image: "http://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    85: {
      day: {
        description: "Light Snow Showers",
        image: "http://openweathermap.org/img/wn/13d@2x.png",
      },
      night: {
        description: "Light Snow Showers",
        image: "http://openweathermap.org/img/wn/13n@2x.png",
      },
    },
    86: {
      day: {
        description: "Snow Showers",
        image: "http://openweathermap.org/img/wn/13d@2x.png",
      },
      night: {
        description: "Snow Showers",
        image: "http://openweathermap.org/img/wn/13n@2x.png",
      },
    },
    95: {
      day: {
        description: "Thunderstorm",
        image: "http://openweathermap.org/img/wn/11d@2x.png",
      },
      night: {
        description: "Thunderstorm",
        image: "http://openweathermap.org/img/wn/11n@2x.png",
      },
    },
    96: {
      day: {
        description: "Light Thunderstorms With Hail",
        image: "http://openweathermap.org/img/wn/11d@2x.png",
      },
      night: {
        description: "Light Thunderstorms With Hail",
        image: "http://openweathermap.org/img/wn/11n@2x.png",
      },
    },
    99: {
      day: {
        description: "Thunderstorm With Hail",
        image: "http://openweathermap.org/img/wn/11d@2x.png",
      },
      night: {
        description: "Thunderstorm With Hail",
        image: "http://openweathermap.org/img/wn/11n@2x.png",
      },
    },
  };

  // function to find image
  const findImage = (code) => {
    const chiavi = Object.keys(weatherCodes);
    const valori = Object.values(weatherCodes);

    return valori[chiavi.indexOf(String(code))].day.image;
  };

  // data to export
  const data = {
    searchedCity,
    setSearchedCity,
    cityArray,
    setCityArray,
    weatherResult,
    setWeatherResult,
    isLoading,
    setIsLoading,
    fetchLocation,
    getWheather,
    convertDate,
    findImage,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
