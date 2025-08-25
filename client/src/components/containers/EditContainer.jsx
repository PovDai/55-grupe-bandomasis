import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router"; // Pakeistas importas

export function EditContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [container, setContainer] = useState({
    size: "",
    id_number: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContainer() {
      try {
        const res = await fetch(`http://localhost:5539/api/admin/get_container/${id}`);
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        const result = await res.json();
        if (result.status === "success" && result.container) {
          setContainer(result.container);
        } else {
          setError("Container not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch container data");
      } finally {
        setLoading(false);
      }
    }
    fetchContainer();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5539/api/admin/edit_container/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(container) // Pakeista iš 'box' į 'container'
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const result = await res.json();
      console.log(result);

      navigate("/admin/containers");
    } catch (err) {
      console.error(err);
      setError("Failed to save container data");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target; // Pakeista iš 'size' į 'name'
    setContainer((prev) => ({ ...prev, [name]: value }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container-fluid vh-100 bg-primary p-4">
      <h1>Edit Container {id}</h1>
      <Link to="/admin/containers" className="btn btn-success mb-3">Back</Link>

      <form onSubmit={handleSubmit}>
      <div className="form-group my-2">
          <label htmlFor="size">Size</label>
          <select
            name="size"
            className="form-select"
            value={container.size}
            onChange={handleChange}
            required
          >
            <option value="">Pasirinkite dydį</option>
            <option value="S - telpa 2 dėžės;">S dydžio konteineris (2 dėžės)</option>
            <option value="M - telpa 4 dėžės;">M dydžio konteineris (4 dėžės)</option>
            <option value="L - telpa 6 dėžės;">L dydžio konteineris (6 dėžės)</option>
          </select>
        </div>

        <div className="form-group my-2">
          <label htmlFor="id_number">Id_number</label>
          <input
            value={container.id_number}
            type="text"
            name="id_number" // Pataisyta rašybos klaida
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
