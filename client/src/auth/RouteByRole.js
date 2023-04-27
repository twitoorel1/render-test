import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"


export default function RouteByRole({ hasContent, roles, children }) {
    const { pathname } = useLocation();
    const { user } = useSelector((state) => state.auth)
    const currentRole = user?.role;

    if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
        return hasContent ? <p>Permission Denied <br /> You do not have permission to access this page</p> : null;
    }

    if (!currentRole.includes('admin') && pathname.includes('admin')) {
        return hasContent ? <p>Permission Denied <br /> Route For Only Admin</p> : null;
    }

    return <>{children}</>;
}
