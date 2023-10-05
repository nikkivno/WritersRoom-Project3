// used for the first steps of new work. UI for the prompt generator

import React, {useState} from 'react';
import '../styles/prompt.css';

function Prompt() {
    const currentPage = window.location.pathname;

    const [textarea, setTextarea] = useState('');

    const handleInputchange = (e) => {
        const {name, value} = e.target;

        if (name === 'textarea') {
            setTextarea(value);
        }
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <div className='step1'>
                <h1>Prompt</h1>
                <p>In the area below, put in key words related to the kind of novel you'd like to write (ex. genres, setting, time periods)</p>
            </div>
            <form id='promptform' onSubmit={handleFormSubmit}>
                <textarea 
                    value={textarea}
                    name='textarea'
                    onChange={handleInputchange}
                    type='textarea'
                    placeholder=''
                    required
                />
                <button>Prompt Me</button>
            </form>
            <div>
                <button><a href ='/step2' className={currentPage === '/step2' ? 'active' : ''}>Next Step</a></button>
            </div>
        </div>
    )
}

export default Prompt;