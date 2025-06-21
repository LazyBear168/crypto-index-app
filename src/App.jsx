// File name: App.jsx
// Author: sunny

/* Global reset */
import { useState } from 'react';

/* Referencing Local Object */
import TopBar from './components/Topbar/TopBar';
import KLineChart from './components/KLine/KLineChart';

/* Import css file */
import './styles/globals.css';
import './styles/reset.css';
import './styles/dark-mode.css';

function App() {
  const [selectedView, setSelectedView] = useState(null);

  return (
    <div className="app">
      <TopBar onSelectMenuItem={setSelectedView} />
      <main>
        {selectedView === 'BTC/USDT' && <KLineChart pair="BTC/USDT" />}
        {/* Add more routes later */}
      </main>
    </div>

  )
}

export default App;