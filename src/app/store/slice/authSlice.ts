import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  userType: string | null;
  loginTime: number | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userType: null,
  loginTime: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login(state, action) {
      const { userType } = action.payload
      state.isAuthenticated = true;
      state.userType = userType
      state.loginTime = Date.now();
      localStorage.setItem('loginTime', JSON.stringify(state.loginTime));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loginTime = null;
      localStorage.removeItem('loginTime');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
