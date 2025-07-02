// File: src/components/FuturesMarket.jsx
import { useEffect, useState } from "react";
import "./TokenList.css";
import { BsCoin, BsBarChartLineFill } from "react-icons/bs";
import { RiExchangeLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import mockData from "../mock/futures.json";
import { fetchWithFallback } from "../utils/fetchWithFallback";

export default function FuturesMarket() {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const url = "https://fapi.binance.com/fapi/v1/ticker/24hr";

    fetchWithFallback(url, mockData)
      .then((data) => {
        const top = data
          .filter(
            (item) =>
              item.symbol.endsWith("USDT") && parseFloat(item.lastPrice) > 0
          )
          .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 10);

        setSymbols(top);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading futures market data...</p>;

  return (
    <div className="top-container">
      <h2>{t("FuturesMarket.title")}</h2>
      {symbols[0]?.isMock && (
        <div style={{ color: "orange", fontSize: "12px" }}>
          ⚠️ Displaying fallback (mock) data.
        </div>
      )}
      <ul className="top-list">
        {symbols.map((item, index) => (
          <li key={item.symbol} className="top-item">
            <span>{index + 1}.</span>
            <div style={{ width: "150px", alignItems: "left" }}>
              <strong>{item.symbol}</strong>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BsCoin size={20} color=" orange" style={{ margin: "4px" }} />
                {t("FuturesMarket.Price")}: $
                {parseFloat(item.lastPrice).toLocaleString()}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BsBarChartLineFill
                  size={20}
                  color=" green"
                  style={{ margin: "4px" }}
                />
                {t("FuturesMarket.Volume")}:{" "}
                {parseFloat(item.volume).toLocaleString()}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RiExchangeLine
                  size={20}
                  color=" blue"
                  style={{ margin: "4px" }}
                />
                {t("FuturesMarket.Change")}:&nbsp;
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
