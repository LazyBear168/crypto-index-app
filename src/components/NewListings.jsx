// File: src/components/NewListings.jsx
// Author: Cheng
// Description:
//    Displays the top 10 newly updated coins from CoinGecko (within the past 48 hours).
//    Fetches sorted market cap data and filters by last updated timestamp.
//    Includes i18n support, fallback mock data, and concise UI for symbol and price.

import { useEffect, useState } from "react";
import "./TokenList.css";
import { useTranslation } from "react-i18next";
import mockData from "../mock/newListings.json";
import { fetchWithFallback } from "../utils/fetchWithFallback";

export default function NewListings() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=50&page=1";

    fetchWithFallback(url, mockData)
      .then((data) => {
        const now = new Date();
        const recentCoins = data.filter((coin) => {
          const updated = new Date(coin.last_updated);
          const hoursAgo = (now - updated) / (1000 * 60 * 60);
          return hoursAgo < 48; // Within last 2 days
        });
        setCoins(recentCoins.slice(0, 10));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading new listings...</p>;

  return (
    <div className="top-container">
      <h2>{t("newListing.title")}</h2>
      {coins[0]?.isMock && (
        <div style={{ color: "orange", fontSize: "12px" }}>
          ⚠️ Displaying fallback (mock) data.
        </div>
      )}
      <ul className="top-list">
        {coins.map((coin, index) => (
          <li key={coin.id} className="top-item">
            <span className="titleNumber">
              {index + 1}.&nbsp;
              <img src={coin.image} alt={coin.name} width="20" />
            </span>
            <div style={{ width: "250px" }}>
              <strong>
                {coin.name} ({coin.symbol.toUpperCase()})
              </strong>
            </div>
            <div>
              <span>${coin.current_price.toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
