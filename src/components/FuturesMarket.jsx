// File: src/components/FuturesMarket.jsx
import { useEffect, useState } from "react";
import "./TokenList.css"; // Reuse styles

export default function FuturesMarket() {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fapi.binance.com/fapi/v1/ticker/24hr")
      .then((res) => res.json())
      .then((data) => {
        // Filter top pairs like BTCUSDT and ETHUSDT
        const top = data.filter((item) =>
          ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "DOGEUSDT"].includes(
            item.symbol
          )
        );
        setSymbols(top);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch futures market data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading futures market data...</p>;

  return (
    <div className="top-container">
      <h2>📉 Futures Market (Binance)</h2>
      <ul className="top-list">
        {symbols.map((item, index) => (
          <li key={item.symbol} className="top-item">
            <span>{index + 1}.</span>
            <strong>{item.symbol}</strong>
            <div>
              💵 Price: ${parseFloat(item.lastPrice).toLocaleString()}
              <br />
              🔁 Volume (24h): {parseFloat(item.volume).toLocaleString()}
              <br />
              📈 Change (24h):{" "}
              <span
                style={{
                  color: item.priceChangePercent >= 0 ? "green" : "red",
                }}
              >
                {parseFloat(item.priceChangePercent).toFixed(2)}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
