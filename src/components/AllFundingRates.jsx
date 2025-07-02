// File: src/components/AllFundingRates.jsx
import { useEffect, useState } from "react";
import "./TokenList.css";
import { RiExchangeLine } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import mockData from "../mock/fundingRates.json";
import { fetchWithFallback } from "../utils/fetchWithFallback";

export default function AllFundingRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchRates() {
      try {
        // Step 1: Get top 10 USDT futures pairs from market API
        const marketData = await fetchWithFallback(
          "https://fapi.binance.com/fapi/v1/ticker/24hr",
          []
        );

        if (!Array.isArray(marketData) || marketData.length === 0) {
          throw new Error("Market data fetch failed");
        }

        const topSymbols = marketData
          .filter(
            (item) =>
              item.symbol.endsWith("USDT") && parseFloat(item.lastPrice) > 0
          )
          .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 10)
          .map((item) => item.symbol);

        // Step 2: Fetch funding rates for top symbols
        const results = await Promise.all(
          topSymbols.map((symbol) =>
            fetchWithFallback(
              `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol}&limit=1`,
              [
                {
                  symbol,
                  fundingRate: 0,
                  fundingTime: new Date().toISOString(),
                  isMock: true,
                },
              ]
            ).then((data) => ({
              symbol,
              fundingRate: parseFloat(data[0]?.fundingRate ?? 0),
              fundingTime: new Date(data[0]?.fundingTime ?? 0).toLocaleString(),
              isMock: data[0]?.isMock ?? false,
            }))
          )
        );

        setRates(results);
      } catch (err) {
        console.error("❌ All fallback failed, using full mock data:", err);
        setRates(mockData); // use preloaded full fallback
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  if (loading) return <p>Loading funding rates...</p>;

  const isUsingMock = rates.length > 0 && rates.every((r) => r.isMock);

  return (
    <div className="top-container">
      <h2>{t("FundingRates.title")}</h2>
      {isUsingMock && (
        <div style={{ fontSize: "12px", color: "orange" }}>
          ⚠️ Displaying fallback (mock) data.
        </div>
      )}
      <ul className="top-list">
        {rates.map(({ symbol, fundingRate, fundingTime }, index) => (
          <li key={symbol} className="top-item">
            <span>{index + 1}.</span>
            <div style={{ width: "150px" }}>
              <strong>{symbol}</strong>
            </div>
            <div style={{ minWidth: "400px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RiExchangeLine
                  size={20}
                  color="orange"
                  style={{ margin: "4px" }}
                />
                {t("FundingRates.Rate")}:&nbsp;
                <span style={{ color: fundingRate >= 0 ? "green" : "red" }}>
                  {(fundingRate * 100).toFixed(4)}%
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IoTimeOutline
                  size={20}
                  color="purple"
                  style={{ margin: "4px" }}
                />
                {t("FundingRates.Time")}: {fundingTime}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
