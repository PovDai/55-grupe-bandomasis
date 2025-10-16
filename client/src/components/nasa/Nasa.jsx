import React, { useEffect, useState } from "react";

export function Nasa() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5539/api/apod"); // Čia tavo serverio portas
        if (!res.ok) throw new Error("Nepavyko gauti duomenų iš serverio");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Kraunama...</p>;
  if (error) return <p style={{ color: "red" }}>Klaida: {error}</p>;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>{data.title}</h1>
      <p>{data.date}</p>

      {data.media_type === "image" ? (
        <img
          src={data.url}
          alt={data.title}
          style={{ maxWidth: "90%", borderRadius: "1rem" }}
        />
      ) : (
        <iframe
          title="nasa-video"
          src={data.url}
          width="640"
          height="360"
          allow="autoplay"
          style={{ borderRadius: "1rem" }}
        ></iframe>
      )}

      <p style={{ maxWidth: "700px", margin: "1rem auto" }}>
        {data.explanation}
      </p>
    </div>
  );
}