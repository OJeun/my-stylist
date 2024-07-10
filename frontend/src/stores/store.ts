import { FavourtieItemSlice } from "./features/favouriteItems";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createStore from "react-auth-kit/createStore";

export const store = configureStore({
  reducer: {
    favouriteItem: FavourtieItemSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export interface IUserData {
  name: string;
  uuid: string;
  email: string;
}

export const authStore = createStore<IUserData>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});
