import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("notification-token");
        localStorage.removeItem("first_name");
        localStorage.removeItem("isLoggedIn");
        Cookies.remove("user-accessToken");
        window.location.href = "/";
    }, []); // Include navigate in the dependency array to avoid missing updates
    return null;
}

export default UserLogout;
