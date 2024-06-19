import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../context/authSlice';

const LogoutBtn = () => {
    const dispatch = useDispatch();

    function logoutHandler() {
        authService.logout().then(() => dispatch(logout()));
    }

    return (
        <button onClick={logoutHandler}>Logout</button>
    )
}

export default LogoutBtn;