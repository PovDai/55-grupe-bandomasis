import React, { useEffect, useState } from 'react';

export default function StockPrice({ symbol }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!symbol) return;
    const fetchQuote = async () => {
      setLoading(true);
      setErr('');
      try {
        const res = await fetch(`http://localhost:5539/api/stock/${encodeURIComponent(symbol)}/quote`);
        if (!res.ok) throw new Error(`Server ${res.status}`);
        const json = await res.json();
        if (json.status !== 'success') throw new Error(json.msg || 'API error');
        setQuote(json.data);
      } catch (e) {
        console.error(e);
        setErr('Klaida gaunant kainą');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (err) return <div style={{ color: 'red' }}>{err}</div>;
  if (!quote) return null;

  // Finnhub quote returns: c (current), h (high), l (low), o (open), pc (prev close), t (timestamp)
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: 8 }}>
      <h3>{symbol.toUpperCase()}</h3>
      <div>Current price: {quote.c ?? '—'}</div>
      <div>High: {quote.h ?? '—'}</div>
      <div>Low: {quote.l ?? '—'}</div>
      <div>Open: {quote.o ?? '—'}</div>
      <div>Prev close: {quote.pc ?? '—'}</div>
      <div>Timestamp: {quote.t ? new Date(quote.t * 1000).toLocaleString() : '—'}</div>
    </div>
  );
}