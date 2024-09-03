import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUser: [],
    searchUserByText: "",
  },
  reducers: {
    //actions
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
    setSearchUserByText: (state, action) => {
      state.searchUserByText = action.payload;
    },
  },
});

export const { setAllUser, setSearchUserByText } = userSlice.actions;
export default userSlice.reducer;
