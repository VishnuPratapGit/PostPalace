import "./header.css"
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Logo, LogoutBtn } from '../index'


function Header({ isVisible }) {
    const authStatus = useSelector((state) => state.auth.status);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "My Posts",
            slug: "/my-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]


    return (
        <nav className={`navbar w-4/5 sm:w-full h-screen sm:h-20 sm:px-10 lg:px-20 py-4 sm:border-b border-zinc-700 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full sm:opacity-100 sm:translate-x-0'}`}>
            <div className="header-logo rounded-md overflow-hidden hidden sm:block">
                <Logo className="max-w-40" background="white" />
            </div>
            <div className="flex flex-col justify-between items-center h-1/2 sm:h-full w-full sm:w-3/5 overflow-hidden p-1 sm:flex-row">
                {navItems.map((link) => link.active ? (
                    <NavLink
                        key={link.name}
                        className={({ isActive }) => isActive ? "active" : ""}
                        to={link.slug}>{link.name}
                    </NavLink>
                ) : null)}
                {authStatus && <LogoutBtn />}
            </div>
        </nav>
    );
}

export default Header;