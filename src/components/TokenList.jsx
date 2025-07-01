// File: src/components/TokenList.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./TokenList.css";

export default function TokenList({ limit = 10 }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch token list:", err);
        setLoading(false);
      });
  }, [limit]);

  if (loading) return <p>Loading top {limit} tokens...</p>;

  return (
    <div className="top-container">
      <h2>{t("topTokens.title", { count: limit })}</h2>

      <ul className="top-list">
        {coins.map((coin, i) => (
          <li key={coin.id} className="top-item">
            <span className="titleNumber">
              {i + 1}. <img src={coin.image} alt={coin.name} width="20" />
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
