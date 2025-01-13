import { Password } from "@mui/icons-material";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignupAPI } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });


  const dispatch = useDispatch();
  const navigate=useNavigate();

  const user = useSelector((store) => store.auth);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (credentials) => {
    dispatch(fetchSignupAPI(credentials));
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
            name="username"
            value={credentials.username}
            onChange={(e) => handleChange(e)}
            variant="outlined"
            label="Username"
          ></TextField>
          <TextField
            sx={{ backgroundColor: "white" }}
            variant="outlined"
            value={credentials.email}
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
            label="Email"
          ></TextField>
          <TextField
            sx={{ backgroundColor: "white" }}
            value={credentials.password}
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
            variant="outlined"
            label="Password"
          ></TextField>
        </Box>
        <Button
          variant="contained"
          sx={{ width: "100%", backgroundColor: "#16C47F" }}
          onClick={() => {
            handleSignup(credentials);
          }}
          disabled={user?.isLoading}
        >
            {user?.isLoading?<CircularProgress size={24} color="inherit"/>:"Signup"}
          
        </Button>
        <Typography sx={{ textAlign: "right", fontSize: "12px" }} variant="p">
          Already member?{" "}
          <span style={{ color: "red", cursor: "pointer" }} onClick={()=>{navigate("/login")}}>login here</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
