// File: src/components/SpotMarket.jsx
import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styling
import { BsCoin, BsBarChartLineFill } from "react-icons/bs";
import { RiExchangeLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export default function SpotMarket() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch spot market data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading spot market data...</p>;

  return (
    <div className="top-container">
      <h2>{t("SpotMarket.title")}</h2>
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
                  size={24}
                  color=" blue"
                  style={{ margin: "4px" }}
                />{" "}
                {t("SpotMarket.Change")}:{" "}
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
