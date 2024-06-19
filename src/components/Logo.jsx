import React from 'react'

function Logo({ className = "" }) {
    return (
        <div className={`${className}`}>
            <img src='icon.svg' alt='Logo' />
        </div>

    )
}

export default Logo