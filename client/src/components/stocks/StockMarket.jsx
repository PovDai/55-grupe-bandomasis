import React, { useState, useEffect } from 'react';

export function StockTracker() {
  const [symbol, setSymbol] = useState('TSLA');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async (currentSymbol) => {
    if (!currentSymbol) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`http://localhost:5539/api/stock/${currentSymbol}`);
      const json = await res.json();
      const quote = json['Global Quote'];

      if (!quote) throw new Error('Nepavyko gauti duomenų iš API.');

      setData({
        symbol: quote['01. symbol'],
        open: parseFloat(quote['02. open']),
        high: parseFloat(quote['03. high']),
        low: parseFloat(quote['04. low']),
        price: parseFloat(quote['05. price']),
        volume: parseInt(quote['06. volume']),
        latestDay: quote['07. latest trading day'],
        previousClose: parseFloat(quote['08. previous close']),
        change: parseFloat(quote['09. change']),
        changePercent: quote['10. change percent'],
      });
    } catch (err) {
      console.error('Klaida gaunant akcijų duomenis:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchStockData(symbol.toUpperCase());
    }, 500);
    return () => clearTimeout(delay);
  }, [symbol]);

  return (
    <div className="stock-container">
      <h1 className="title">📈 Akcijų Stebėjimas max 25 in day</h1>

      <input
        type="text"
        placeholder="Įveskite tikerį (pvz. TSLA, AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        className="ticker-input"
      />

      {loading && <p className="loading">Kraunama...</p>}
      {error && <p className="error">❌ {error}</p>}

      {data && !loading && !error && (
        <div className="stock-card">
          <h2>{data.symbol}</h2>
          <p className="price">Kaina: ${data.price.toFixed(2)}</p>
          <p className={`change ${data.change >= 0 ? 'positive' : 'negative'}`}>
            Pokytis: {data.change.toFixed(2)} ({data.changePercent})
          </p>

          <div className="details">
            <p>Atidarymo kaina: ${data.open.toFixed(2)}</p>
            <p>Aukščiausia: ${data.high.toFixed(2)}</p>
            <p>Žemiausia: ${data.low.toFixed(2)}</p>
            <p>Uždarymas (praeitas): ${data.previousClose.toFixed(2)}</p>
            <p>Apyvarta: {data.volume.toLocaleString()} vnt.</p>
            <p>Paskutinė prekybos diena: {data.latestDay}</p>
          </div>
        </div>
      )}
    </div>
  );
}