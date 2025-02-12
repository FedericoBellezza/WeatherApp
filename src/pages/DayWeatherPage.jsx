import { useParams } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";

export default function DayWeatherPage() {
  const { id } = useParams();
  const { searchedCity, setWeatherResult, weatherResult } = useGlobalContext();
  const [isHourly, setIsHourly] = useState(false);

  console.log(id);

  // on page reload
  !searchedCity && window.location.replace("/");

  console.log(weatherResult.daily.precipitation_probability_max);

  const getJustTime = (e) => {
    return e.slice(-5);
  };

  return (
    <>
      {/* background */}
      <div className="fixed top-0 left-0 w-screen h-screen  bg-linear-to-tr from-cyan-500 to-sky-700 z-[-2]"></div>
      <i className="fa-solid fa-sun text-[30rem] xl:text-[60rem] text-white fixed opacity-35 xl:top-30 xl:left-[-10rem] top-100 left-[-15rem]  z-[-1]"></i>

      <div className="mx-auto my-0 max-w-screen overflow-hidden bg-linear-to-tr  min-h-screen h-full flex flex-col items-center pb-50 ">
        <h1 className="xl:text-5xl lg:text-7xl text-4xl font-black text-white text-center lg:mt-10 py-10">
          {searchedCity ? searchedCity.address.city : "Città non impostata"}
        </h1>

        <div className=" text-white text-center flex flex-col items-center  ">
          <div
            onClick={() => setIsHourly(!isHourly)}
            className={`text-xl lg:text-5xl font-thin mb-15 bg-linear-to-tr from-slate-800 to-sky-800 rounded-2xl px-5 py-2  w-50/100`}
          >
            {isHourly ? "Per ora" : "Giornaliero"}
          </div>

          <div className="flex flex-wrap flex-row  gap-3 lg:gap-5  justify-between items-center lg:px-50 px-10 w-screen">
            {/* Precipitation probability */}
            <div className="flex flex-col items-center justify-between  md:w-50 w-35    gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
              <i className="fa-solid fa-cloud-rain text-5xl lg:text-7xl"></i>
              <div className="md:text-2xl text-lg ">
                Probabilità <br />
                {weatherResult.daily.precipitation_probability_max[id]} %
              </div>
            </div>
            {/* Precipitation probability */}
            <div className="flex flex-col items-center justify-between  md:w-50 w-35    gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
              <i className="fa-solid fa-umbrella text-5xl lg:text-7xl"></i>
              <div className="md:text-2xl text-lg ">
                Quantità
                <br /> {weatherResult.daily.precipitation_sum[id]} mm
              </div>
            </div>
            {/* Precipitation probability */}
            <div className="flex flex-col items-center justify-between md:w-50 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
              <i className="fa-solid fa-sun text-5xl lg:text-7xl"></i>
              <div className="md:text-2xl text-lg ">
                Alba <br /> {getJustTime(weatherResult.daily.sunrise[id])}
              </div>
            </div>
            {/* Precipitation probability */}
            <div className="flex flex-col items-center justify-between md:w-50 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
              <i className="fa-solid fa-moon text-5xl lg:text-7xl"></i>
              <div className="md:text-2xl text-lg ">
                Tramonto <br /> {getJustTime(weatherResult.daily.sunset[id])}
              </div>
            </div>
            {/* Precipitation probability */}
            <div className="flex flex-col items-center justify-between md:w-50 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
              <i className="fa-solid fa-wind text-5xl lg:text-7xl"></i>
              <div className="md:text-2xl text-lg ">
                Vento <br /> {weatherResult.daily.wind_speed_10m_max[id]} km/h
              </div>
            </div>
            {/* Precipitation probability */}
            <div className="flex flex-col items-center justify-between md:w-50 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
              <i className="fa-solid fa-water text-5xl lg:text-7xl"></i>
              <div className="md:text-2xl text-lg ">
                Umidità <br /> {weatherResult.hourly.relative_humidity_2m[id]} %
              </div>
            </div>
            {/* Precipitation probability */}
            <div className="flex flex-col items-center justify-between md:w-50 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
              <i className="fa-solid fa-temperature-arrow-up text-5xl lg:text-7xl"></i>
              <div className="md:text-2xl text-lg ">
                Massima <br /> {weatherResult.daily.temperature_2m_max[id]} °C
              </div>
            </div>
            {/* Precipitation probability */}
            <div className="flex flex-col items-center justify-between md:w-50 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
              <i className="fa-solid fa-temperature-arrow-down text-5xl lg:text-7xl"></i>
              <div className="md:text-2xl text-lg ">
                Minima <br /> {weatherResult.daily.temperature_2m_min[id]} °C
              </div>
            </div>
          </div>

          {/* <ul className=" text-xl">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li>Wind: {weatherResult.daily.wind_speed_10m_max[id]} km/h</li>
            <li>Temp max: {weatherResult.daily.temperature_2m_max[id]} °C</li>
            <li>Temp min: {weatherResult.daily.temperature_2m_min[id]} °C</li>
            <li>Weather code: {weatherResult.daily.weather_code[id]}</li>
            <li>Humidity: {weatherResult.hourly.relative_humidity_2m[id]} %</li>
          </ul> */}
        </div>
      </div>
    </>
  );
}
