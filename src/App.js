import React from "react";
import { Routes, Route } from "react-router-dom";
import InformationForm from "./Components/InformationForm";
import InformationTable from "./Components/InformationTable";
import EditForm from "./Components/editInformation";
import Welcome from "./Components/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/info" element={<InformationTable />} />
      <Route path="/addInfo" element={<InformationForm />} />
      <Route path="/editInfo/:id" element={<EditForm />} />
    </Routes>
  );
}

export default App;
