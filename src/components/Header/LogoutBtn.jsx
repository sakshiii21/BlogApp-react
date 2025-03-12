import React from 'react';
import {useDispatch} from 'react-redux';
import service from '../../appwrite/config';
import {logout} from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        service.logout().then(() => {
            dispatch(logout());
    });}
    return (
        <button
            className="text-white bg-red-500 px-4 py-2 rounded"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;