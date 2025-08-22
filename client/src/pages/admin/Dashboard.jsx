import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
export function Dashboard() {

    const {email,role}=useContext(UserContext)

    return (
        <main>
            <div className="container">
                <div className="row col-12">
                        <h5>Hello to the admin page :
                        <p>Esate prisijunge kaip:{role}</p>
                        <p>Jūsų prisijungimo email:{email}</p>
                        </h5>
                    </div>
            </div>
        </main>
    );
}

