import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


export default function GuestGuard({ children }) {
    const { isAuth } = useSelector((state) => state.auth)

    if (isAuth) return <Navigate to="/dashboard" />

    return <>{children}</>;
}
