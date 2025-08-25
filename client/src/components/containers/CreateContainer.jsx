import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; // Teisingas importas

export function CreateContainer() {
  const [values, setValues] = useState({
    size: '',
    id_number: '',
  });

  const navigate = useNavigate();

  // Funkcija generuoti 5 simbolių unikalų ID
  function generateId(length = 9) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const containerData = {
      ...values,
      id_number: values.id_number || generateId(), // jei vartotojas neįvedė, sugeneruojame
    };

    try {
      const res = await fetch('http://localhost:5539/api/admin/add_container', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(containerData),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      console.log(data);

      navigate('/admin/containers');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='container-fluid vh-100 py-4'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6 bg-white p-4 rounded shadow-sm'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h3>Add Container</h3>
            <Link to='/admin/containers' className='btn btn-success'>Back</Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='form-group my-3'>
              <label>Id_number</label>
              <input
                type='text'
                className='form-control'
                value={values.id_number}
                onChange={e => setValues({ ...values, id_number: e.target.value })}
                placeholder='Unikalus ID susigeneruos jeigu neįvesite reikšmės'
              />
            </div>

            <div className='form-group my-3'>
              <label>Size</label>
              <select
                className='form-select'
                required
                value={values.size}
                onChange={e => setValues({ ...values, size: e.target.value })}
              >
                <option value=''>Pasirinkite</option>
                <option value='S - telpa 2 dėžės;'>S size container</option>
                <option value='M - telpa 4 dėžės;'>M size container</option>
                <option value='L - telpa 6 dėžės;'>L size container</option>
              </select>
            </div>

            <button type='submit' className='btn btn-success my-3'>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}