import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from "jwt-decode";
import api from '../../api';

const AuthContext = React.createContext({});
const AuthConsumer = AuthContext.Consumer;

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    const loginSuccess = (token, user) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        setIsLogin(true);
    }

    const signOut = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    }

    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogin(true);
        }
    }
    useEffect(() => {
        checkToken();
    }, [])

    return (
        <AuthContext.Provider value={{ isLogin, loginSuccess, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthConsumer, AuthProvider };