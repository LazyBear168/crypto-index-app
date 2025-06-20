/* File name: SharedMenu.js */
/* Author: sunny */

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

export default sharedMenus;