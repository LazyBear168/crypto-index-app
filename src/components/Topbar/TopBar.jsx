// File: src/components/Topbar/TopBar.jsx
// Author: Cheng
// Description:
//    Responsive navigation bar component with support for multi-language UI, dark mode toggle,
//    dropdown submenus, overflow handling (burger menu), and dynamic layout based on screen width.
//    It integrates with shared menu data and reacts to user input and screen size changes.

/* Global reset */
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

/* Referencing Local Object */
import "./Topbar.css";
import sharedMenus from "./SharedMenus";
import useDarkMode from "./useDarkMode";
import LanguagePopup from "./LanguagePopup";

function Topbar({ onSelectMenuItem }) {
  const { t, i18n } = useTranslation();
  const [openMenu, setOpenMenu] = useState(null);
  const wrapperRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(11);
  const visibleMenus = sharedMenus
    .filter((m) => m.type !== "logo")
    .slice(0, visibleCount);
  const overflowMenus = sharedMenus
    .filter((m) => m.type !== "logo")
    .slice(visibleCount);

  // For Dark mode
  const [theme, setTheme] = useDarkMode();

  // For language switch
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  // Click outside anywhere to close sub menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target))
        setOpenMenu(null);
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Decide how many button will shown
  useEffect(() => {
    const breakpoints = [
      { max: 620, count: 1 },
      { max: 810, count: 4 },
      { max: 1024, count: 6 },
      { max: 1150, count: 8 },
    ];

    const updateVisibleCount = () => {
      let count = 11;
      for (const bp of breakpoints) {
        if (window.innerWidth < bp.max) {
          count = bp.count;
          break;
        }
      }
      setVisibleCount(count);
    };

    updateVisibleCount();
    window.addEventListener(`resize`, updateVisibleCount);

    return () => window.removeEventListener(`resize`, updateVisibleCount);
  }, []);

  const renderSubItems = (items, className = "dropdown-content") => {
    return (
      <ul role="menu" className={className}>
        {items.map((item, index) => {
          const isDarkToggle = item.type === "toggle-dark";
          const isLanguage = item.type === "language";
          const isRoute = item.type === "route";
          const itemInnerText = isDarkToggle
            ? theme === "dark"
              ? t("submenu.lightMode", "Light mode ☀️")
              : t("submenu.darkMode", "Dark mode 🌙")
            : t(item.key);

          return (
            <li key={index}>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  if (isDarkToggle) {
                    setTheme(theme === "dark" ? "light" : "dark");
                  } else if (isLanguage) {
                    setShowLanguagePopup(true);
                  } else if (isRoute && onSelectMenuItem) {
                    onSelectMenuItem(item.route);
                  }
                }}
              >
                {itemInnerText}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  // Main code: Displaay whole top bar button
  return (
    <nav className="topBarWrapper" ref={wrapperRef}>
      <ul>
        {/* Display Logo img */}
        {sharedMenus.map((menu) => {
          if (menu.type === "logo") {
            return (
              <li key={menu.id}>
                <a href={menu.href} className={menu.class}></a>
              </li>
            );
          } else {
            return null;
          }
        })}
        {/* Visible Menus */}
        {visibleMenus.map((menu) => (
          <li
            className="dropdown"
            key={menu.id}
            onMouseEnter={() => openMenu && setOpenMenu(menu.id)}
          >
            <button
              className="dropBtn"
              aria-haspopup="true"
              aria-expanded={openMenu === menu.id}
              aria-controls={menu.id}
              aria-label={menu.aria}
              onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
            >
              {t(menu.labelKey)}
            </button>
            {/* Render selected menu */}
            {openMenu === menu.id && renderSubItems(menu.items)}
          </li>
        ))}

        {/* Burger Menu */}
        {overflowMenus.length > 0 && (
          <li
            className="dropdown"
            onMouseEnter={() => openMenu && setOpenMenu("burgerMenu")}
          >
            <button
              className="dropBtn"
              aria-haspopup="true"
              aria-expanded={openMenu === "burgerMenu"}
              aria-label="Toggle overflow"
              aria-controls="burgerMenu"
              onClick={() =>
                setOpenMenu(openMenu === "burgerMenu" ? null : "burgerMenu")
              }
            >
              ☰
            </button>
            {openMenu &&
              (openMenu === "burgerMenu" ||
                overflowMenus.some((m) => m.id === openMenu)) && (
                <ul role="menu" className="dropdown-content" id="burgerMenu">
                  {overflowMenus.map((menu) => {
                    const isSubmenuOpen = openMenu === menu.id;
                    return (
                      <li
                        className="has-submenu"
                        key={menu.id}
                        onMouseEnter={() => openMenu && setOpenMenu(menu.id)}
                      >
                        <button
                          className="dropBtn"
                          onClick={() =>
                            setOpenMenu(isSubmenuOpen ? "burgerMenu" : menu.id)
                          }
                        >
                          {t(menu.labelKey)}
                        </button>
                        {isSubmenuOpen &&
                          renderSubItems(menu.items, "dropdown-submenu left")}
                      </li>
                    );
                  })}
                </ul>
              )}
          </li>
        )}
      </ul>
      {showLanguagePopup && (
        <LanguagePopup
          onSelect={(lang) => {
            i18n.changeLanguage(lang);
            localStorage.setItem("language", lang);
            setShowLanguagePopup(false);
          }}
          onClose={() => setShowLanguagePopup(false)}
        />
      )}
    </nav>
  );
}

export default Topbar;
