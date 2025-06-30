// File: src/components/TokenList.jsx
import { useEffect, useState } from "react";
import "./TokenList.css";

export default function TokenList({ limit = 10 }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h2>Top {limit} Cryptocurrencies</h2>
      <ul className="top-list">
        {coins.map((coin, i) => (
          <li key={coin.id}>
            <span>{i + 1}. </span>
            <img src={coin.image} alt={coin.name} width="20" />
            <strong>
              {coin.name} ({coin.symbol.toUpperCase()})
            </strong>
            : ${coin.current_price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
