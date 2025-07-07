// File: src/components/LongShortRatio.jsx
// Author: Cheng
// Description:
//    Displays the global long/short account ratio for the top 10 USDT futures pairs on Binance.
//    Fetches real-time data from the Binance API and falls back to mock data when necessary.
//    Uses i18n for translations and simple visual indicators for clarity.

import { useEffect, useState } from "react";
import "./TokenList.css";
import { useTranslation } from "react-i18next";
import mockData from "../mock/longShortRatios.json";
import { fetchWithFallback } from "../utils/fetchWithFallback";

export default function LongShortRatio() {
  const [ratios, setRatios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchRatios() {
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
              `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=1h&limit=1`,
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

        // 若沒抓到有效資料，回傳 mock
        if (results.length === 0 || results.some((r) => isNaN(r.ratio))) {
          setRatios(mockData); // mock 加上 `"isMock": true` 屬性
        } else {
          setRatios(results);
        }
      } catch (err) {
        console.error("❌ Failed to fetch long/short ratios:", err);
        setRatios(mockData);
      } finally {
        setLoading(false);
      }
    }

    fetchRatios();
  }, []);

  if (loading) return <p>Loading long/short ratios...</p>;

  return (
    <div className="top-container">
      <h2>{t("LongShortRatio.title")}</h2>
      {ratios[0]?.isMock && (
        <div style={{ color: "orange", fontSize: "12px" }}>
          ⚠️ Displaying fallback (mock) data.
        </div>
      )}
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
