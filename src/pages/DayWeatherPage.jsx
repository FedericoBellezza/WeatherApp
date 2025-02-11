import { useParams } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";

export default function DayWeatherPage() {
  const { searchedCity, setWeatherResult } = useGlobalContext();

  useEffect(() => {
    // function to get wheather from coordinates
    const getWheatherHourly = (city) => {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&past_days=1`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherResult(data);
          console.log(data);
        })
        .catch((err) => console.error(err));
    };
  }, []);

  return (
    <>
      {/* background */}
      <div className="fixed top-0 left-0 w-screen h-screen  bg-linear-to-tr from-cyan-500 to-sky-700 z-[-2]"></div>
      <i className="fa-solid fa-sun text-[30rem] xl:text-[60rem] text-white fixed opacity-35 xl:top-30 xl:left-[-10rem] top-100 left-[-15rem]  z-[-1]"></i>

      <div className="mx-auto my-0 max-w-screen overflow-hidden bg-linear-to-tr  min-h-screen h-full flex flex-col items-center pb-50 ">
        <h1 className="xl:text-7xl text-4xl font-black text-white text-center py-15">
          {searchedCity}
        </h1>

        <div className="p-10 ">
          <h1 className="text-3xl mb-5">DayWeatherPage</h1>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  );
}
