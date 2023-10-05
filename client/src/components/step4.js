import React from 'react';
import '../styles/step4.css';

function Step4() {
    const currentPage = window.location.pathname;

    return (
        <div>
            <div>
                <h1>Conclusion</h1>
            </div>
            <div>
                <button><a href ='/writing' className={currentPage === '/writing' ? 'active' : ''}>Get Writing!</a></button>
            </div>
        </div>
    )
}

export default Step4;