import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Theme = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm flex items-center transition-all duration-300 bg-primary text-accent hover:bg-secondary rounded-full"
    >
      {theme === "light" ? (
        <>
          <FaMoon className="text-lg" />
        </>
      ) : (
        <>
          <FaSun className="text-lg" />
        </>
      )}
    </button>
  );
};

export default Theme;
