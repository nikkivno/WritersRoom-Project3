import React from 'react';
import '../styles/step3.css';

function Step3() {
    const currentPage = window.location.pathname;
    return (
        <div>
            <div>
                <h1>The Midpoint</h1>
            </div>
        <div>
        <button><a href ='/step4' className={currentPage === '/step4' ? 'active' : ''}>Next Step</a></button>
        </div>
    </div>
    )
}

export default Step3;