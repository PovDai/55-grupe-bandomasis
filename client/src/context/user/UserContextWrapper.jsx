import { useState } from "react";
import { UserContext } from "./UserContext";
import { initialUserContext } from "./initialUserContext";

export function UserContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(initialUserContext.isLoggedIn);
    const [role, setRole] = useState(initialUserContext.role);
    const [email, setEmail] = useState(initialUserContext.email);
    const [userId, setUserId] = useState(initialUserContext.userId);

    function login(email, userId) {
        setIsLoggedIn(true);
        setRole('admin');
        setEmail(email);
        setUserId(userId);
    }

    function logout() {
        setIsLoggedIn(initialUserContext.isLoggedIn);
        setRole(initialUserContext.role);
        setEmail(initialUserContext.email);
        setUserId(initialUserContext.userId);
    }

    const values = {
        isLoggedIn,
        role,
        email,
        userId,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    )
}