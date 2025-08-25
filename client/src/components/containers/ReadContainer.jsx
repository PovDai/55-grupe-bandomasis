import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router"

 export  function ReadContainer() {
  const [container, setContainer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchContainer() {
      try {
        const res = await fetch(`http://localhost:5539/api/admin/get_container/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const result = await res.json();
        setContainer(result.container); // vienas objektas
      } catch (err) {
        console.error(err);
      }
    }
    fetchContainer();
  }, [id]);

  if (!container) return <p>Loading...</p>;

  return (
    <div className="container-fluid vh-100 bg-primary">
      <h1>Container {id}</h1>
      <Link to="/admin/containers" className="btn btn-success">Back</Link>
      <ul className="list-group mt-3">
        <li className="list-group-item"><b>ID: </b>{container.id}</li>
        <li className="list-group-item"><b>Size: </b>{container.size}</li>
        <li className="list-group-item"><b>ID_number: </b>{container.id_number}</li>
      </ul>
    </div>
  );
}
