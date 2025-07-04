import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { API, APIS } from "../globals/http";
import { Status } from "../globals/types/types";
import type { AppDispatch } from "./store";
// import  {API}  from "../http/index";

interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
  email: string;
  otp: string;
}
interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  token: string | null;
}
export interface IAuthState {
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
    },
    setStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setToken(state: IAuthState, action: PayloadAction<string>) {
      state.user.token = action.payload;
    },
    logout(state: IAuthState) {
      state.user = {
        id: null,
        username: null,
        email: null,
        password: null,
        token: null,
      };
      state.status = Status.LOADING;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setStatus, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data: IUser) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const res = await API.post("/auth/register", data);
      console.log(res);
      if (res.status === 200) {
        dispatch(setUser(data));
        dispatch(setStatus(Status.SUCCESS));
      } else dispatch(setStatus(Status.ERROR));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function loginUser(data: ILoginUser) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        const { id, username, email } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        console.log("res", response.data);
        const token =
          response.data.token || response.data.session?.access_token;

        if (token) {
          localStorage.setItem("token", token);
         
          const userData: IUser = {
            id,
            username,
            email,
            token,
            password: null,
          };

          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(setUser(userData));
          dispatch(setStatus(Status.SUCCESS));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function forgotPassword(data: { email: string; otp: string }) {
  return async function forgotPasswordThunk(dispatch: AppDispatch) {
    try {
      const res = await APIS.post("/auth/forgot-password", data);
      console.log(res);
      if (res.status === 200) {
        dispatch(setUser(res.data));
        dispatch(setStatus(Status.SUCCESS));
      } else dispatch(setStatus(Status.ERROR));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function resetPassword(data: IResetPassword) {
  return async function resetPasswordThunk(dispatch: AppDispatch) {
    try {
      const res = await APIS.post("/auth/reset-password", data);
      console.log(res);
      if (res.status === 200) {
        dispatch(setUser(res.data));
        dispatch(setStatus(Status.SUCCESS));
      } else dispatch(setStatus(Status.ERROR));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function loadUserFromStorage() {
  return function loadUserThunk(dispatch: AppDispatch) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch(setUser({ ...parsedUser, token }));
        dispatch(setStatus(Status.SUCCESS));
      } catch  {
        console.error("Failed to parse user from storage");
        dispatch(setStatus(Status.ERROR));
      }
    }
  };
}
