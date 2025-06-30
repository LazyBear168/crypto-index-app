// File: src/components/LongShortRatio.jsx
import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styling

const symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT"];

export default function LongShortRatio() {
  const [ratios, setRatios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRatios() {
      try {
        const results = await Promise.all(
          symbols.map((symbol) =>
            fetch(
              `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=1h&limit=1`
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
        console.error("Failed to fetch long/short ratio:", err);
        setLoading(false);
      }
    }

    fetchRatios();
  }, []);

  if (loading) return <p>Loading long/short ratios...</p>;

  return (
    <div className="top-container">
      <h2>📊 Long vs Short Ratio (1h)</h2>
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
