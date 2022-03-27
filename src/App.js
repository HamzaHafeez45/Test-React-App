import React from "react";
import { Routes, Route } from "react-router-dom";
import InformationForm from "./Components/InformationForm";
import InformationTable from "./Components/InformationTable";
import SectorForm from "./Components/SectorForm";
import Welcome from "./Components/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/info" element={<InformationTable />} />
      <Route path="/addInfo" element={<InformationForm />} />
      <Route path="/addSector" element={<SectorForm />} />
    </Routes>
  );
}

export default App;
