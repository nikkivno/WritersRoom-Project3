import React, {useState} from 'react';
import '../styles/step2.css';

function Step2() {
    const currentPage = window.location.pathname;
    
    const [textInput1, setTextInput1] = useState('');
    const [textInput2, setTextInput2] = useState('');
    

    const handleInputChange = (e) => {
        const {name, value} = e.target;
    
    if (name === 'textInput1') {
        setTextInput1(value);
    } else if (name === 'textInput2') {
        setTextInput2(value);
    }
};

const handleFormSubmit = async (e) => {
    e.preventDefault();
};

    return (
        <div>
            <div>
                <h1>The Catylist</h1>
            </div>
            <form id='catylist' onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor='Question1'>Question Here</label>
                    <input 
                        value={textInput1}
                        name='Question1'
                        onChange={handleInputChange}
                        type='text'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='Question2'>Question Here</label>
                    <input 
                         value={textInput2}
                         name='Question2'
                         onChange={handleInputChange}
                         type='text'
                         required
                    />
                </div>
                    <button type='submit'>Save</button>
                </form>
        <div>
        <button><a href ='/step3' className={currentPage === '/step3' ? 'active' : ''}>Next Step</a></button>
        </div>
    </div>
    )
}

export default Step2;