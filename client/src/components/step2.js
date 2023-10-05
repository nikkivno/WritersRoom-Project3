import React from 'react';
import '../styles/step2.css';

function Step2() {
    const currentPage = window.location.pathname;
    return (
        <div>
            <div>
                <h1>The Catylist</h1>
            </div>
        <div>
        <button><a href ='/step3' className={currentPage === '/step3' ? 'active' : ''}>Next Step</a></button>
        </div>
    </div>
    )
}

export default Step2;