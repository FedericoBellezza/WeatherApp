import { useParams } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";

export default function DayWeatherPage() {
  const { id } = useParams();
  const {
    searchedCity,
    setWeatherResult,
    weatherResult,
    findImage,
    convertDate,
  } = useGlobalContext();
  const [isHourly, setIsHourly] = useState(false);

  console.log(id);

  // on page reload
  !searchedCity && window.location.replace("/");

  console.log(weatherResult.daily.precipitation_probability_max);

  const getJustTime = (e) => {
    return e.slice(-5);
  };

  const arrayStartId = id * 24;

  return (
    <>
      {/* background */}
      <div className="fixed top-0 left-0 w-screen h-screen  bg-linear-to-tr from-cyan-500 to-sky-700 z-[-2]"></div>
      <i className="fa-solid fa-sun text-[30rem] xl:text-[60rem] text-white fixed opacity-35 xl:top-30 xl:left-[-10rem] top-100 left-[-15rem]  z-[-1]"></i>

      <div className="mx-auto my-0 max-w-screen overflow-hidden bg-linear-to-tr  min-h-screen h-full flex flex-col items-center pb-50 ">
        <div className="xl:text-5xl lg:text-7xl text-4xl font-black text-white text-center lg:mt-10 pt-10 pb-5">
          {searchedCity ? searchedCity.address.city : "Città non impostata"}
        </div>
        <div className="xl:text-4xl  text-2xl text-white pb-10">
          {convertDate(weatherResult.daily.time[id])}
        </div>

        {/* button  */}
        <div className=" text-white text-center flex flex-col items-center  ">
          <div
            onClick={() => setIsHourly(!isHourly)}
            className={`text-xl lg:text-2xl  mb-15 bg-linear-to-tr from-slate-800 to-sky-800 rounded-2xl px-5 py-2 cursor-pointer`}
          >
            {isHourly ? "Per ora" : "Giornaliero"}
          </div>

          {/* daily display */}
          {!isHourly && (
            <div className="flex flex-wrap flex-row gap-3  justify-between items-center lg:px-50 px-10 w-screen">
              {/* Precipitation probability */}
              <div className="flex flex-col items-center justify-between  md:w-1/5 w-35    gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
                <i className="fa-solid fa-cloud-rain text-5xl lg:text-7xl"></i>
                <div className="md:text-2xl text-lg ">
                  Probabilità <br />
                  {weatherResult.daily.precipitation_probability_max[id]} %
                </div>
              </div>
              {/* Precipitation probability */}
              <div className="flex flex-col items-center justify-between  md:w-1/5 w-35    gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
                <i className="fa-solid fa-umbrella text-5xl lg:text-7xl"></i>
                <div className="md:text-2xl text-lg ">
                  Quantità
                  <br /> {weatherResult.daily.precipitation_sum[id]} mm
                </div>
              </div>
              {/* Precipitation probability */}
              <div className="flex flex-col items-center justify-between md:w-1/5 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
                <i className="fa-solid fa-sun text-5xl lg:text-7xl"></i>
                <div className="md:text-2xl text-lg ">
                  Alba <br /> {getJustTime(weatherResult.daily.sunrise[id])}
                </div>
              </div>
              {/* Precipitation probability */}
              <div className="flex flex-col items-center justify-between md:w-1/5 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
                <i className="fa-solid fa-moon text-5xl lg:text-7xl"></i>
                <div className="md:text-2xl text-lg ">
                  Tramonto <br /> {getJustTime(weatherResult.daily.sunset[id])}
                </div>
              </div>
              {/* Precipitation probability */}
              <div className="flex flex-col items-center justify-between md:w-1/5 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
                <i className="fa-solid fa-wind text-5xl lg:text-7xl"></i>
                <div className="md:text-2xl text-lg ">
                  Vento <br /> {weatherResult.daily.wind_speed_10m_max[id]} km/h
                </div>
              </div>
              {/* Precipitation probability */}
              <div className="flex flex-col items-center justify-between md:w-1/5 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
                <i className="fa-solid fa-water text-5xl lg:text-7xl"></i>
                <div className="md:text-2xl text-lg ">
                  Umidità <br /> {weatherResult.hourly.relative_humidity_2m[id]}{" "}
                  %
                </div>
              </div>
              {/* Precipitation probability */}
              <div className="flex flex-col items-center justify-between md:w-1/5 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
                <i className="fa-solid fa-temperature-arrow-up text-5xl lg:text-7xl"></i>
                <div className="md:text-2xl text-lg ">
                  Massima <br /> {weatherResult.daily.temperature_2m_max[id]} °C
                </div>
              </div>
              {/* Precipitation probability */}
              <div className="flex flex-col items-center justify-between md:w-1/5 w-35   gap-3 bg-linear-to-tr from-sky-800 to-sky-600 border rounded-2xl p-5  ">
                <i className="fa-solid fa-temperature-arrow-down text-5xl lg:text-7xl"></i>
                <div className="md:text-2xl text-lg ">
                  Minima <br /> {weatherResult.daily.temperature_2m_min[id]} °C
                </div>
              </div>
            </div>
          )}
        </div>

        {/* hourly display */}
        {isHourly && (
          <div className=" items-center bg-linear-to-tr from-slate-800 to-sky-800 p-3 rounded-xl w-95/100 lg:w-60/100  text-white">
            {/* header */}
            <div className="flex flex-wrap flex-row      items-center text-center mb-3 ">
              <div className="w-1/4 ">Ora</div>
              <div className="w-1/4 ">Temp</div>
              <div className="w-1/4 ">Tempo</div>
              <div className="w-1/4 ">Pioggie</div>
            </div>
            <hr />
            {/* 00 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId]} °C
              </div>
              <div className="w-1/4 flex justify-center ">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[arrayStartId] !=
                0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[arrayStartId]
                  ? weatherResult.hourly.precipitation[arrayStartId] + " mm"
                  : ""}
              </div>
            </div>
            {/* 02 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 2])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 2]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 2]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 2
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 2
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 2
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 2] + " mm"
                  : ""}
              </div>
            </div>
            {/* 04 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 4])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 4]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 4]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 4
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 4
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 4
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 4] + " mm"
                  : ""}
              </div>
            </div>
            {/* 06 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 6])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 6]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 6]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 6
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 6
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 6
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 6] + " mm"
                  : ""}
              </div>
            </div>
            {/* 08 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 8])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 8]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 8]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 8
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 8
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 8
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 8] + " mm"
                  : ""}
              </div>
            </div>
            {/* 10 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 10])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 10]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 10]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 10
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 10
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 10
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 10] +
                    " mm"
                  : ""}
              </div>
            </div>
            {/* 12 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 12])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 12]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 12]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 12
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 12
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 12
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 12] +
                    " mm"
                  : ""}
              </div>
            </div>
            {/* 14 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 14])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 14]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 14]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 14
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 14
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 14
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 14] +
                    " mm"
                  : ""}
              </div>
            </div>
            {/* 16 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 16])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 16]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 16]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 16
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 16
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 16
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 16] +
                    " mm"
                  : ""}
              </div>
            </div>
            {/* 18 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 18])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 18]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 18]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 18
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 18
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 18
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 18] +
                    " mm"
                  : ""}
              </div>
            </div>
            {/* 20 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 20])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 20]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 20]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 20
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 20
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 20
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 20] +
                    " mm"
                  : ""}
              </div>
            </div>
            {/* 22 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 22])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 22]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 22]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 22
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 22
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 22
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 22] +
                    " mm"
                  : ""}
              </div>
            </div>
            {/* 24 */}
            <div className="flex flex-wrap flex-row      items-center text-center  ">
              <div className="w-1/4">
                {getJustTime(weatherResult.hourly.time[arrayStartId + 24])}
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.temperature_2m[arrayStartId + 24]} °C
              </div>
              <div className="w-1/4 flex justify-center">
                <img
                  src={findImage(
                    weatherResult.hourly.weather_code[arrayStartId + 24]
                  )}
                  alt=""
                />
              </div>
              <div className="w-1/4">
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 24
                ] != 0
                  ? weatherResult.hourly.precipitation_probability[
                      arrayStartId + 24
                    ] + "%"
                  : "Assenti"}
                <br />
                {weatherResult.hourly.precipitation_probability[
                  arrayStartId + 24
                ]
                  ? weatherResult.hourly.precipitation[arrayStartId + 24] +
                    " mm"
                  : ""}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
