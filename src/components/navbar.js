import React from 'react';
import '../styles/navbar.css';

function Navbar() {
    const currentPage = window.location.pathname;
    return (
        <nav>
            <div className="title">
                <h1>Writer's Room</h1>
            </div>
            <ul>
                <li><a href='/' className={currentPage === '/' ? 'active' : ''}>Login/Sign Up</a></li>
                <li><a href='/newWork' className={currentPage === '/newWork' ? 'active' : ''}>New Work</a></li>
                <li><a href='/about' className={currentPage === '/about' ? 'active' : ''}>About</a></li>
            </ul>
        </nav>
    );
}

export default Navbar; 

