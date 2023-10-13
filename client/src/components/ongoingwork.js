import React, {useState, useEffect} from 'react';
import '../styles/ongoingwork.css';

function Ongoingwork() {

    useEffect(() => {
        let userId = localStorage.getItem('user_id');
        fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    })

    return(
        <div>
            <div className='work-header'>
                <h1 className='ongoingwork'>ongoing Work</h1>
            </div>
            <div className='book-cover'>
                <h2>Test Title</h2>
            </div>
        </div>
    );
}

export default Ongoingwork;