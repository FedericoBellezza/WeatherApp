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
    findImage,
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
          onSubmit={(e) => {
            e.preventDefault();
            !isLoading && !weatherResult.daily
              ? fetchLocation(e)
              : setWeatherResult([]),
              setSearchedCity("");
          }}
          className="flex flex-col xl:flex-row gap-5 w-80/100 xl:w-1/2 mx-auto"
        >
          {/* searchbar */}
          <input
            onChange={(e) => setSearchedCity(e.target.value)}
            name="city"
            type="text"
            className={`bg-white text-black flex-1 p-2 px-4  mx-auto rounded-lg outline-none w-full ${
              weatherResult.daily ? "hidden" : ""
            }`}
            placeholder={"Cerca la tua città"}
            value={searchedCity}
          />
          {/* search button */}
          <input
            type="submit"
            className="bg-white px-4 scale-80 lg:scale-100 text-black p-2 cursor-pointer hover:bg-sky-100 mx-auto rounded-lg outline-none"
            value={`${weatherResult.daily ? "Cerca un'altrà città" : "Cerca"}`}
          />
        </form>
        <h2 className="text-3xl font-bold text-white mt-10">
          {searchedCity.address && searchedCity.address.city}
        </h2>
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
          <div className="xl:w-60/100  w-90/100 mx-auto mt-5 text-center text-white bg-linear-to-tr from-sky-600 to-sky-500  rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-3 bg-sky-500 font-bold">
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
            <hr />

            {/* yesterday */}
            <Link
              to={`/daily-weather/0`}
              className="flex justify-between items-center p-3 "
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
              to={`/daily-weather/1`}
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
              to={`/daily-weather/2`}
              className="flex justify-between items-center p-3 "
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
              to={`/daily-weather/3`}
              className="flex justify-between items-center p-3 "
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
              to={`/daily-weather/4`}
              className="flex justify-between items-center p-3 "
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
              to={`/daily-weather/5`}
              className="flex justify-between items-center p-3 "
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
