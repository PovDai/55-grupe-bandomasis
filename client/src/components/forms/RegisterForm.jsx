import { useState } from "react"
import { useNavigate } from 'react-router';


export function RegisterForm() {

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('')
    const [email, setEmail] = useState('');
    const [emailErr, SetEmailErr] = useState('');

    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        setUsernameErr('');
        setPasswordErr('');
        SetEmailErr('');

     fetch('http://localhost:5539/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
            .then(res =>res.json())
            .then(data => {
                if (data.status === 'error') {
                    if (data.msg.username) {
                        setUsernameErr(data.msg.username);
                    }
                    if (data.msg.email) {
                        setEmailErr(data.msg.email);
                    }
                    if (data.msg.password) {
                        setPasswordErr(data.msg.password);
                    }
    
                } else {
                    navigate('/login');
                }
            })
            .catch(console.error);
    }
    
    return (

        <form onSubmit={handleSubmit}  className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="mb-4">
                <label htmlFor="username" className="form-label">Username</label>
                <input onChange={e=>setUsername(e.target.value) } id="username" value={username} type="text" className={"form-control fs-5" + (usernameErr ? 'is-invalid':'')  } required="" />
                <div className="invalid-feedback">{usernameErr }</div>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input onChange={e=>setPassword(e.target.value) } id="password" value={password} type="password" className={"form-control fs-5" + (passwordErr ? 'is-invalid':'') } required="" />
                <div className="invalid-feedback">{passwordErr }</div>
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input onChange={e => setEmail(e.target.value)} id="email" value={email} type="email" className={"form-control fs-5"+(emailErr ? 'is-invalid' : '' ) } required="" />
                <div className="invalid-feedback">{emailErr }</div>
            </div>
            <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100 py-2 fs-5">Register</button>
            </div>
        </form>
    )
}