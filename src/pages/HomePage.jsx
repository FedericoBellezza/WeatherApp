import { Link } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";

export default function HomePage() {
  // get data from context
  const {
    searchedCity,
    setSearchedCity,
    cityArray,
    setCityArray,
    weatherResult,
    setWeatherResult,
    isLoading,
    setIsLoading,
    convertDate,
    fetchLocation,
    getWheather,
  } = useGlobalContext();

  // time
  let weekDays = [];
  function getGiorniSettimana() {
    const giorniSettimana = [
      "Domenica",
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
    ];
    const oggi = new Date();
    const giornoOggi = oggi.getDay();

    // Aggiungi i giorni da oggi in poi
    for (let i = 0; i < 7; i++) {
      let giornoIndice = (giornoOggi + i) % 7;
      weekDays.push(giorniSettimana[giornoIndice]);
    }

    return weekDays;
  }
  getGiorniSettimana();

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

  return (
    <>
      <div
        className={` flex-col items-center ${isLoading ? "flex" : "hidden"}`}
      >
        <i className="fa-solid fa-circle-notch fixed text-[15rem] animate-spin text-white top-90 "></i>
      </div>
      <div className="fixed top-0 left-0 w-screen h-screen  bg-linear-to-tr from-cyan-500 to-sky-700 z-[-2]"></div>
      <i className="fa-solid fa-cloud text-[30rem] xl:text-[60rem] text-white fixed opacity-35 xl:top-30 xl:left-[-10rem] top-100 left-[-15rem]  z-[-1]"></i>
      <div className="mx-auto my-0 max-w-screen overflow-hidden bg-linear-to-tr  min-h-screen h-full flex flex-col items-center pb-50 ">
        <h1 className="xl:text-7xl text-4xl font-black text-white text-center py-15">
          WheatherApp⛅
        </h1>

        <form
          onSubmit={(e) => (isLoading ? null : fetchLocation(e))}
          className="flex flex-col xl:flex-row gap-5 w-80/100 xl:w-1/2 mx-auto"
        >
          <input
            onChange={(e) => setSearchedCity(e.target.value)}
            name="city"
            type="text"
            className="bg-white text-black flex-1 p-2 px-4  mx-auto rounded-lg outline-none w-full"
            placeholder={"Cerca la tua città"}
            value={searchedCity}
          />
          <input
            type="submit"
            className="bg-white w-25 scale-80 lg:scale-100 text-black p-2 cursor-pointer hover:bg-sky-100 mx-auto rounded-lg outline-none"
            value={"Cerca"}
          />
        </form>
        <div className="rounded-lg w-90/100 xl:w-1/2 mx-auto bg-white overflow-hidden mt-5">
          {cityArray &&
            Object.entries(cityArray).map(([key, value]) => (
              <div
                key={key}
                onClick={() => getWheather(value)}
                className="w-full text-sm lg:text-lg  mx-auto p-2 px-4 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis inline-block bg-white outline-none cursor-pointer hover:bg-sky-100"
              >
                {value.display_name}
              </div>
            ))}
        </div>

        {/* table */}
        {weatherResult.daily && weatherResult.daily.weather_code && (
          <div className="xl:w-60/100  w-90/100 mx-auto mt-5 text-center text-white bg-sky-500  table-fixed rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-3 bg-blue-600 font-bold">
              <p className="w-1/6 text-sm lg:text-lg">Giorno</p>
              <p className="w-1/6 text-sm lg:text-lg">Generale</p>
              <p className="w-1/6 text-sm lg:text-lg">Massima</p>
              <p className="w-1/6 text-sm lg:text-lg">Minima</p>
              <p className="w-1/6 text-sm lg:text-lg">
                Prob<span className="hidden lg:inline">abilità</span> prec.
              </p>
              <p className="hidden lg:block w-1/6 text-sm lg:text-lg">
                Quantità prec.
              </p>
            </div>

            {/* yesterday */}
            <Link
              to={`/daily-weather/${weatherResult.daily.time[0]}`}
              className="flex justify-between items-center p-3 bg-blue-500"
            >
              <div className="w-1/6">
                <p className="lg:inline hidden text-2xl font-bold ">Ieri</p>
                <p className="text-xs text-nowrap md:text-xl">
                  {convertDate(weatherResult.daily.time[0])}
                </p>
              </div>
              <div className="w-1/6 flex justify-center">
                <img src={findImage(weatherResult.daily.weather_code[0])} />
              </div>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_max[0]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_min[0]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.precipitation_probability_max[0]}%
              </p>
              <p className="hidden lg:block w-1/6">
                {weatherResult.daily.precipitation_sum[0]} mm
              </p>
            </Link>

            {/* today */}
            <Link
              to={`/daily-weather/${weatherResult.daily.time[1]}`}
              className="flex justify-between items-center p-3 bg-blue-400"
            >
              <div className="w-1/6">
                <p className="lg:inline hidden text-2xl font-bold ">Oggi</p>
                <p className="text-xs text-nowrap md:text-xl">
                  {convertDate(weatherResult.daily.time[1])}
                </p>
              </div>
              <div className="w-1/6 flex justify-center">
                <img src={findImage(weatherResult.daily.weather_code[1])} />
              </div>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_max[1]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_min[1]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.precipitation_probability_max[1]}%
              </p>
              <p className="hidden lg:block w-1/6">
                {weatherResult.daily.precipitation_sum[1]} mm
              </p>
            </Link>

            {/* tomorrow */}
            <Link
              to={`/daily-weather/${weatherResult.daily.time[2]}`}
              className="flex justify-between items-center p-3 bg-blue-500"
            >
              <div className="w-1/6">
                <p className="lg:inline hidden text-2xl font-bold ">Domani</p>
                <p className="text-xs text-nowrap md:text-xl">
                  {convertDate(weatherResult.daily.time[2])}
                </p>
              </div>
              <div className="w-1/6 flex justify-center">
                <img src={findImage(weatherResult.daily.weather_code[2])} />
              </div>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_max[2]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_min[2]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.precipitation_probability_max[2]}%
              </p>
              <p className="hidden lg:block w-1/6">
                {weatherResult.daily.precipitation_sum[2]} mm
              </p>
            </Link>

            {/* in 2 days */}
            <Link
              to={`/daily-weather/${weatherResult.daily.time[3]}`}
              className="flex justify-between items-center p-3 bg-blue-500"
            >
              <div className="w-1/6">
                <p className="lg:inline hidden text-2xl font-bold ">
                  Tra 2 giorni
                </p>
                <p className="text-xs text-nowrap md:text-xl">
                  {convertDate(weatherResult.daily.time[3])}
                </p>
              </div>
              <div className="w-1/6 flex justify-center">
                <img src={findImage(weatherResult.daily.weather_code[3])} />
              </div>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_max[3]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_min[3]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.precipitation_probability_max[3]}%
              </p>
              <p className="hidden lg:block w-1/6">
                {weatherResult.daily.precipitation_sum[3]} mm
              </p>
            </Link>

            {/* In 3 days */}
            <Link
              to={`/daily-weather/${weatherResult.daily.time[4]}`}
              className="flex justify-between items-center p-3 bg-blue-500"
            >
              <div className="w-1/6">
                <p className="lg:inline hidden text-2xl font-bold ">
                  Tra 3 giorni
                </p>
                <p className="text-xs text-nowrap md:text-xl">
                  {convertDate(weatherResult.daily.time[4])}
                </p>
              </div>
              <div className="w-1/6 flex justify-center">
                <img src={findImage(weatherResult.daily.weather_code[4])} />
              </div>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_max[4]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_min[4]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.precipitation_probability_max[4]}%
              </p>
              <p className="hidden lg:block w-1/6">
                {weatherResult.daily.precipitation_sum[4]} mm
              </p>
            </Link>

            {/* In 4 days */}
            <Link
              to={`/daily-weather/${weatherResult.daily.time[5]}`}
              className="flex justify-between items-center p-3 bg-blue-500"
            >
              <div className="w-1/6">
                <p className="lg:inline hidden text-2xl font-bold ">
                  Tra 4 giorni
                </p>
                <p className="text-xs text-nowrap md:text-xl">
                  {convertDate(weatherResult.daily.time[5])}
                </p>
              </div>
              <div className="w-1/6 flex justify-center">
                <img src={findImage(weatherResult.daily.weather_code[5])} />
              </div>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_max[5]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.temperature_2m_min[5]}°C
              </p>
              <p className="w-1/6">
                {weatherResult.daily.precipitation_probability_max[5]}%
              </p>
              <p className="hidden lg:block w-1/6">
                {weatherResult.daily.precipitation_sum[5]} mm
              </p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
