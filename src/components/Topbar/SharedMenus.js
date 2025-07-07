// File: src/components/Topbar/SharedMenus.js
// Author: Cheng
// Description: 
//   Centralized configuration for the top navigation bar, including all menu groups and subitems.
//   Each entry defines the menu label key, ARIA accessibility label, submenu items, and hidePriority
//   used to control responsive visibility and interaction type (e.g., route, language switch, dark mode).

const sharedMenus = [
  {
    type: "logo",
    id: "logo",
    href: "index.html",
    class: "logo-img"
  },
  {
    labelKey: "menu.settings",
    aria: "Settings menu",
    id: "settingsMenu",
    items: [
      { key: "submenu.language", type: "language" },
      { key: "submenu.darkMode", type: "toggle-dark" }
    ],
    hidePriority: 2
  },
  {
    labelKey: "menu.index",
    aria: "Token index and market overview",
    id: "menuIndex",
    items: [
      { key: "submenu.topTokens", type: "route", route: "topTokens" },
      { key: "submenu.trendingCoins", type: "route", route: "trendingCoins" },
      { key: "submenu.newListings" , type: "route", route: "newListings" }
    ],
    hidePriority: 3
  },
  {
    labelKey: "menu.kline",
    aria: "Candlestick chart views",
    id: "menuKLine",
    items: [
      { key: "submenu.btcUsdt", type: "route", route: "BTC/USDT" },
      { key: "submenu.ethUsdt", type: "route", route: "ETH/USDT" }
    ],
    hidePriority: 4
  },
  {
    labelKey: "menu.market",
    aria: "Crypto market data",
    id: "menuMarket",
    items: [
      { key: "submenu.spotMarket", type: "route", route: "spotMarket" },
      { key: "submenu.futuresMarket", type: "route", route: "futuresMarket"}
    ],
    hidePriority: 5
  },
  {
    labelKey: "menu.exchanges",
    aria: "Exchange rankings and statistics",
    id: "menuExchanges",
    items: [
      { key: "submenu.cex", type: "route", route: "CentralizedExchanges" },
    ],
    hidePriority: 6
  },
  {
    labelKey: "menu.positions",
    aria: "Open interest and position data",
    id: "menuPositions",
    items: [
      { key: "submenu.longShortRatio", type: "route", route: "longShortRatio" },
      { key: "submenu.topTraders", type: "route", route: "topTraders" }
    ],
    hidePriority: 7
  },
  {
    labelKey: "menu.fundingRate",
    aria: "Funding rates across perpetual markets",
    id: "menuFundingRate",
    items: [
      { key: "submenu.allPairs", type: "route", route: "allPairs" }
    ],
    hidePriority: 8
  },
  // {
  //   labelKey: "menu.about",
  //   aria: "About the author and feedback options",
  //   id: "QAboutAuthor",
  //   items: [
  //     { key: "submenu.author" }
  //   ],
  //   hidePriority: 11
  // }
];

export default sharedMenus;
