import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 > Date.now()) {
          setUser(decodedToken);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <DataContext.Provider
      value={{ data, setData, user, isLoading, setLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
