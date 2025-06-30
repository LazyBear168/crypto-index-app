// File: src/components/AllFundingRates.jsx
import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styles

const symbols = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "ADAUSDT",
  "TONUSDT",
  "AVAXUSDT",
  "DOTUSDT",
];

export default function AllFundingRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const results = await Promise.all(
          symbols.map((symbol) =>
            fetch(
              `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol}&limit=1`
            )
              .then((res) => res.json())
              .then((data) => ({
                symbol,
                fundingRate: parseFloat(data[0]?.fundingRate ?? 0),
                fundingTime: new Date(
                  data[0]?.fundingTime ?? 0
                ).toLocaleString(),
              }))
          )
        );
        setRates(results);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch funding rates:", err);
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  if (loading) return <p>Loading funding rates...</p>;

  return (
    <div className="top-container">
      <h2>🔁 Funding Rates – Top 10 Futures Pairs</h2>
      <ul className="top-list">
        {rates.map(({ symbol, fundingRate, fundingTime }, index) => (
          <li key={symbol} className="top-item">
            <span>{index + 1}.</span>
            <strong>{symbol}</strong>
            <div>
              💸 Rate:{" "}
              <span style={{ color: fundingRate >= 0 ? "green" : "red" }}>
                {(fundingRate * 100).toFixed(4)}%
              </span>
              <br />⏰ Time: {fundingTime}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
