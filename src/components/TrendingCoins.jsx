// File: src/components/TrendingCoins.jsx
import { useEffect, useState } from "react";
import "./TokenList.css";

export default function TrendingCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((data) => {
        setCoins(data.coins || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch trending coins:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading trending coins...</p>;

  return (
    <div className="top-container">
      <h2>📈 Trending Coins (Most searched coins in the last 24 hours)</h2>
      <ul className="top-list">
        {coins.map((coinObj, index) => {
          const coin = coinObj.item;
          return (
            <li key={coin.id} className="top-item">
              <span>{index + 1}.</span>
              <img src={coin.thumb} alt={coin.name} width="20" />
              <strong>
                {coin.name} ({coin.symbol.toUpperCase()})
              </strong>
              <span>Rank #{coin.market_cap_rank ?? "—"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
