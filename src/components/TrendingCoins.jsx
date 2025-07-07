// File: src/components/TrendingCoins.jsx
// Author: Cheng
// Description:
//    Displays currently trending cryptocurrencies using CoinGecko's /search/trending API.
//    Extracts coin data from the API structure and shows name, symbol, rank, and icon.
//    Supports fallback mock data and full internationalization.

import { useEffect, useState } from "react";
import "./TokenList.css";
import { useTranslation } from "react-i18next";
import mockData from "../mock/trending.json";
import { fetchWithFallback } from "../utils/fetchWithFallback";

export default function TrendingCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/search/trending";
    fetchWithFallback(url, mockData)
      .then((data) => {
        // If real data, extract coin.item[] → flatten into the same format
        if (data?.coins) {
          const realCoins = data.coins.map((c) => ({
            id: c.item.id,
            name: c.item.name,
            symbol: c.item.symbol,
            thumb: c.item.thumb,
            market_cap_rank: c.item.market_cap_rank,
          }));
          setCoins(realCoins);
        } else {
          setCoins(data); // mockData
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading trending coins...</p>;

  return (
    <div className="top-container">
      <h2>{t("trendingCoins.title")}</h2>

      {coins[0]?.isMock && (
        <div style={{ fontSize: "12px", color: "orange" }}>
          ⚠️ Displaying fallback (mock) data.
        </div>
      )}

      <ul className="top-list">
        {coins.map((coin, index) => (
          <li key={coin.id} className="top-item">
            <span className="titleNumber">
              {index + 1}.&nbsp;
              <img src={coin.thumb} alt={coin.name} width="20" />
            </span>
            <div style={{ width: "250px" }}>
              <strong>
                {coin.name} ({coin.symbol.toUpperCase()})
              </strong>
            </div>
            <div>
              <span>Rank #{coin.market_cap_rank ?? "—"}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
