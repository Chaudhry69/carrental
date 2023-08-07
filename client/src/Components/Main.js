import React from "react";
import { Routes, Route } from "react-router-dom";

// Import your components
import ListRecords from "../Components/ListRecords";
import AddRecord from "../Components/AddRecord";
import EditRecord from "../Components/EditRecord";
import Login from "../Components/Login"; // Import the Login component

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<ListRecords />} />
        <Route path="/list" element={<ListRecords />} />
        <Route path="/addrecord" element={<AddRecord />} />
        {/* Include :id parameter in the path */}
        <Route path="/editRecord/:id" element={<EditRecord />} />
        {/* Add the login route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
};

export default Main;
