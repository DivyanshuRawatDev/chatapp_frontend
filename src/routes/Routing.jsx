import React from "react";
import { Route, Routes } from "react-router";
import Signup from "../components/userAuth/Signup";
import Login from "../components/userAuth/Login";
import Home from "../components/home/Home";
import PrivateRoute from "./PrivateRoute";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Routing;
