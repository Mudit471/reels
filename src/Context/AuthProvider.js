import React, { useEffect, useState } from "react";
import { auth } from '../firebase'
export const AuthContext = React.createContext();
function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logout() {
        return auth.signOut();
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);
    const value = {
        currentUser,
        signup,
        login,
        logout
    }
    //Children would be components that would be wrapped under AuthContext and these children will get the value using AuthContext Provider and these component will only load when loading is false and we have children
    //Children has subscribed to auth context provider whenever the value changes component will re-render with the new values 
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;