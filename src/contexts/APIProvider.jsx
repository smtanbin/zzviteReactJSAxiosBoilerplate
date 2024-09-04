import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Create a Context for API interactions
export const APIContext = createContext({
  close: () => {},
  api: async () => ({}),
});

// Alert Component
const Alert = ({ message, onClose }) => (
  <div style={{ position: "fixed", bottom: "10px", right: "10px", backgroundColor: "white", border: "1px solid black", padding: "10px", borderRadius: "5px" }}>
    <div>
      <strong>Alert</strong>
    </div>
    <p>{message}</p>
    <button onClick={onClose}>Ok</button>
  </div>
);

// Provider Component
export const APIProvider = ({ children }) => {
  const baseurl = `http://${window.location.hostname}:5000/v1/api`;

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => setOpen(false);

  const handleOpen = (returnMessage) => {
    setMessage(returnMessage);
    setOpen(true);
  };

  const api = async (type, path, payload = null) => {
    try {
      const session = Cookies.get("auth_token");

      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
      };

      if (session) {
        headers["Authorization"] = `Bearer ${session}`;
      }

      const config = {
        method: type,
        url: baseurl + path,
        headers,
        data: payload,
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      if (error.response?.status === 500) {
        setMessage(errorMessage);
        setOpen(true);
        throw error;
      } else if (error.response?.status >= 401 && error.response?.status <= 404) {
        return error.response;
      } else {
        setMessage(errorMessage);
        setOpen(true);
      }
    }
  };

  return (
    <APIContext.Provider value={{ close: handleClose, api }}>
      {children}
      {open && <Alert message={message} onClose={handleClose} />}
    </APIContext.Provider>
  );
};
