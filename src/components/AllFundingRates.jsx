import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styles
import { RiExchangeLine } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function AllFundingRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchRates() {
      try {
        // Step 1: Get top 10 USDT futures pairs
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

        // Step 2: Fetch funding rates
        const results = await Promise.all(
          topSymbols.map((symbol) =>
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
      <h2>{t("FundingRates.title")}</h2>
      <ul className="top-list">
        {rates.map(({ symbol, fundingRate, fundingTime }, index) => (
          <li key={symbol} className="top-item">
            <span>{index + 1}.</span>
            <div style={{ width: "150px", alignItems: "left" }}>
              <strong>{symbol}</strong>
            </div>

            <div style={{ minWidth: "400px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RiExchangeLine
                  size={20}
                  color=" orange"
                  style={{ margin: "4px" }}
                />{" "}
                {t("FundingRates.Rate")}:{" "}
                <span style={{ color: fundingRate >= 0 ? "green" : "red" }}>
                  {(fundingRate * 100).toFixed(4)}%
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IoTimeOutline
                  size={20}
                  color=" purple"
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
