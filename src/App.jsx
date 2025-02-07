import { useState } from "react";

function App() {
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

  // states
  const [searchedCity, setSearchedCity] = useState("");
  const [cityArray, setCityArray] = useState([]);
  const [weatherResult, setWeatherResult] = useState({});

  // location function with fetch on form submit
  const fetchLocation = (form) => {
    form.preventDefault();
    const formCity = form.target.city.value;

    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://us1.locationiq.com/v1/search?addressdetails=1&normalizeaddress=1&q=${formCity}&format=json&limit=10&key=pk.5de778617138b4b5dc62d48a839fa325`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCityArray(res);
      })
      .catch((err) => console.error(err));
  };

  // function to convert date
  const convertDate = (date) => {
    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
  };

  // function to get wheather
  const getWheather = (city) => {
    setSearchedCity("");
    setCityArray([]);
    const latitude = city.lat;
    const longitude = city.lon;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&past_days=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherResult(data);
        console.log(data);
      });
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

  const findImage = (code) => {
    const chiavi = Object.keys(weatherCodes);
    const valori = Object.values(weatherCodes);

    return valori[chiavi.indexOf(String(code))].day.image;
  };

  return (
    <>
      <div className="mx-auto bg-sky-800 min-h-screen h-full flex flex-col items-center pb-50">
        <h1 className="text-7xl font-bold text-white text-center py-15">
          WheatherApp⛅
        </h1>
        <form
          onSubmit={(e) => fetchLocation(e)}
          className="flex gap-5 w-1/2 mx-auto"
        >
          <input
            onChange={(e) => setSearchedCity(e.target.value)}
            name="city"
            type="text"
            className="bg-white text-black flex-1 p-2 px-4 w-1/2 mx-auto rounded-lg outline-none"
            placeholder={"Cerca la tua città"}
            value={searchedCity}
          />
          <input
            type="submit"
            className="bg-white w-25 text-black p-2 cursor-pointer hover:bg-sky-100 mx-auto rounded-lg outline-none"
            value={"Cerca"}
          />
        </form>
        <div className="rounded-lg w-1/2 mx-auto bg-white overflow-hidden mt-5">
          {cityArray &&
            Object.entries(cityArray).map(([key, value]) => (
              <div
                key={key}
                onClick={() => getWheather(value)}
                className="bg-white  mx-auto p-2 px-4 text-nowrap  text-r outline-none cursor-pointer hover:bg-sky-100"
              >
                {value.display_name}
              </div>
            ))}
        </div>

        {/* table */}
        {weatherResult.daily && weatherResult.daily.weather_code && (
          <table className="lg:w-50/100 mx-auto mt-5 text-center text-white bg-sky-500 border table-auto">
            <thead className="border">
              <tr className="h-10">
                <th>Giorno</th>
                <th>Generale</th>
                <th>Massima</th>
                <th>Minima</th>
                <th>Probabilità precipitazione</th>
                <th>Quantità precipitazione</th>
              </tr>
            </thead>
            <tbody>
              {/* ieri */}
              <tr className=" border h-20">
                <td>
                  <div className="text-xl font-bold">Ieri</div>
                  <div className="text-sm">
                    {convertDate(weatherResult.daily.time[0])}
                  </div>
                </td>
                <td>
                  <img
                    className="w-50/100 mx-auto"
                    src={findImage(weatherResult.daily.weather_code[0])}
                    alt=""
                  />
                </td>
                <td>{weatherResult.daily.temperature_2m_max[0]}°C</td>
                <td>{weatherResult.daily.temperature_2m_min[0]}°C</td>
                <td>{weatherResult.daily.precipitation_probability_max[0]}%</td>
                <td>{weatherResult.daily.precipitation_sum[0]} mm</td>
              </tr>

              {/* oggi */}
              <tr className="bg-sky-400 border h-20">
                <td>
                  <div className="text-xl font-bold">Oggi</div>
                  <div className="text-sm">
                    {convertDate(weatherResult.daily.time[1])}
                  </div>
                </td>
                <td>
                  <img
                    className="w-50/100 mx-auto"
                    src={findImage(weatherResult.daily.weather_code[1])}
                    alt=""
                  />
                </td>
                <td>{weatherResult.daily.temperature_2m_max[1]}°C</td>
                <td>{weatherResult.daily.temperature_2m_min[1]}°C</td>
                <td>{weatherResult.daily.precipitation_probability_max[1]}%</td>
                <td>{weatherResult.daily.precipitation_sum[1]} mm</td>
              </tr>

              {/* domani */}
              <tr className="border h-20">
                <td>
                  <div className="text-xl font-bold">{weekDays[1]}</div>
                  <div className="text-sm">
                    {convertDate(weatherResult.daily.time[2])}
                  </div>
                </td>
                <td>
                  <img
                    className="w-50/100 mx-auto"
                    src={findImage(weatherResult.daily.weather_code[2])}
                    alt=""
                  />
                </td>
                <td>{weatherResult.daily.temperature_2m_max[2]}°C</td>
                <td>{weatherResult.daily.temperature_2m_min[2]}°C</td>
                <td>{weatherResult.daily.precipitation_probability_max[2]}%</td>
                <td>{weatherResult.daily.precipitation_sum[2]} mm</td>
              </tr>

              {/* dopo domani */}
              <tr className="border h-20">
                <td>
                  <div className="text-xl font-bold">{weekDays[2]}</div>
                  <div className="text-sm">
                    {convertDate(weatherResult.daily.time[3])}
                  </div>
                </td>
                <td>
                  <img
                    className="w-50/100 mx-auto"
                    src={findImage(weatherResult.daily.weather_code[3])}
                    alt=""
                  />
                </td>
                <td>{weatherResult.daily.temperature_2m_max[3]}°C</td>
                <td>{weatherResult.daily.temperature_2m_min[3]}°C</td>
                <td>{weatherResult.daily.precipitation_probability_max[3]}%</td>
                <td>{weatherResult.daily.precipitation_sum[3]} mm</td>
              </tr>

              {/* dopo dopo domani */}
              <tr className="border h-20">
                <td>
                  <div className="text-xl font-bold">{weekDays[3]}</div>
                  <div className="text-sm">
                    {convertDate(weatherResult.daily.time[4])}
                  </div>
                </td>
                <td>
                  <img
                    className="w-50/100 mx-auto"
                    src={findImage(weatherResult.daily.weather_code[4])}
                    alt="cia"
                  />
                </td>
                <td>{weatherResult.daily.temperature_2m_max[4]}°C</td>
                <td>{weatherResult.daily.temperature_2m_min[4]}°C</td>
                <td>{weatherResult.daily.precipitation_probability_max[4]}%</td>
                <td>{weatherResult.daily.precipitation_sum[4]} mm</td>
              </tr>
              {/* dopo dopo domani */}
              <tr className="border h-20">
                <td>
                  <div className="text-xl font-bold">{weekDays[4]}</div>
                  <div className="text-sm">
                    {convertDate(weatherResult.daily.time[5])}
                  </div>
                </td>
                <td>
                  <img
                    className="w-50/100 mx-auto"
                    src={findImage(weatherResult.daily.weather_code[5])}
                    alt=""
                  />
                </td>
                <td>{weatherResult.daily.temperature_2m_max[5]}°C</td>
                <td>{weatherResult.daily.temperature_2m_min[5]}°C</td>
                <td>{weatherResult.daily.precipitation_probability_max[5]}%</td>
                <td>{weatherResult.daily.precipitation_sum[5]} mm</td>
              </tr>
              {/* dopo dopo domani */}
              <tr className="border h-20">
                <td>
                  <div className="text-xl font-bold">{weekDays[5]}</div>
                  <div className="text-sm">
                    {convertDate(weatherResult.daily.time[6])}
                  </div>
                </td>
                <td>
                  <img
                    className="w-50/100 mx-auto"
                    src={findImage(weatherResult.daily.weather_code[6])}
                    alt=""
                  />
                </td>
                <td>{weatherResult.daily.temperature_2m_max[6]}°C</td>
                <td>{weatherResult.daily.temperature_2m_min[6]}°C</td>
                <td>{weatherResult.daily.precipitation_probability_max[6]}%</td>
                <td>{weatherResult.daily.precipitation_sum[6]} mm</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default App;
