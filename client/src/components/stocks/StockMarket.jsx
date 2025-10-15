import React, { useState, useEffect } from 'react';


export function StockMarket() {
  const [symbol, setSymbol] = useState('TSLA');
  const [price, setPrice] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async (currentSymbol) => {
    if (!currentSymbol) return;
    setLoading(true);
    setError(null);

    try {
    
      const res = await fetch(`http://localhost:5539/api/stock/${currentSymbol}`);
      const data = await res.json();

      const quote = data['Global Quote'];
      if (!quote) throw new Error("Nepavyko gauti duomenų. Patikrinkite simbolį.");

      setPrice(parseFloat(quote['05. price']));
      setChangePercent(parseFloat(quote['10. change percent']));

    } catch (err) {
      console.error("Klaida gaunant akcijų duomenis:", err);
      setError(err.message);
      setPrice(0);
      setChangePercent(0);
    } finally {
      setLoading(false);
    }
  };

  // Live search su debounce (500ms)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (symbol) fetchStockData(symbol.toUpperCase());
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [symbol]);

  return (
    <div className="app-container">
      <h1 className="header">📈 Akcijų Stebėjimas (Server Proxy)</h1>

      <input
        type="text"
        placeholder="Akcijos Tikeris (pvz., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        className="input"
      />

      {loading && <p>Kraunama...</p>}
      {error && <p className="error-message">Klaida: {error}</p>}

      {!loading && !error && price > 0 && (
        <div className="stock-details-card">
          <h2>{symbol.toUpperCase()}</h2>
          <p className="current-price">Kaina: ${price.toFixed(2)}</p>
          <p className={`change-percent ${changePercent >= 0 ? 'positive' : 'negative'}`}>
            Pokytis: {changePercent >= 0 ? '+' : ''}{changePercent}%
          </p>
        </div>
      )}
    </div>
  );
}
