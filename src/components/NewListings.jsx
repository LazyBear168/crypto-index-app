// File: src/components/NewListings.jsx
import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse same styles
import { useTranslation } from "react-i18next";

export default function NewListings() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=50&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        // Filter coins that were recently updated (proxy for "new")
        const now = new Date();
        const recentCoins = data.filter((coin) => {
          const updated = new Date(coin.last_updated);
          const hoursAgo = (now - updated) / (1000 * 60 * 60);
          return hoursAgo < 48; // Updated within last 2 days
        });
        setCoins(recentCoins.slice(0, 10)); // Show top 10 recent
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch new listings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading new listings...</p>;

  return (
    <div className="top-container">
      <h2>{t("trendingCoins.title")}</h2>
      <ul className="top-list">
        {coins.map((coin, index) => (
          <li key={coin.id} className="top-item">
            <span className="titleNumber">
              {index + 1}.<img src={coin.image} alt={coin.name} width="20" />
            </span>
            <div style={{ width: "250px" }}>
              <strong>
                {coin.name} ({coin.symbol.toUpperCase()})
              </strong>
            </div>
            <duv>
              <span>${coin.current_price.toLocaleString()}</span>
            </duv>
          </li>
        ))}
      </ul>
    </div>
  );
}
