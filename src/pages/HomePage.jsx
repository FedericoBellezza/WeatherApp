import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  // get data from context
  const {
    searchedCity,
    setSearchedCity,
    cityArray,
    weatherResult,
    setWeatherResult,
    isLoading,
    convertDate,
    fetchLocation,
    getWheather,
    findImage,
  } = useGlobalContext();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWheather({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  return (
    <>
      <div className={`flex-col items-center ${isLoading ? "flex" : "hidden"}`}>
        <i className="fa-solid fa-circle-notch fixed text-[15rem] animate-spin text-white top-90 "></i>
      </div>
      <div className="fixed top-0 left-0 w-screen h-screen bg-background -z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-8">
          WeatherApp⛅
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            !isLoading && !weatherResult.daily
              ? fetchLocation(e)
              : setWeatherResult([]),
              setSearchedCity("");
          }}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8 justify-center"
        >
          <Input
            onChange={(e) => setSearchedCity(e.target.value)}
            name="city"
            type="text"
            className={`flex-1 ${weatherResult.daily ? "hidden" : ""}`}
            placeholder="Search for your city"
            value={searchedCity}
          />
          <Button type="submit" className="w-full sm:w-auto cursor-pointer">
            {weatherResult.daily ? "Search for another city" : "Search"}
          </Button>
        </form>

        {cityArray && cityArray.length > 0 && (
          <Card className="max-w-xl mx-auto mb-8">
            <CardContent className="p-0">
              {Object.entries(cityArray).map(([key, value]) => (
                <div
                  key={key}
                  onClick={() => getWheather(value)}
                  className="p-4 cursor-pointer hover:bg-muted"
                >
                  {value.display_name}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {weatherResult.daily && weatherResult.daily.weather_code && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className=" mx-auto mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {searchedCity
                    ? `Weekly Forecast for ${searchedCity}`
                    : "Weekly Forecast"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
                  {weatherResult.daily.time.map((time, index) => (
                    <Link to={`/daily-weather/${index}`} key={time}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-lg text-center  ${
                          index === 1
                            ? "bg-gradient-to-br from-sky-500 to-sky-300 text-gray-100"
                            : "bg-gradient-to-br from-sky-100 to-sky-300 text-gray-800"
                        }`}
                      >
                        <p className="font-semibold">
                          {
                            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                              new Date(time).getDay()
                            ]
                          }
                        </p>
                        <p className="text-sm">{convertDate(time)}</p>
                        <img
                          src={findImage(
                            weatherResult.daily.weather_code[index]
                          )}
                          alt="weather icon"
                          className="w-20 h-20 mx-auto my-2"
                        />
                        <div>
                          <span className="font-bold">
                            {weatherResult.daily.temperature_2m_max[index]}°C
                          </span>
                          <span className="text-sm">
                            {" "}
                            / {weatherResult.daily.temperature_2m_min[index]}°C
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Today's Highlight
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    {weatherResult.hourly.time
                      .slice(0, 5)
                      .map((time, index) => (
                        <div key={time} className="text-center">
                          <p className="text-sm">
                            {new Date(time).getHours()}:00
                          </p>
                          <img
                            src={findImage(
                              weatherResult.hourly.weather_code[index]
                            )}
                            alt="weather icon"
                            className="w-10 h-10 mx-auto"
                          />
                          <p className="font-semibold">
                            {weatherResult.hourly.temperature_2m[index]}°C
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wind</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-4xl font-bold">
                      {weatherResult.current.wind_speed_10m}
                      <span className="text-xl">km/h</span>
                    </p>
                    <p className="text-lg">
                      Direction: {weatherResult.current.wind_direction_10m}°
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Humidity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-4xl font-bold">
                      {weatherResult.current.relative_humidity_2m}
                      <span className="text-xl">%</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>UV Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-4xl font-bold">
                      {weatherResult.daily.uv_index_max[0]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
