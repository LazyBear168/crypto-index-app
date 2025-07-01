import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styling
import { useTranslation } from "react-i18next";

export default function LongShortRatio() {
  const [ratios, setRatios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchRatios() {
      try {
        // Step 1: Get top 10 USDT pairs by quote volume
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

        // Step 2: Fetch long/short ratio for each top symbol
        const results = await Promise.all(
          topSymbols.map((symbol) =>
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
      <h2>{t("LongShortRatio.title")}</h2>
      <ul className="top-list">
        {ratios.map(({ symbol, long, short, ratio }, index) => (
          <li key={symbol} className="top-item">
            <span>{index + 1}.</span>
            <div style={{ width: "180px", alignItems: "left" }}>
              <strong>{symbol}</strong>
            </div>

            <div style={{ minWidth: "400px" }}>
              <div>
                🟩 {t("LongShortRatio.Long")}: {(long * 100).toFixed(1)}%
              </div>
              <div>
                🟥 {t("LongShortRatio.Short")}: {(short * 100).toFixed(1)}%
              </div>
              <div>
                ⚖️ {t("LongShortRatio.Ratio")}: {ratio.toFixed(2)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
