import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export function Create() {
    const [values, setValues] = useState({
        name: '',
        weight: '',
        image: '',
        flammable: '',
        perishable: '',
    });

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5539/api/admin/add_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            if (!res.ok) throw new Error(`Server error: ${res.status}`);

            const data = await res.json();
            console.log(data);

            navigate('/admin/students');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='container vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Box</h3>
                <div className='d-flex justify-content-end'>
                    <Link to='/admin/students' className='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label>Name</label>
                        <input type='text' required
                               onChange={e => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className='form-group my-3'>
                        <label>Weight</label>
                        <input type='number' required
                               onChange={e => setValues({ ...values, weight: e.target.value })} />
                    </div>
                    <div className='form-group my-3'>
                        <label>Image</label>
                        <textarea required
                                  value={values.image}
                                  onChange={e => setValues({ ...values, image: e.target.value })}></textarea>
                    </div>
                  <div className='form-group my-3'>
    <label>Flammable</label>
    <select
        className='form-select'
        required
        value={values.flammable}
        onChange={e => setValues({ ...values, flammable: e.target.value })}
    >
        <option value=''>Pasirinkite</option>
        <option value='yes'>Taip</option>
        <option value='no'>Ne</option>
    </select>
</div>

<div className='form-group my-3'>
    <label>Perishable</label>
    <select
        className='form-select'
        required
        value={values.perishable}
        onChange={e => setValues({ ...values, perishable: e.target.value })}
    >
        <option value=''>Pasirinkite</option>
        <option value='yes'>Taip</option>
        <option value='no'>Ne</option>
    </select>
</div>
                    <button type='submit' className='btn btn-success my-3'>Save</button>
                </form>
            </div>
        </div>
    );
}