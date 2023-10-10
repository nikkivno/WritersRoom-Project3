import React, {useState} from 'react';
import '../styles/step2.css';

function Step2() {
    const currentPage = window.location.pathname;
    
    const [textInput1, setTextInput1] = useState('');
    const [textInput2, setTextInput2] = useState('');
    const [textInput3, setTextInput3] = useState('');
    const [textInput4, setTextInput4] = useState('');
    const [textInput5, setTextInput5] = useState('');
    

    const handleInputChange = (e) => {
        const {name, value} = e.target;
    
    if (name === 'textInput1') {
        setTextInput1(value);
    } else if (name === 'textInput2') {
        setTextInput2(value);
    } else if (name === 'textInput3') {
        setTextInput3(value);
    } else if (name === 'textInput4') {
        setTextInput4(value);
    } else if (name === 'textInput5') {
        setTextInput5(value);
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
                    <label htmlFor='Question1'>Who are the main characters?</label>
                    <input 
                        value={textInput1}
                        name='Question1'
                        onChange={handleInputChange}
                        type='text'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='Question2'>What is the reason the characters are together or seperated?</label>
                    <input 
                         value={textInput2}
                         name='Question2'
                         onChange={handleInputChange}
                         type='text'
                         required
                    />
                </div>
                <div>
                    <label htmlFor='Question3'>When is the story taking place?</label>
                    <input 
                         value={textInput3}
                         name='Question2'
                         onChange={handleInputChange}
                         type='text'
                         required
                    />
                </div>
                <div>
                    <label htmlFor='Question4'>Where is the location of the story?</label>
                    <input 
                         value={textInput4}
                         name='Question2'
                         onChange={handleInputChange}
                         type='text'
                         required
                    />
                </div>
                <div>
                    <label htmlFor='Question5'>What is the inciting action that propells the characters through the story?</label>
                    <input 
                         value={textInput5}
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