import React, { useState, useEffect } from "react";

const Theme = () => {
  const [theme, setTheme] = useState("mylight");

  const toggleTheme = () => {
    const newTheme = theme === "mylight" ? "mydark" : "mylight";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };

  // Initialize theme on load
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className="btn btn-sm btn-primary"
      onClick={toggleTheme}
    >
      {theme === "mylight" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default Theme;
