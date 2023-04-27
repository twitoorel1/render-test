import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import Login from "src/pages/Auth/LoginPage"

export default function AuthGuard({ children }) {
    const { isAuth } = useSelector((state) => state.auth);
    const { pathname } = useLocation();
    const [redirect, setRedirect] = useState(false);

    if (!isAuth) {
        if (pathname !== redirect) {
            setRedirect(pathname)
        }
        return <Login />;
    }

    if (redirect && pathname !== redirect) {
        setRedirect(null)
        return <Navigate to={redirect} />
    }

    return <>{children}</>
}
