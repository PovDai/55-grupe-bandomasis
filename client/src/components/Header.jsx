import { Link, NavLink } from "react-router"
import { useContext } from "react"
import { UserContext } from "../context/user/UserContext"
import logo from '../assets/react.svg'
export function Header() {

    const { isLoggedIn } = useContext(UserContext)

    
    return (
        <div className="container">
            <div className="row">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <NavLink to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                           <img src={logo} height={32} alt="Logo" />
                        </NavLink>
                    </div>
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><NavLink to="/" className="nav-link px-2 link-secondary">Home</NavLink></li>
                        <li><NavLink to="/testing" className="nav-link px-2">Testing here</NavLink></li>
                    </ul>
                    <div className="col-md-3 text-end">
                        {isLoggedIn ? (
                            <>
                                <Link to="/admin" className="btn btn-primary me-2">Dashboard</Link>
                                <Link to="/logout" className="btn">Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="btn btn-primary me-2">Register</Link>
                                <Link to="/login" className="btn">Login</Link>
                            </>
                        )}
                    </div>
                </header>
            </div>
        </div>
    )

}