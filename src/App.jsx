import DayWeatherPage from "./pages/DayWeatherPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/daily-weather/:id" element={<DayWeatherPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
