import React from 'react'

function Logo({ className = "", background = "transparent" }) {
    return (
        <div className={`${className}`}>
            <img className={`bg-${background}`} src='/icon.svg' alt='Logo' />
        </div>

    )
}

export default Logo