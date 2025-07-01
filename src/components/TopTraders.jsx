import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styles
import { useTranslation } from "react-i18next";

export default function TopTraders() {
  const [ratios, setRatios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchTopTraders() {
      try {
        // Step 1: Get top 10 USDT futures pairs by volume
        const marketRes = await fetch(
          "https://fapi.binance.com/fapi/v1/ticker/24hr"
        );
        const marketData = await marketRes.json();
        const topSymbols = marketData
          .filter(
            (item) =>
              item.symbol.endsWith("USDT") && parseFloat(item.lastPrice) > 0
          )
          .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 10)
          .map((item) => item.symbol);

        // Step 2: Fetch top trader ratio for each symbol
        const results = await Promise.all(
          topSymbols.map((symbol) =>
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
      <h2>{t("TopTrader.title")}</h2>
      <ul className="top-list">
        {ratios.map(({ symbol, long, short, ratio }, index) => (
          <li key={symbol} className="top-item">
            <span>{index + 1}.</span>
            <div style={{ width: "150px", alignItems: "left" }}>
              <strong>{symbol}</strong>
            </div>
            <div style={{ minWidth: "400px" }}>
              <div>
                🟩 {t("TopTrader.Long")}: {(long * 100).toFixed(1)}%
              </div>
              <div>
                🟥 {t("TopTrader.Short")}: {(short * 100).toFixed(1)}%
              </div>
              <div>
                ⚖️ {t("TopTrader.Ratio")}: {ratio.toFixed(2)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
