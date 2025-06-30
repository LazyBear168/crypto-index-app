// File: src/components/TopTraders.jsx
import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styles

const symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT"];

export default function TopTraders() {
  const [ratios, setRatios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopTraders() {
      try {
        const results = await Promise.all(
          symbols.map((symbol) =>
            fetch(
              `https://fapi.binance.com/futures/data/topLongShortPositionRatio?symbol=${symbol}&period=1h&limit=1`
            )
              .then((res) => res.json())
              .then((data) => ({
                symbol,
                long: parseFloat(data[0]?.longAccount ?? 0),
                short: parseFloat(data[0]?.shortAccount ?? 0),
                ratio: parseFloat(data[0]?.longShortRatio ?? 0),
              }))
          )
        );
        setRatios(results);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch top trader ratio:", err);
        setLoading(false);
      }
    }

    fetchTopTraders();
  }, []);

  if (loading) return <p>Loading top trader positions...</p>;

  return (
    <div className="top-container">
      <h2>📊 Top Trader Position Ratio (1h)</h2>
      <ul className="top-list">
        {ratios.map(({ symbol, long, short, ratio }, index) => (
          <li key={symbol} className="top-item">
            <span>{index + 1}.</span>
            <strong>{symbol}</strong>
            <div>
              🟩 Long: {(long * 100).toFixed(1)}% <br />
              🟥 Short: {(short * 100).toFixed(1)}% <br />
              ⚖️ Ratio (Long / Short): {ratio.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
