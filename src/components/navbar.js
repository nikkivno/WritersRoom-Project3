import React from 'react';
import '../styles/navbar.css';

function Navbar() {
    const currentPage = window.location.pathname;
    return (
        <nav>
            <h1>Writer's Room</h1>
            <ul>
                <li>Login/Sign Up</li>
                <li>About</li>
            </ul>
        </nav>
    );
}

export default Navbar; 

