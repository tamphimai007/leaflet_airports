import MapLeaflet from "./components/MapLeaflet";
import Login from "./components/auth/Login";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<MapLeaflet />} />
      </Routes>
    </>
  );
}

export default App;
