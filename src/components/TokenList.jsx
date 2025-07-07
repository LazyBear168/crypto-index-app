// File: src/components/TokenList.jsx
// Author: Cheng
// Description:
//   Reusable component that displays a list of top tokens by market cap from CoinGecko.
//   Accepts a `limit` prop to control how many tokens to display. Supports i18n, loading state,
//   and fallback to mock data on fetch failure.

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./TokenList.css";
import mockData from "../mock/coins.json";
import { fetchWithFallback } from "../utils/fetchWithFallback";

export default function TokenList({ limit = 10 }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1`;

    fetchWithFallback(url, mockData)
      .then((data) => setCoins(data))
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading) return <p>Loading top {limit} tokens...</p>;

  return (
    <div className="top-container">
      <h2>{t("topTokens.title", { count: limit })}</h2>
      {coins[0]?.isMock && (
        <div style={{ color: "orange", fontSize: "12px" }}>
          ⚠️ Displaying fallback (mock) data.
        </div>
      )}
      <ul className="top-list">
        {coins.map((coin, i) => (
          <li key={coin.id} className="top-item">
            <span className="titleNumber">
              {i + 1}.&nbsp; <img src={coin.image} alt={coin.name} width="20" />
            </span>
            <div style={{ width: "250px" }}>
              <strong>
                {coin.name} ({coin.symbol.toUpperCase()}):
              </strong>
            </div>
            <div>${coin.current_price.toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
