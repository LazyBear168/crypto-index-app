// File name: KLineChart.jsx
// Author: sunny
import React from 'react';

function KLineChart({ pair }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>K-Line Chart: {pair}</h2>
      {/* Replace this with a real chart later */}
      <div style={{ height: '400px', background: '#ddd', textAlign: 'center', paddingTop: '180px' }}>
        📈 [K-Line Chart for {pair}]
      </div>
    </div>
  );
}

export default KLineChart;
