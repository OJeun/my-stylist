import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../stores/store";
import { setToast } from "../stores/features/toast";

const AlertMessage = () => {
  const dispatch = useDispatch();
  const { message, type } = useAppSelector((state) => state.toast);

  const notify = (message: string, typeOfAlert: "info" | "success" | "warning" | "error") => {
    switch (typeOfAlert) {
      case "info":
        toast.info(message, getToastOptions());
        break;
      case "success":
        toast.success(message, getToastOptions());
        break;
      case "warning":
        toast.warning(message, getToastOptions());
        break;
      case "error":
        toast.error(message, getToastOptions());
        break;
      default:
        toast.info(message, getToastOptions());
        break;
    }
  };

  const getToastOptions = (): ToastOptions => ({
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  useEffect(() => {
    const getMessageAndAlertTypeFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const alertType = params.get("type") as "info" | "success" | "warning" | "error";
      const alertMessage = params.get("message") || "";
      dispatch(setToast({ message: alertMessage, type: alertType} ))
    };

    getMessageAndAlertTypeFromURL()

    return () => {
      toast.dismiss(); // Dismiss any existing toasts when component unmounts or effect re-runs
    };
  }, [dispatch]); // Empty dependency array to run only once on component mount


  useEffect(() => {
    if (message) {
      notify(message, type);
    }
  }, [message, type]); 

  return (
    <>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </>
  );
};

export default AlertMessage;
