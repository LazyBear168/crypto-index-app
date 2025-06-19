/* File name: Topbar.jsx */
/* Author: sunny */

/* Global reset */
import React, { useEffect, useState, useRef } from "react";

const sharedMenus = [
  {
    type: "logo",
    id: "logo",
    href: "index.html",
    class: "logo-img"
  },
  {
    label: "general Mode",
    aria: "Design mode selection",
    id: "generalMode",
    items: ["Professional", "Project"],
    hidePriority: 1
  },
  {
    label: "⚙️",
    aria: "Settings menu",
    id: "settingsMenu",
    items: ["Language", "Currency", "Dark mode 🌙"],
    hidePriority: 2
  },
  {
    label: "Index",
    aria: "Token index and market overview",
    id: "menuIndex",
    items: ["Top Tokens", "Trending Coins", "New Listings"],
    hidePriority: 3
  },
  {
    label: "K-line",
    aria: "Candlestick chart views",
    id: "menuKLine",
    items: ["BTC/USDT", "ETH/USDT", "Customize Pair"],
    hidePriority: 4
  },
  {
    label: "Market",
    aria: "Crypto market data",
    id: "menuMarket",
    items: ["Spot Market", "Futures Market", "DEX Market"],
    hidePriority: 5
  },
  {
    label: "Exchanges",
    aria: "Exchange rankings and statistics",
    id: "menuExchanges",
    items: ["Centralized Exchanges", "Decentralized Exchanges", "Volume Rankings"],
    hidePriority: 6
  },
  {
    label: "Positions",
    aria: "Open interest and position data",
    id: "menuPositions",
    items: ["Long vs Short Ratio", "Top Traders", "Exchange Positions"],
    hidePriority: 7
  },
  {
    label: "Funding Rate",
    aria: "Funding rates across perpetual markets",
    id: "menuFundingRate",
    items: ["BTC Funding", "ETH Funding", "All Pairs"],
    hidePriority: 8
  },
  {
    label: "Liquidation data",
    aria: "Liquidations across exchanges",
    id: "menuLiquidations",
    items: ["24H Liquidations", "Exchange Summary", "By Asset"],
    hidePriority: 9
  },
  {
    label: "data",
    aria: "Advanced blockchain and on-chain data",
    id: "menuData",
    items: ["Gas Fees", "Stablecoin Flow", "Whale Activity"],
    hidePriority: 10
  },
  {
    label: "About",
    aria: "About the author and feedback options",
    id: "QAboutAuthor",
    items: ["Author", "Report an Issue"],
    hidePriority: 11
  }
];

function Topbar () {

  const [openMenu, setOpenMenu] = useState(null);
  const wrapperRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(11);
  const visibleMenus = sharedMenus.filter(m => m.type !== 'logo').slice(0, visibleCount);
  const overflowMenus = sharedMenus.filter(m => m.type !== 'logo').slice(visibleCount);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target))
        setOpenMenu(null);
    }
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const breakpoints = [
      {max: 620, count:1 },
      {max: 810, count:4 },
      {max: 1024, count:6 },
      {max: 1150, count:8 },
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
  },[])

  const renderSubItems = (items) => {
    return (
      <ul role="menu" className="dropdown-content">
        {items.map((item, index) => (
          <li key={index}>
            <button role="menuitem">{item}</button>
          </li>
        ))}
      </ul>
    );
  }

  // Main code: Displaay whole top bar button
  return (
    <nav className="topBarWrapper" ref={wrapperRef}>
      <ul>
        {/* Display Logo img */}
        {sharedMenus.map((menu) => {
          if (menu.type === 'logo') {
            return (
              <li key={menu.id}>
                <a href={menu.href} className={menu.class}></a>
              </li>
            );
          }
          return null;
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
              {menu.label}
            </button>
            {/* Render selected menu */}
            {openMenu === menu.id && renderSubItems(menu.items)}
          </li>
        ))}

        {/* Burger Menu */}
        {overflowMenus.length > 0 && (
          <li className="dropdown">
            <button
            className="dropBtn"
            aria-haspopup="true"
            aria-expanded={openMenu === "burgerMenu"}
            aria-label="Toggle overflow"
            aria-controls="burgerMenu"
            onClick={() => setOpenMenu(openMenu === 'burgerMenu' ? null : 'burgerMenu')}
            >
              ☰
            </button>
            {openMenu && (openMenu === 'burgerMenu' || overflowMenus.some(m => m.id === openMenu)) && (
              <ul role="menu" className="dropdown-content" id="burgerMenu">
                {overflowMenus.map((menu) => {
                  const isSubmenuOpen = openMenu === menu.id;
                  return (
                    <li className="has-submenu" key={menu.id}>
                      <button
                        className="dropBtn"
                        onClick={() => setOpenMenu(isSubmenuOpen ? 'burgerMenu' : menu.id)}
                      >
                        {menu.label}
                      </button>
                      {isSubmenuOpen && renderSubItems(menu.items)}
                    </li>
                  );
                })}
              </ul>
            )}

          </li>
        )}
      </ul>
    </nav>
  )

  
}




export default Topbar;