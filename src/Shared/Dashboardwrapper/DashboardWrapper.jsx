import React, { useEffect, useState } from "react";

const DashboardWrapper = ({ children }) => {
  const [theme, setTheme] = useState("light"); // default theme

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);


  return (
    <div className="">
      {children}
    </div>
  );
};

export default DashboardWrapper;