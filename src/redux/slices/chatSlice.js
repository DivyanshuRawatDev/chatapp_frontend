import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../configs/common";

export const fetchAllUsers = createAsyncThunk(
  "chats/getAllUsers",
  async function () {
    try {
      const response = await axios.get(`${BASE_URL}/chats/allUser`, {
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      console.log("Error while get all users data : " + error?.message);
    }
  }
);

export const fetchUsersChats = createAsyncThunk(
  "chats/fetchUsersChats",
  async function (reciverId) {
    try {
      const response = await axios.get(
        `${BASE_URL}/chats/getChat/${reciverId}`,
        { withCredentials: true }
      );
      const data = { ...response?.data, reciverId: reciverId };
      console.log(data, "data");

      return data;
    } catch (error) {
      console.log("Error while fetch users chats : " + error?.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chats/sendMessage",
  async function ({ reciverId, message }) {
    try {
      const response = await axios.post(
        `${BASE_URL}/chats/send/${reciverId}`,
        { message },
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      console.log("Error while sending message : " + error?.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    isLoading: false,
    isSuccess: false,
    reciverId: "",
    allUser: [],
    chat: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // ------------------ fetch all users ----------------------
    builder.addCase(fetchAllUsers.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.allUser = action.payload?.data;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = true;
    });

    // --------------------- fetch users chats -----------------

    builder.addCase(fetchUsersChats.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchUsersChats.fulfilled, (state, action) => {
      state.chat = action.payload?.messages;
      state.reciverId = action?.payload?.reciverId;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(fetchUsersChats.rejected, (state, action) => {
      state.isLoading = true;
    });

    // ---------------------  Send Message ---------------------

    builder.addCase(sendMessage.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.chat.push(action.payload?.newMessage);
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});

export default chatSlice.reducer;
