import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate('/signin')
    }, [])
    return (
        <div></div>
    )
}

export default Logout;