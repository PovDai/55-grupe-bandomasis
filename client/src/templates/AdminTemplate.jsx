import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Outlet } from "react-router"
import { useContext } from "react"
import { UserContext } from '../context/user/UserContext';
import { TitlePage } from '../components/Title'
import { LoginForm } from "../components/forms/LoginForm";
import {Sidebar} from '../components/Sidebar'

export function AdminTemplate() {
        const {isLoggedIn}=useContext(UserContext)
    
    return (
      <>
            <div className="container-fluid">
                <Header />
            </div>
            <div className="container-fluid min-page-height">
                {
                    isLoggedIn
                        ? <div className="row">
                            <Sidebar />
                            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <Outlet />
                            </div>
                            
                        </div>
                        :
                        <>
                            <TitlePage title="Login" />
                            <div className="container">
                                <div className="row">
                                    <LoginForm />
                                </div>
                            </div>
                        </>
                }
            </div>
            <div className="container-fluid">
                <Footer />
            </div>
        </>
    )
}


 