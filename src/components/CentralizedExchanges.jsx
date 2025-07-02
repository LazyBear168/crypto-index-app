// File: src/components/CentralizedExchanges.jsx
import { useEffect, useState } from "react";
import "./TokenList.css";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsBarChartLineFill } from "react-icons/bs";
import { MdComputer } from "react-icons/md";
import { useTranslation } from "react-i18next";
import mockData from "../mock/exchanges.json"; // ⬅️ 更換成 exchanges mock
import { fetchWithFallback } from "../utils/fetchWithFallback";

export default function CentralizedExchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1";

    fetchWithFallback(url, mockData)
      .then((data) => setExchanges(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading Centralized Exchanges data...</p>;

  return (
    <div className="top-container">
      <h2>{t("CentralizedExchanges.title")}</h2>
      {exchanges[0]?.isMock && (
        <div style={{ color: "orange", fontSize: "12px" }}>
          ⚠️ Displaying fallback (mock) data.
        </div>
      )}
      <ul className="top-list">
        {exchanges.map((exchange, index) => (
          <li key={exchange.id} className="top-item">
            <span className="titleNumber">
              {index + 1}.{" "}
              <img src={exchange.image} alt={exchange.name} width="20" />
            </span>
            <div style={{ width: "100px" }}>
              <strong>{exchange.name}</strong>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <VscWorkspaceTrusted
                  size={20}
                  color="orange"
                  style={{ margin: "4px" }}
                />
                {t("CentralizedExchanges.TrustScore")}: {exchange.trust_score}
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <BsBarChartLineFill
                  size={20}
                  color="green"
                  style={{ margin: "4px" }}
                />
                {t("CentralizedExchanges.24hVolume")}:{" "}
                {parseFloat(exchange.trade_volume_24h_btc).toFixed(2)} BTC
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <MdComputer
                  size={20}
                  color="orange"
                  style={{ margin: "4px" }}
                />
                {t("CentralizedExchanges.Website")}:&nbsp;
                <a
                  href={exchange.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exchange.url.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
