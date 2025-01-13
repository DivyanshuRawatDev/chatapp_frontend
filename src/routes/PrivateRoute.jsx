import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router";
import { BASE_URL } from "../configs/common";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
   const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`${BASE_URL}/protected`, {
          withCredentials: true,
        });
        setUser(data?.user);
      } catch (error) {
        console.log("Error while check protected route: " + error.message);
      } finally {
       setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.warning("Please Login First");
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return children;
};

export default PrivateRoute;
