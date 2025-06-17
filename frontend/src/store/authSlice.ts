import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import type { AppDispatch } from "./store";
import API from "../globals/http";
interface IUser {
  id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  token: string | null;
}
interface IAuthState {
  user: IUser;
  status: Status;
}
const initialState: IAuthState = {
  user: {
    id: null,
    username: null,
    email: null,
    password: null,
    token: null,
  },
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: IAuthState, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.status = Status.SUCCESS;
    },
    setStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setToken(state: IAuthState, action: PayloadAction<string>) {
      state.user.token = action.payload;
    },
  },
});
export const { setUser, setStatus, setToken } = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data: IUser) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const res = await API.post("/auth/register", data);
      if (res.status === 200) {
        dispatch(setUser(res.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error registering user:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function loginUser(data: { email: string; password: string }) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      const res = await API.post("/auth/login", data);
      if (res.status === 200) {
        dispatch(setUser(res.data.data));
        dispatch(setStatus(Status.SUCCESS));
        const token =
          res.data.token || res.data.session?.access_token;

        if (token) {
          dispatch(setToken(token));
          localStorage.setItem("token", token);
        } else {
          console.error("Token is missing in the response data.");
          dispatch(setStatus(Status.ERROR));
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function forgotPassword(data: { email: string; otp: string }) {
  return async function forgoPasswordThunk(dispatch: AppDispatch) {
    try {
      const res = await API.post("/auth/send-otp", data);
      if (res.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        alert("Check your email for a reset link.");
        dispatch(setUser(res.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error in forgot password:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function resetPassword(data: {
  email: string;
  otp: string;
  newPassword: string;
}) {
  return async function resetPasswordThunk(dispatch: AppDispatch) {
    try {
      const res = await API.post("/auth/reset-password", data);
      if (res.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        alert("Password reset successfully.");
        dispatch(setUser(res.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
