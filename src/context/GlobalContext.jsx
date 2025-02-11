import { createContext, useContext, useState } from "react";
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
    setSearchedCity(city.address.city);

    setCityArray([]);
    const latitude = city.lat;
    const longitude = city.lon;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&past_days=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);

        setWeatherResult(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  // function to convert date from yyyy-mm-dd to dd-mm-yyyy
  const convertDate = (date) => {
    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
  };

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
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
