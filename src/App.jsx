// File: App.jsx
// Author: Cheng
// Description: Main layout of the crypto index dashboard with conditional rendering based on menu selection.

/* Global reset */
import { useState } from "react";

/* Referencing Local Object */
import TopBar from "./components/Topbar/TopBar";
import KLineChart from "./components/KLine/KLineChart";
import TokenList from "./components/TokenList";
import TrendingCoins from "./components/TrendingCoins";
import NewListings from "./components/NewListings";
import SpotMarket from "./components/SpotMarket";
import FuturesMarket from "./components/FuturesMarket";
import CentralizedExchanges from "./components/CentralizedExchanges";
import LongShortRatio from "./components/LongShortRatio";
import TopTraders from "./components/TopTraders";
import AllFundingRates from "./components/AllFundingRates";
/* Import css file */
import "./styles/globals.css";
import "./styles/reset.css";
import "./styles/dark-mode.css";

function App() {
  const [selectedView, setSelectedView] = useState(null);

  return (
    <div className="app">
      <TopBar onSelectMenuItem={setSelectedView} />
      <main>
        {selectedView === null && <TokenList limit={10} />}
        {selectedView === "topTokens" && <TokenList limit={100} />}
        {selectedView === "trendingCoins" && <TrendingCoins />}
        {selectedView === "newListings" && <NewListings />}
        {selectedView === "BTC/USDT" && <KLineChart pair="BTC/USDT" />}
        {selectedView === "ETH/USDT" && <KLineChart pair="ETH/USDT" />}
        {selectedView === "spotMarket" && <SpotMarket />}
        {selectedView === "futuresMarket" && <FuturesMarket />}
        {selectedView === "CentralizedExchanges" && <CentralizedExchanges />}
        {selectedView === "longShortRatio" && <LongShortRatio />}
        {selectedView === "topTraders" && <TopTraders />}
        {selectedView === "allPairs" && <AllFundingRates />}
        {/* Add more routes later */}
      </main>
    </div>
  );
}

export default App;
