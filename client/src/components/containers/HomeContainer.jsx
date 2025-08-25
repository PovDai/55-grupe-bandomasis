import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

export function HomeContainer() {
  const [data, setData] = useState([])
  const [deleted, setDeleted] = useState(true)

  useEffect(() => {
    async function fetchContainer() {
      try {
        const res = await fetch('http://localhost:5539/api/admin/containers') // pilnas URL su portu
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }
        const result = await res.json()
        if (result.status === 'success') {
          setData(result.container) // čia dabar masyvas
        } else {
          setData([])
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (deleted) {
      setDeleted(false)
      fetchContainer()
    }
  }, [deleted])

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:5539/api/admin/deleteContainer/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`)
      }
      setDeleted(true) // perkraus studentų sąrašą
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container-fluid vh-100 bg-primary p-3'>
      <h3>Containers</h3>
      <div className='d-flex justify-content-end mb-3'>
        <Link className='btn btn-success' to='/admin/createContainer'>Add Container</Link>
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Container size</th>
            <th>ID_number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((container) => (
            <tr key={container.id}>
              <td>{container.id}</td>
              <td>{container.size}</td>
              <td>{container.id_number}</td>
          
              <td>
                <Link className='btn mx-2 btn-success' to={`/admin/readContainer/${container.id}`}>Read</Link>
                <Link className='btn mx-2 btn-success' to={`/admin/editContainer/${container.id}`}>Edit</Link>
                <button 
                  onClick={() => handleDelete(container.id)} 
                  className='btn mx-2 btn-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}