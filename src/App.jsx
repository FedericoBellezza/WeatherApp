import DayWeatherPage from "./pages/DayWeatherPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/:lat/:lon/:day" element={<DayWeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
