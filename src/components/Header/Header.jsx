import "./header.css"
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Logo, LogoutBtn } from '../index'


function Header() {
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
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]


    return (
        <nav className='navbar px-20 py-4 border-b border-zinc-700'>
            <div className="header-logo">
                <Logo className=" w-40" />
            </div>
            <div className="flex gap-44">
                {navItems.map((links) => links.active ? (
                    <NavLink
                        key={links.name}
                        className={({ isActive }) => isActive ? "active" : ""}
                        to={links.slug}>{links.name}
                    </NavLink>
                ) : null)}
                {authStatus && <LogoutBtn />}
            </div>
        </nav>
    );
}

export default Header;