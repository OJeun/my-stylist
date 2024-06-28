import createStore from "react-auth-kit/createStore";

export interface IUserData {
  name: string;
  uuid: string;
  email: string;
}

export const store = createStore<IUserData>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});
