import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { generateApiJwt } from "../../utils/jwt";
import { API_BASE_URL } from "../../utils/api";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);

            const flag = `user_synced_${user.uid}`;
            if (!localStorage.getItem(flag)) {
                await sendUserToBackend(user);
                localStorage.setItem(flag, "true");
            }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    async function sendUserToBackend(user) {
        const token = generateApiJwt();

        await axios.post(
            `${API_BASE_URL}/res/user/create`,
            {
                firebase_uuid: user.uid,
                name: user.displayName,
                email: user.email,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )


};