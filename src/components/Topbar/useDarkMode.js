/* File name: useDarkMode.js */
/* Author: sunny */

/* Global reset */
import React, { useEffect, useState } from "react";

export default function useDarkMode() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

      useEffect(() => {
        document.body.classList.toggle("dark-mode", theme === "dark");
        localStorage.setItem("theme", theme);
      }, [theme]);

    return [theme, setTheme];
}