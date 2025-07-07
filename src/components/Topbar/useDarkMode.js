// File: src/components/Topbar/TopBar.jsx
// Author: Cheng
// Description: 
//    Custom React hook for toggling between light and dark mode. 
//    Persists the theme setting in localStorage and applies a `dark-mode` class to the <body> element.

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