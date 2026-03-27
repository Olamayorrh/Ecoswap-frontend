import { useContext } from "react";
import { Navigate } from "react-router";
import { userContext } from "../context/Context";

/**
 * ProtectedRoute
 * Wraps any route that requires authentication.
 * If the user is not logged in, redirects to the landing page (/).
 */
const ProtectedRoute = ({ children }) => {
    const { userInfo } = useContext(userContext);

    if (!userInfo) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
