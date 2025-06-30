// File: src/components/SpotMarket.jsx
import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styling

export default function SpotMarket() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = [
      "bitcoin",
      "ethereum",
      "tether",
      "binancecoin",
      "solana",
      "ripple",
      "dogecoin",
      "cardano",
      "toncoin",
      "avalanche-2",
    ];
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
      ","
    )}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch spot market data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading spot market data...</p>;

  return (
    <div className="top-container">
      <h2>💱 Spot Market: Top 10 Cryptocurrencies</h2>
      <ul className="top-list">
        {coins.map((coin, index) => (
          <li key={coin.id} className="top-item">
            <span>{index + 1}.</span>
            <img src={coin.image} alt={coin.name} width="20" />
            <strong>
              {coin.name} ({coin.symbol.toUpperCase()})
            </strong>
            <div>
              💵 Price: ${coin.current_price.toLocaleString()}
              <br />
              🔁 Volume (24h): ${coin.total_volume.toLocaleString()}
              <br />
              📈 Change (24h):{" "}
              <span
                style={{
                  color:
                    coin.price_change_percentage_24h >= 0 ? "green" : "red",
                }}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
