import React, { useState, useEffect } from 'react';
import '../styles/step2.css';

function Step2() {
  const currentPage = window.location.pathname;

  useEffect(() => {
    async function fetchData() {
      const promptEl = document.getElementById('prompt');
      const promptId = localStorage.getItem('promptId');
      // const promptText = localStorage.getItem('promptText');

      try {
        const response = await fetch(`/api/prompts/${promptId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const prompt = await response.json();

        if (response.ok) {
          promptEl.innerHTML = prompt.prompt;
        }
      } catch (error) {
        console.log('Error getting prompt: ', error);
      }
    }

    fetchData();
  }, []);

  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [textInput3, setTextInput3] = useState('');
  const [textInput4, setTextInput4] = useState('');
  const [textInput5, setTextInput5] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

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

    const promptId = localStorage.getItem('promptId');
    const catalystData = JSON.stringify({
      characters: textInput1,
      reason: textInput2,
      time_period: textInput3,
      setting: textInput4,
      action: textInput5,
    });

    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          catalyst_input: catalystData,
        }),
      });

      if (response.ok) {
        alert('Input saved successfully');
      }
    } catch (error) {
      console.log('Error saving input: ', error);
    }
  };

  return (
    <div>
      <div className="step2Title">
        <h1>The catylist</h1>
      </div>
      <div className="promptarea">
        <p id="prompt"></p>
      </div>
      <form id="catylist" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="Question1">Who are the main characters?</label>
          <input
            value={textInput1}
            name="textInput1"
            onChange={handleInputChange}
            type="text"
            className='steps'
            required
          />
        </div>
        <div>
          <label htmlFor="Question2">
            What is the reason the characters are together or seperated?
          </label>
          <input
            value={textInput2}
            name="textInput2"
            onChange={handleInputChange}
            type="text"
            className='steps'
            required
          />
        </div>
        <div>
          <label htmlFor="Question3">When is the story taking place?</label>
          <input
            value={textInput3}
            name="textInput3"
            onChange={handleInputChange}
            type="text"
            className='steps'
            required
          />
        </div>
        <div>
          <label htmlFor="Question4">Where is the location of the story?</label>
          <input
            value={textInput4}
            name="textInput4"
            onChange={handleInputChange}
            type="text"
            className='steps'
            required
          />
        </div>
        <div>
          <label htmlFor="Question5">
            What is the inciting action that propells the characters through the
            story?
          </label>
          <input
            value={textInput5}
            name="textInput5"
            onChange={handleInputChange}
            type="text"
            className='steps'
            required
          />
        </div>
        <button type="submit">save</button>
      </form>
      <div>
        <div className="nextstep">
          <button>
            <a
              href="/step3"
              className={currentPage === '/step3' ? 'active' : ''}
            >
              next step
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2;
