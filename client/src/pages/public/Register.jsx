import { RegisterForm } from "../../components/forms/RegisterForm";
import { TitlePage } from "../../components/Title";

export function RegisterPage() {
    
    return (

        <>
            <TitlePage title="Register"/>
    
        <div className='container'>
            <div className='row'>
            <RegisterForm/>
            </div>
            </div>
    </>
    )
}