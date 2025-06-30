import { useEffect, useState } from "react";
import "./TokenList.css"; // reuse styles

export default function CentralizedExchanges() {
  const [dexes, setDexes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/exchanges?category=dex&per_page=10&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setDexes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch Centralized Exchanges data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Centralized Exchanges data...</p>;

  return (
    <div className="top-container">
      <h2>🌐 Top 10 DEX Centralized Exchanges by 24h Volume</h2>
      <ul className="top-list">
        {dexes.map((dex, index) => (
          <li key={dex.id} className="top-item">
            <span>{index + 1}.</span>
            <img src={dex.image} alt={dex.name} width="20" />
            <strong>{dex.name}</strong>
            <div>
              🌍 Trust Score: {dex.trust_score}
              <br />
              🔁 24h Volume (BTC):{" "}
              {parseFloat(dex.trade_volume_24h_btc).toFixed(2)} BTC
              <br />
              🪙 Coins: {dex.coins_count} | Pairs: {dex.pairs_count}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
