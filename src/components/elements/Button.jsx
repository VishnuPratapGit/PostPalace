import React from "react";

const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "px-4 py-2 rounded-lg",
    ...props }) => {
    return (
        <button className={`${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
