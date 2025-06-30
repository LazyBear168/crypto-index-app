import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function KLineChart({ pair }) {
  const [series, setSeries] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const getEndpoint = (pair) => {
  const symbol = pair.split('/')[0].toLowerCase(); // e.g., 'BTC/USDT' -> 'btc'
  return `https://crypto-index-backend.onrender.com/kline/${symbol}`;
  };


  const fetchKlineData = async (start, end) => {
    try {
      setLoading(true);
      const endpoint = getEndpoint(pair);
      const res = await fetch(
        `${endpoint}?pair=${pair}&start=${start}&end=${end}`
      );
      const data = await res.json();

      const transformed = data.map((item) => ({
        x: new Date(item.timestamp),
        y: [
          Number(item.open),
          Number(item.high),
          Number(item.low),
          Number(item.close),
        ],
      }));

      if (transformed.length === 0) return;

      setSeries([{ data: transformed }]);
      setStartDate(new Date(transformed[0].x));
      setEndDate(new Date(transformed[transformed.length - 1].x));
    } catch (err) {
      console.error("❌ Failed to fetch K-line data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const now = new Date();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const past = new Date(now.getTime() - oneWeek);
    fetchKlineData(past.toISOString(), now.toISOString());
  }, [pair]);

  const handleLoadOlder = () => {
    if (!startDate) return;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const newEnd = new Date(startDate.getTime() - 1);
    const newStart = new Date(newEnd.getTime() - oneWeek);
    fetchKlineData(newStart.toISOString(), newEnd.toISOString());
  };

  const handleLoadNewer = () => {
    if (!endDate) return;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const newStart = new Date(endDate.getTime() + 1);
    const newEnd = new Date(newStart.getTime() + oneWeek);
    fetchKlineData(newStart.toISOString(), newEnd.toISOString());
  };

  const chartOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false, // Hide toolbar before function complete
        tools: {
          zoom: true,
          pan: true,
          reset: true,
        },
      },
    },
    title: {
      text: `${pair} Hourly Candlestick`,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: { enabled: true },
    },
  };

  if (!series.length) return <div>📈 Loading chart...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "16px" }}>K-Line Chart: {pair}</h2>
      <div style={{ marginBottom: "12px" }}>
        <button 
          onClick={handleLoadOlder} 
          disabled={loading} 
          style={{ 
            marginRight: "10px",   
            background: "white",
            border: "none",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
            width: "150px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          ← Load Older
        </button>
        <button 
          onClick={handleLoadNewer} 
          disabled={loading}
          style={{
          background: "white",
          border: "none",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
          width: "150px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px"
        }}
        >
          Load Newer → 
        </button>
      </div>
      {startDate && endDate && (
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Current display: {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
        </div>
      )}
      <Chart options={chartOptions} series={series} type="candlestick" height={350} />
    </div>
  );
}

export default KLineChart;