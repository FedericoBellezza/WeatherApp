import { useParams } from "react-router";

export default function DayWeatherPage() {
  const { lat, lon, day } = useParams();
  console.log(lat, lon, day);

  return (
    <div className="p-10 ">
      <h1>
        <div className="text-3xl mb-5">DayWeatherPage</div>
        <div>Latitudine: {lat}</div>
        <div>Longitudine: {lon}</div>
        <div>Giorno: {day}</div>
      </h1>
    </div>
  );
}
