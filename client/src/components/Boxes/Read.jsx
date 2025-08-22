import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router"

 export  function Read() {
  const [box, setBox] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBox() {
      try {
        const res = await fetch(`http://localhost:5539/api/admin/get_student/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const result = await res.json();
        setBox(result.box); // vienas objektas
      } catch (err) {
        console.error(err);
      }
    }
    fetchBox();
  }, [id]);

  if (!box) return <p>Loading...</p>;

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>Box {id}</h1>
      <Link to="/admin/students" className="btn btn-success">Back</Link>
      <ul className="list-group mt-3">
        <li className="list-group-item"><b>ID: </b>{box.id}</li>
        <li className="list-group-item"><b>Name: </b>{box.name}</li>
        <li className="list-group-item"><b>Weight: </b>{box.weight} kg</li>
        <li className="list-group-item"><b>Image: </b>{box.image}</li>
        <li className="list-group-item"><b>Flammable: </b>{box.flammable}</li>
        <li className="list-group-item"><b>Perishable: </b>{box.perishable}</li>
      </ul>
    </div>
  );
}




