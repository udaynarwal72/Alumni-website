import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        localStorage.removeItem("notification-token");
        navigate("/signin");
    }, [navigate]); // Include navigate in the dependency array to avoid missing updates

    return null;
}

export default UserLogout;