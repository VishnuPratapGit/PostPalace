import "./header.css"
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Logo, LogoutBtn } from '../index'


function Header({ isVisible, setVisible }) {
    const authStatus = useSelector((state) => state.auth.status);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
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
        <nav className={`navbar w-4/5 sm:w-full h-screen overflow-hidden sm:h-20 sm:px-10 lg:px-20 py-4 sm:border-b sm:border-zinc-700 transition-all bg-stone-900 sm:bg-[rgba(244,244,244,0.02)] sm:text-white duration-300 ${isVisible ? 'translate-x-0' : ' -translate-x-full sm:translate-x-0'}`}>
            <div className="text-3xl font-semibold hidden sm:block">
                <i className="fa-solid fa-pen-clip fa-lg fa-fade"></i>PostPalace
            </div>
            <div className="flex flex-col justify-between items-center h-1/2 sm:h-full w-full sm:w-3/5 overflow-hidden p-1 sm:flex-row">
                {navItems.map((link) => link.active ? (
                    <NavLink
                        onClick={() => setVisible(false)}
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