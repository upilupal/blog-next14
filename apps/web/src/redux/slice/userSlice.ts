import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  email: string;
  fullName: string;
}

const initialState = {
  id: 0,
  fullName: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },

    logoutAction: (state) => {
      state.id = 0;
      state.fullName = "";
      state.email = "";
    },
  },
});


export const {loginAction, logoutAction} = userSlice.actions;
export default userSlice.reducer;