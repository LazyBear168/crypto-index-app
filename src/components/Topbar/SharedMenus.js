/* File name: SharedMenus.js */
/* Author: sunny */

const sharedMenus = [
  {
    type: "logo",
    id: "logo",
    href: "index.html",
    class: "logo-img"
  },
  {
    labelKey: "menu.generalMode",
    aria: "Design mode selection",
    id: "generalMode",
    items: [
      { key: "submenu.professional" },
      { key: "submenu.project" }
    ],
    hidePriority: 1
  },
  {
    labelKey: "menu.settings",
    aria: "Settings menu",
    id: "settingsMenu",
    items: [
      { key: "submenu.language", type: "language" },
      { key: "submenu.currency", type: "currency" },
      { key: "submenu.darkMode", type: "toggle-dark" }
    ],
    hidePriority: 2
  },
  {
    labelKey: "menu.index",
    aria: "Token index and market overview",
    id: "menuIndex",
    items: [
      { key: "submenu.topTokens" },
      { key: "submenu.trendingCoins" },
      { key: "submenu.newListings" }
    ],
    hidePriority: 3
  },
  {
    labelKey: "menu.kline",
    aria: "Candlestick chart views",
    id: "menuKLine",
    items: [
      { key: "submenu.btcUsdt", type: "route", route: "BTC/USDT" },
      { key: "submenu.ethUsdt", type: "route", route: "ETH/USDT" },
      { key: "submenu.customPair", type: "route", route: "CUSTOM" }
    ],
    hidePriority: 4
  },
  {
    labelKey: "menu.market",
    aria: "Crypto market data",
    id: "menuMarket",
    items: [
      { key: "submenu.spotMarket" },
      { key: "submenu.futuresMarket" },
      { key: "submenu.dexMarket" }
    ],
    hidePriority: 5
  },
  {
    labelKey: "menu.exchanges",
    aria: "Exchange rankings and statistics",
    id: "menuExchanges",
    items: [
      { key: "submenu.cex" },
      { key: "submenu.dex" },
      { key: "submenu.volumeRankings" }
    ],
    hidePriority: 6
  },
  {
    labelKey: "menu.positions",
    aria: "Open interest and position data",
    id: "menuPositions",
    items: [
      { key: "submenu.longShortRatio" },
      { key: "submenu.topTraders" },
      { key: "submenu.exchangePositions" }
    ],
    hidePriority: 7
  },
  {
    labelKey: "menu.fundingRate",
    aria: "Funding rates across perpetual markets",
    id: "menuFundingRate",
    items: [
      { key: "submenu.btcFunding" },
      { key: "submenu.ethFunding" },
      { key: "submenu.allPairs" }
    ],
    hidePriority: 8
  },
  {
    labelKey: "menu.liquidations",
    aria: "Liquidations across exchanges",
    id: "menuLiquidations",
    items: [
      { key: "submenu.liquidation24h" },
      { key: "submenu.exchangeSummary" },
      { key: "submenu.byAsset" }
    ],
    hidePriority: 9
  },
  {
    labelKey: "menu.data",
    aria: "Advanced blockchain and on-chain data",
    id: "menuData",
    items: [
      { key: "submenu.gasFees" },
      { key: "submenu.stablecoinFlow" },
      { key: "submenu.whaleActivity" }
    ],
    hidePriority: 10
  },
  {
    labelKey: "menu.about",
    aria: "About the author and feedback options",
    id: "QAboutAuthor",
    items: [
      { key: "submenu.author" },
      { key: "submenu.reportIssue" }
    ],
    hidePriority: 11
  }
];

export default sharedMenus;
