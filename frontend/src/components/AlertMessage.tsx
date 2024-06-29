import { useEffect, useState } from "react";

const AlertMessage = () => {
  const [message, setMessage] = useState("");
  const [classN, setclassN] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const getMessageFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const warning = params.get("error");
      if (warning === "true") {
        setclassN("bg-red-100 border border-red text-red-700");
      } else {
        setclassN("bg-green-100 border border-green text-green-700");
      }

      return params.get("message") || ""; // Get message parameter from URL, or empty string if not found
    };

    setMessage(getMessageFromURL());

    if (message) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
  }, [message]); 
  

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="flex justify-center" style={{ width: "100%" }}>
        {isVisible && message && (
          <div
            className={`absolute min-w-80 bg-opacity-75 p-4 mt-8 mb-8 ${classN} transition-opacity duration-200 text-center`}
            style={{
              top: "12rem",
              zIndex: "9999",
              opacity: isVisible ? 1 : 0,
            }}
          >
            <strong>{message}</strong>
         
          </div>
        )}
      </div>
    </>
  );
};
export default AlertMessage;