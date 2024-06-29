import { useEffect, useState } from "react";
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AlertMessage = () => {
  const [message, setMessage] = useState("");
  const [typeOfAlert, setTypeOfAlert] = useState<"info" | "success" | "warning" | "error">("info");

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
      console.log("Fetching message and alert type from URL...");
      const params = new URLSearchParams(window.location.search);
      const alertType = params.get("type") as "info" | "success" | "warning" | "error";
      setTypeOfAlert(alertType);
      console.log("type", alertType)
      return params.get("message") || "";
    };

    const fetchedMessage = getMessageAndAlertTypeFromURL();
    setMessage(fetchedMessage);

    if (fetchedMessage) {
      notify(fetchedMessage, typeOfAlert); 
    }

    return () => {
      toast.dismiss(); // Dismiss any existing toasts when component unmounts or effect re-runs
    };
  }, [message, typeOfAlert]); // Empty dependency array to run only once on component mount


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
