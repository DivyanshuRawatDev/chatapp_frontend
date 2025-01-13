import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchUsersChats } from "../../redux/slices/chatSlice";

const Left = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store?.chats?.allUser);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleGetChats = (reciverId) => {
    dispatch(fetchUsersChats(reciverId));
    
  };

  return (
    <Box
      sx={{
        backgroundColor: "#5CB338",
        height: "100%",
        width: "35%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        borderRadius: "20px",
      }}
    >
      {/* ------------- Text Search ------------------ */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search"
          variant="outlined"
          sx={{
            width: "90%",
            marginTop: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        />
      </Box>

      {/* ---------------Chat Cards-------------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
          maxHeight: "480px",
          gap: "20px",
        }}
      >
        {users?.map((user) => {
          return (
            <Box
              key={user?._id}
              onClick={() => {
                handleGetChats(user?._id);
              }}
              sx={{
                backgroundColor: "#F4FFC3",
                width: "90%",
                height: "60px",
                borderRadius: "20px",
                cursor: "pointer",

                "&:hover": {
                  backgroundColor: "#E7FBB4",
                },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginLeft: "10px",
                }}
              >
                <Box
                  component="img"
                  src="https://photosbull.com/wp-content/uploads/2024/05/instagram-cartoon-dp-for-girls_65.webp"
                  alt="profile picture"
                  sx={{ height: "80%", borderRadius: "50%" }}
                ></Box>
                <Typography variant="p" sx={{ fontWeight: 500 }}>
                  {user?.username}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Left;
