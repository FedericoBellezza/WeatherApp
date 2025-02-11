import { useParams } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";

export default function DayWeatherPage() {
  const { lat, lon, day } = useParams();
  console.log(lat, lon, day);

  const { searchedCity } = useGlobalContext();

  return (
    <>
      {/* <div
        className={` flex-col items-center ${isLoading ? "flex" : "hidden"}`}
      >
        <i className="fa-solid fa-circle-notch fixed text-[15rem] animate-spin text-white top-90 "></i>
      </div> */}
      <div className="fixed top-0 left-0 w-screen h-screen  bg-linear-to-tr from-cyan-500 to-sky-700 z-[-2]"></div>
      <i className="fa-solid fa-cloud text-[30rem] xl:text-[60rem] text-white fixed opacity-35 xl:top-30 xl:left-[-10rem] top-100 left-[-15rem]  z-[-1]"></i>
      <div className="mx-auto my-0 max-w-screen overflow-hidden bg-linear-to-tr  min-h-screen h-full flex flex-col items-center pb-50 ">
        <h1 className="xl:text-7xl text-4xl font-black text-white text-center py-15">
          {searchedCity}
        </h1>

        <div className="p-10 ">
          <h1>
            <div className="text-3xl mb-5">DayWeatherPage</div>
            <div>Latitudine: {lat}</div>
            <div>Longitudine: {lon}</div>
            <div>Giorno: {day}</div>
          </h1>
        </div>
      </div>
    </>
  );
}
