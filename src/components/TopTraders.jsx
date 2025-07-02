import { useEffect, useState } from "react";
import "./TokenList.css";
import { useTranslation } from "react-i18next";
import mockData from "../mock/topTraders.json"; // <-- mock 資料
import { fetchWithFallback } from "../utils/fetchWithFallback";

export default function TopTraders() {
  const [ratios, setRatios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchTopTraders() {
      try {
        const marketData = await fetchWithFallback(
          "https://fapi.binance.com/fapi/v1/ticker/24hr",
          []
        );

        const topSymbols = marketData
          .filter(
            (item) =>
              item.symbol.endsWith("USDT") && parseFloat(item.lastPrice) > 0
          )
          .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 10)
          .map((item) => item.symbol);

        const results = await Promise.all(
          topSymbols.map(async (symbol) => {
            const data = await fetchWithFallback(
              `https://fapi.binance.com/futures/data/topLongShortPositionRatio?symbol=${symbol}&period=1h&limit=1`,
              []
            );
            return {
              symbol,
              long: parseFloat(data[0]?.longAccount ?? 0),
              short: parseFloat(data[0]?.shortAccount ?? 0),
              ratio: parseFloat(data[0]?.longShortRatio ?? 0),
            };
          })
        );

        // 若資料無效或為空 → 用 mock
        if (results.length === 0 || results.some((r) => isNaN(r.ratio))) {
          setRatios(mockData); // mockData 含 isMock
        } else {
          setRatios(results);
        }
      } catch (err) {
        console.error("❌ Failed to fetch top trader ratio:", err);
        setRatios(mockData);
      } finally {
        setLoading(false);
      }
    }

    fetchTopTraders();
  }, []);

  if (loading) return <p>Loading top trader positions...</p>;

  return (
    <div className="top-container">
      <h2>{t("TopTrader.title")}</h2>
      {ratios[0]?.isMock && (
        <div style={{ color: "orange", fontSize: "12px" }}>
          ⚠️ Displaying fallback (mock) data.
        </div>
      )}
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
