import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    const currentPage = window.location.pathname;
    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem('user'));
    console.warn(user);

    function logOut() {
        localStorage.clear();
        navigate('/')
    };

    return (
        <nav>
            <div className="title">
                <h1><Link to='/' className={currentPage === '/' ? 'active' : ''}>Writer's Room</Link></h1>
            </div>
            <ul>

                <li><Link to='/login' className={currentPage === '/login' ? 'active' : ''}>login/sign up</Link></li>
                <li><Link to='/about' className={currentPage === '/about' ? 'active' : ''}>About</Link></li>
                <li><Link to='/newwork' className={currentPage === '/newwork' ? 'active' :''}>new Work</Link></li>
                <li><Link to='/ongoingwork' classname={currentPage === '/ongoingwork' ? 'active' : ''}>ongoing Work</Link></li>
                <li onClick={logOut}><Link to='/' className={currentPage === '/' ? 'active' : ''}>logout</Link></li>

            </ul>
        </nav>
    );
}

export default Navbar; 

