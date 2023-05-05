import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  password: string;
}

interface userState {
  users: User[];
}


const initialState: userState = {
  users: [],
};





export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ email: string ,password: string}>) => {
      state.users.push({
        email: action.payload.email,
        password: action.payload.password,
      });
    },
  },
});

export default UserSlice.reducer;
export const { loginUser } = UserSlice.actions;