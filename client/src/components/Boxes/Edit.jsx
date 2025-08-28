
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router"

export function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [box, setBox] = useState({
    name: "",
    weight: "",
    image: "",
    flammable: "",
    perishable: ""
  });

  const [loading, setLoading] = useState(true); // įkėlimo būsena
  const [error, setError] = useState(null);     // klaidų būsena

  useEffect(() => {
    async function fetchBox() {
      try {
        const res = await fetch(`http://localhost:5539/api/admin/get_student/${id}`);
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        const result = await res.json();
        if (result.status === "success" && result.box) {
          setBox(result.box);
        } else {
          setError("Box not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch box data");
      } finally {
        setLoading(false);
      }
    }
    fetchBox();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5539/api/admin/edit_user/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(box)
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const result = await res.json();
      

      navigate("/admin/students"); // grįžtam į home po sėkmingo atnaujinimo
    } catch (err) {
      console.error(err);
      setError("Failed to save student data");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setBox((prev) => ({ ...prev, [name]: value }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container-fluid vh-100  bg-primary p-4">
      <h1>Edit Box {id}</h1>
      <Link to="/admin/students" className="btn btn-success mb-3">Back</Link>

      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            value={box.name}
            type="text"
            name="name"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

      <div className='form-group my-2'>
            <label htmlFor='weight'>Weight</label>
          <input
            value={box.weight}
            type='number'
            name='weight'
            required
            onChange={handleChange}
             />
        </div>
           <div className="form-group my-2">
          <label htmlFor="image">Image</label>
          <input
            value={box.image}
            type="text"
            name="image"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>
             <div className="form-group my-2">
          <label htmlFor="flame">Flammable</label>
          <input
  value={box.flammable}
  type="text"
  name="flammable"
  required
  onChange={handleChange}
  className="form-control"
/>
        </div>
             <div className="form-group my-2">
          <label htmlFor="perish">Perishable</label>
    <input
  value={box.perishable}
  type="text"
  name="perishable"
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
