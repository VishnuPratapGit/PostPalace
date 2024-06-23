import React from 'react'

function Logo({ className = "" }) {
    return (
        <img className={`${className}`} src='/Logo.png' alt='Logo' />
    )
}

export default Logo