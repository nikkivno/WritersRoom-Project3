import React, { useState } from 'react';
import '../styles/step4.css';

function Step4() {
    const currentPage = window.location.pathname;

    const [textarea1, setTextArea1]=useState('');
    const [textarea2, setTextArea2]=useState('');
    const [textarea3, setTextArea3]=useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === 'textarea1') {
            setTextArea1(value);
        } else if (name === 'textarea2') {
            setTextArea2(value);
        } else if (name === 'textarea3') {
            setTextArea3(value);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <div>
                <h1>The Climactic Ending</h1>
            </div>
            <form id='conclusion' onSubmit={handleFormSubmit}>
                <div>
                    <label>What plot moments lead up to the climax?</label>
                    <input 
                        value={textarea1}
                        name='textarea1'
                        onChange={handleInputChange}
                        type='text'
                        required
                    />
                </div>
                <div>
                    <label>What is the pinnacle of the story? (ex. The climax)</label>
                    <input 
                        value={textarea2}
                        name='textarea2'
                        onChange={handleInputChange}
                        type='text'
                        required
                    />
                </div>
                <div>
                    <label>What is the fallout from the events of the story? (ex. what happens to characters, town, etc)</label>
                    <input 
                        value={textarea2}
                        name='textarea2'
                        onChange={handleInputChange}
                        type='text'
                        required
                    />
                </div>
                <button type='submit'>Save</button>
            </form>
            <div>
                <button><a href ='/writing' className={currentPage === '/writing' ? 'active' : ''}>Get Writing!</a></button>
            </div>
        </div>
    )
}

export default Step4;