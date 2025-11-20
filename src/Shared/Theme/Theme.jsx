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
  className="btn btn-circle btn-sm bg-secondary text-neutral transition-transform duration-300 hover:rotate-45"
>
  {theme === "light" ? <FaMoon /> : <FaSun />}
</button>

  );
};

export default Theme;
