import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function DayWeatherPage() {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const { weatherResult, findImage, convertDate } = useGlobalContext();

  if (!weatherResult.daily) {
    window.location.replace("/");
    return null;
  }

  const getJustTime = (e) => {
    return e.slice(-5);
  };

  const arrayStartId = id * 24;

  const dayData = {
    precipitation_probability:
      weatherResult.daily.precipitation_probability_max[id],
    precipitation_sum: weatherResult.daily.precipitation_sum[id],
    sunrise: getJustTime(weatherResult.daily.sunrise[id]),
    sunset: getJustTime(weatherResult.daily.sunset[id]),
    wind_speed: weatherResult.daily.wind_speed_10m_max[id],
    humidity: weatherResult.hourly.relative_humidity_2m[arrayStartId],
    temp_max: weatherResult.daily.temperature_2m_max[id],
    temp_min: weatherResult.daily.temperature_2m_min[id],
  };

  const hourlyData = weatherResult.hourly.time
    .slice(arrayStartId, arrayStartId + 24)
    .map((time, index) => ({
      time: getJustTime(time),
      temp: weatherResult.hourly.temperature_2m[arrayStartId + index],
      weather_code: weatherResult.hourly.weather_code[arrayStartId + index],
      precipitation_probability:
        weatherResult.hourly.precipitation_probability[arrayStartId + index],
      precipitation: weatherResult.hourly.precipitation[arrayStartId + index],
    }));

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-background -z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 lg:py-12 py-5"
      >
        <div className="mb-8 lg:mb-0">
          <Link to={"/"}>
            <Button className={"cursor-pointer"}>
              <i className="fa-solid fa-arrow-left mr-2"></i> Go back
            </Button>
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {weatherResult.address?.city || "Weather Details"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {convertDate(weatherResult.daily.time[id])}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Precipitation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <i className="fa-solid fa-cloud-rain text-5xl mb-4"></i>
              <p className="text-2xl font-bold">
                {dayData.precipitation_probability}%
              </p>
              <p>{dayData.precipitation_sum} mm</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sunrise & Sunset</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-around">
                <div>
                  <i className="fa-solid fa-sun text-5xl mb-2"></i>
                  <p className="text-lg">{dayData.sunrise}</p>
                </div>
                <div>
                  <i className="fa-solid fa-moon text-5xl mb-2"></i>
                  <p className="text-lg">{dayData.sunset}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Wind & Humidity</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-around">
                <div>
                  <i className="fa-solid fa-wind text-5xl mb-2"></i>
                  <p className="text-lg">{dayData.wind_speed} km/h</p>
                </div>
                <div>
                  <i className="fa-solid fa-water text-5xl mb-2"></i>
                  <p className="text-lg">{dayData.humidity}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Temperature</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-around">
                <div>
                  <i className="fa-solid fa-temperature-arrow-up text-5xl mb-2"></i>
                  <p className="text-lg">{dayData.temp_max}°C</p>
                </div>
                <div>
                  <i className="fa-solid fa-temperature-arrow-down text-5xl mb-2"></i>
                  <p className="text-lg">{dayData.temp_min}°C</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {hourlyData.map((hour) => (
                <div
                  key={hour.time}
                  className="bg-gradient-to-br from-sky-100 to-sky-300 text-gray-800 p-4 rounded-lg text-center"
                >
                  <p className="font-semibold">{hour.time}</p>
                  <img
                    src={findImage(hour.weather_code)}
                    alt="weather icon"
                    className="w-20 h-20 mx-auto my-2"
                  />
                  <p className="font-bold">{hour.temp}°C</p>
                  <p className="text-sm">
                    Rain: {hour.precipitation_probability}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
