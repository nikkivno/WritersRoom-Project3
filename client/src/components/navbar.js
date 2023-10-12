import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    const currentPage = window.location.pathname;
    const history = useHistory();

    let user = JSON.parse(localStorage.getItem('user'));
    console.warn(user);

    function logOut() {
        localStorage.clear();
        history.push('/')
    };

    return (
        <nav>
            <div className="title">
                <h1>Writer's Room</h1>
            </div>
            <ul>
                <li><a href='/' className={currentPage === '/' ? 'active' : ''}>Login/sign up</a></li>
                <li><a href='/about' className={currentPage === '/about' ? 'active' : ''}>About</a></li>
                <li><a href='/newwork' className={currentPage === '/newwork' ? 'active' :''}>new Work</a></li>
                <li><a href='/ongoingwork' classname={currentPage === '/ongoingwork' ? 'active' : ''}>ongoing Work</a></li>
                <li onClick={logOut}><a href='/' className={currentPage === '/' ? 'active' : ''}>Logout</a></li>
            </ul>
        </nav>
    );
}

export default Navbar; 

