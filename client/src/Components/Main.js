import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook

// Import your components
import ListRecords from "../Components/ListRecords";
import AddRecord from "../Components/AddRecord";
import EditRecord from "../Components/EditRecord";
import Login from "../Components/Login";
import Signup from "./Signup";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0(); // Use useAuth0 hook

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              navigate={navigate}
              setLoggedIn={setLoggedIn}
              isAuthenticated={isAuthenticated} // Pass isAuthenticated prop
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/list"
          element={<ListRecords loggedIn={loggedIn} isAuthenticated={isAuthenticated} />} // Pass loggedIn and isAuthenticated props
        />
        <Route path="/addrecord" element={<AddRecord />} />
        {/* Include :id parameter in the path */}
        <Route path="/editRecord/:id" element={<EditRecord />} />
      </Routes>
    </main>
  );
};

export default Main;
