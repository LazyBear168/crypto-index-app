// File: src/components/SpotMarket.jsx
// Author: Cheng
// Description:
//    Displays top 10 cryptocurrencies from the CoinGecko spot market ranked by market cap.
//    Shows each coin's name, price, 24h volume, and 24h price change.
//    Includes i18n, mock fallback support, and icon-enhanced UI layout.

import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styling
import { BsCoin, BsBarChartLineFill } from "react-icons/bs";
import { RiExchangeLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import mockData from "../mock/coins.json";
import { fetchWithFallback } from "../utils/fetchWithFallback";

export default function SpotMarket() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const isMock = coins.length > 0 && coins.every((coin) => coin.isMock);

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`;
    fetchWithFallback(url, mockData)
      .then((data) => setCoins(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading spot market data...</p>;

  return (
    <div className="top-container">
      <h2>{t("SpotMarket.title")}</h2>
      {isMock && (
        <div style={{ color: "orange", fontSize: "12px" }}>
          ⚠️ Displaying fallback (mock) data.
        </div>
      )}

      <ul className="top-list">
        {coins.map((coin, index) => (
          <li key={coin.id} className="top-item">
            <span className="titleNumber">
              {index + 1}.
              <img src={coin.image} alt={coin.name} width="20" />
            </span>
            <div style={{ width: "150px", alignItems: "left" }}>
              <strong>
                {coin.name} ({coin.symbol.toUpperCase()})
              </strong>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BsCoin size={20} color=" orange" style={{ margin: "4px" }} />{" "}
                {t("SpotMarket.Price")}: ${coin.current_price.toLocaleString()}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BsBarChartLineFill
                  size={20}
                  color=" green"
                  style={{ margin: "4px" }}
                />{" "}
                {t("SpotMarket.Volume")}: ${coin.total_volume.toLocaleString()}
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <RiExchangeLine
                  size={20}
                  color=" blue"
                  style={{ margin: "4px" }}
                />{" "}
                {t("SpotMarket.Change")}:&nbsp;
                <span
                  style={{
                    color:
                      coin.price_change_percentage_24h >= 0 ? "green" : "red",
                  }}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
