// File: src/components/FuturesMarket.jsx
import { useEffect, useState } from "react";
import "./TokenList.css"; // Reuse styles
import { BsCoin, BsBarChartLineFill } from "react-icons/bs";
import { RiExchangeLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export default function FuturesMarket() {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch("https://fapi.binance.com/fapi/v1/ticker/24hr")
      .then((res) => res.json())
      .then((data) => {
        const top = data
          .filter(
            (item) =>
              item.symbol.endsWith("USDT") && parseFloat(item.lastPrice) > 0
          )
          .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 10);

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
      <h2>{t("FuturesMarket.title")}</h2>
      <ul className="top-list">
        {symbols.map((item, index) => (
          <li key={item.symbol} className="top-item">
            <span>{index + 1}.</span>
            <div style={{ width: "150px", alignItems: "left" }}>
              <strong>{item.symbol}</strong>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BsCoin size={20} color=" orange" style={{ margin: "4px" }} />{" "}
                {t("FuturesMarket.Price")}: $
                {parseFloat(item.lastPrice).toLocaleString()}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BsBarChartLineFill
                  size={20}
                  color=" green"
                  style={{ margin: "4px" }}
                />{" "}
                {t("FuturesMarket.Volume")}:{" "}
                {parseFloat(item.volume).toLocaleString()}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RiExchangeLine
                  size={24}
                  color=" blue"
                  style={{ margin: "4px" }}
                />{" "}
                {t("FuturesMarket.Change")}:{" "}
                <span
                  style={{
                    color: item.priceChangePercent >= 0 ? "green" : "red",
                  }}
                >
                  {parseFloat(item.priceChangePercent).toFixed(2)}%
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
