import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Theme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.querySelector("html").setAttribute("data-theme", savedTheme);
    } else {
      document.querySelector("html").setAttribute("data-theme", theme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm flex items-center transition-all duration-300 bg-primary text-neutral hover:bg-secondary rounded-full"
    >
      {theme === "light" ? (
        <FaMoon className="text-lg transform transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <FaSun className="text-lg transform transition-transform duration-300 rotate-0 hover:rotate-45" />
      )}
    </button>
  );
};

export default Theme;
