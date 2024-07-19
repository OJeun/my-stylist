import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hanger_icon from "../assets/icon_hanger.png";


export default function Login() {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState(false);

  // const handleClose = () => setShowErrorModal(false);
  const handleShow = () => setShowErrorModal(true);

  const onSubmit = async (values: { email: string; password: string }) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8888/api/login",
        values
      );
      const data = response.data;
      signIn({
        auth: {
          token: data.accessToken,
          type: "Bearer",
        },
        userState: { name: data.name, email: data.email, uid: data.uuid },
      });
      localStorage.setItem('name', data.name);
      localStorage.setItem('email', data.email);
      navigate('/outfit-generator');
      
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError("Check your address and password again");
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
      handleShow();
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={hanger_icon}
            alt="My Stylist"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={formik.handleSubmit}
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-strong"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          {error && (
            <div
              className="mt-4 bg-red-100 border border-red text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold text-red">Error:</strong>
              <span className="block sm:inline text-red"> {error}</span>
            </div>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            You don't have an account?{' '}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
