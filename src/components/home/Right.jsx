import { Image } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/slices/chatSlice";

const Right = () => {
  const [message, setMessage] = useState("");
  const usersChats = useSelector((store) => store?.chats);
  const user = useSelector((store) => store?.auth?.user?.data);
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    const reciverId = usersChats?.reciverId;
    if (!reciverId || !message) {
      console.error("Receiver ID or message is missing!");
      return;
    }
    console.log(reciverId, message);
    dispatch(sendMessage({ reciverId, message }));
    setMessage("");
  };

  return (
    <Box sx={{ backgroundColor: "#6A80B9", height: "100%", width: "65%" }}>
      <Box
        sx={{
          backgroundColor: "#E5D0AC",
          height: "10%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
        <Box sx={{ marginRight: "15px" }}>
          <CallIcon sx={{ cursor: "pointer" }} />
        </Box>
      </Box>
      <Box
        sx={{ backgroundColor: "#727D73", height: "78%", overflowY: "auto" }}
      >
        {usersChats?.chat?.map((msg) => (
          <Box
            key={msg?._id}
            sx={{
              display: "flex",
              justifyContent: `${user?._id == msg?.senderId ? "end" : "start"}`,
            }}
          >
            <Box className="message">
              <Box
                key={msg.id}
                className={`message ${
                  user?._id == msg?.senderId ? "sender" : "receiver"
                }`}
              >
                <p>{msg?.message}</p>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          backgroundColor: "#E5D0AC",
          height: "12%",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <TextField
          label="Send Message"
          variant="outlined"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          sx={{
            width: "75%",
            marginLeft: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        />
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", padding: "13px", width: "15%" }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Right;
