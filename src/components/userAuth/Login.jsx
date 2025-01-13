import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginAPI } from "../../redux/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const user = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (credentials) => {
    if (!credentials.email || !credentials.password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const resultAction = await dispatch(fetchLoginAPI(credentials));
      const result = unwrapResult(resultAction);
      toast.success(result?.message);
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.message || "Login failed! Please try again.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "wheat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/03/89/94/34/360_F_389943415_0IMXIfCIo4OUzwtsIhxCGeKEdRrhvNym.jpg')",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F8FAFC",
          border: "2px solid #118B50",
          width: "300px",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: 600, color: "#1F4529" }}
        >
          WELCOME TO CHATAPP
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
          <TextField
            sx={{ backgroundColor: "white" }}
            variant="outlined"
            label="Email"
            value={credentials.email}
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          ></TextField>
          <TextField
            sx={{ backgroundColor: "white" }}
            variant="outlined"
            label="Password"
            value={credentials.password}
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          ></TextField>
        </Box>
        <Button
          variant="contained"
          sx={{ width: "100%", backgroundColor: "#16C47F" }}
          onClick={() => {
            handleLogin(credentials);
          }}
        >
          {user.isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Login"
          )}
        </Button>
        <Typography sx={{ textAlign: "right", fontSize: "12px" }} variant="p">
          Not a member?{" "}
          <span
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup here
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
