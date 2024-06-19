import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const userSpecialId = Cookies.get('user-accessToken');
                if (userSpecialId) {
                    const response = await axios.get('http://localhost:3000/api/v1/user/check-auth', {
                        headers: {
                            'Authorization': `Bearer ${userSpecialId}`
                        }
                    });
                    setIsLoggedIn(response.data.data.isLoggedIn);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsLoggedIn(false);
            }
        };

        checkAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
