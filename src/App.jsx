import { useState } from "react";

function App() {
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const [searchedCity, setSearchedCity] = useState("");
  const [cityArray, setCityArray] = useState([]);

  const fetchLocation = (form) => {
    form.preventDefault();
    const formCity = form.target.city.value;

    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://us1.locationiq.com/v1/search?q=${formCity}&format=json&limit=3&key=pk.5de778617138b4b5dc62d48a839fa325`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCityArray(res);
      })
      .catch((err) => console.error(err));
  };

  // weather fetch
  // const fetchWeather = () => {
  //   fetch(
  //     "https://api.open-meteo.com/v1/forecast?latitude=43.8333&longitude=7.85&hourly=temperature_2m,relative_humidity_2m"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };
  return (
    <>
      <div className="mx-auto bg-sky-800 h-screen flex flex-col items-center">
        <h1 className="text-7xl font-bold text-white text-center py-10">
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
            className="bg-white text-black flex-1 p-2 w-1/2 mx-auto rounded-lg outline-none"
            placeholder={"Cerca la tua città"}
            value={searchedCity}
          />
          <input
            type="submit"
            className="bg-white w-25 text-black p-2 w-1/2 mx-auto rounded-lg outline-none"
            value={"Cerca"}
          />
        </form>
        <div className="rounded-lg w-1/2 mx-auto bg-white overflow-hidden mt-5">
          {cityArray &&
            Object.entries(cityArray).map(([key, value]) => (
              <div
                key={key}
                className="bg-white  mx-auto p-2 px-4   outline-none cursor-pointer hover:bg-sky-100"
              >
                {value.display_name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
