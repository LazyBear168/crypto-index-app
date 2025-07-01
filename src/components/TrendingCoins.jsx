// File: src/components/TrendingCoins.jsx
import { useEffect, useState } from "react";
import "./TokenList.css";
import { useTranslation } from "react-i18next";

export default function TrendingCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((data) => {
        setCoins(data.coins || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch trending coins:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading trending coins...</p>;

  return (
    <div className="top-container">
      <h2>{t("newListing.title")}</h2>
      <ul className="top-list">
        {coins.map((coinObj, index) => {
          const coin = coinObj.item;
          return (
            <li key={coin.id} className="top-item">
              <span className="titleNumber">
                {index + 1}.
                <img src={coin.thumb} alt={coin.name} width="20" />
              </span>
              <div style={{ width: "250px" }}>
                <strong>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </strong>
              </div>
              <div>
                <span>Rank #{coin.market_cap_rank ?? "—"}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
