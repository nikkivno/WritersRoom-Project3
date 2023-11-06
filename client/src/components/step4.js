import React, { useState, useEffect } from 'react';
import '../styles/step4.css';

function Step4() {
  const currentPage = window.location.pathname;

  const [textarea1, setTextArea1] = useState('');
  const [textarea2, setTextArea2] = useState('');
  const [textarea3, setTextArea3] = useState('');

  //   load working prompt to display
  useEffect(() => {
    async function fetchData() {
      const promptEl = document.getElementById('prompt');
      const promptId = localStorage.getItem('promptId');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'textarea1') {
      setTextArea1(value);
    } else if (name === 'textarea2') {
      setTextArea2(value);
    } else if (name === 'textarea3') {
      setTextArea3(value);
    }
  };

  const [savedMessage, setSavedMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const promptId = localStorage.getItem('promptId');
    const endingData = JSON.stringify({
      before_climax: textarea1,
      climax: textarea2,
      fallout: textarea3,
    });

    // add ending input to prompt db
    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ending_input: endingData,
        }),
      });

      if (response.ok) {
        setSavedMessage('Answers saved!');
        
        setTimeout (()=> {
          setSavedMessage('');
          window.location.href = '/step3';
        }, 2000);
      }
    } catch (error) {
      console.log('Error saving input: ', error);
    }
  };

  return (
    <div>
      <div className="step4Title">
        <h1>The climactic ending</h1>
      </div>
      <div className="promptarea">
        <p id="prompt"></p>
      </div>
      <form id="conclusion" onSubmit={handleFormSubmit}>
        <div>
          <label>What plot moments lead up to the climax?</label>
          <textarea
            value={textarea1}
            name="textarea1"
            onChange={handleInputChange}
            type="text"
            className='steps'
            required
          />
        </div>
        <div>
          <label>What is the pinnacle of the story? (ex. The climax)</label>
          <textarea
            value={textarea2}
            name="textarea2"
            onChange={handleInputChange}
            type="text"
            className='steps'
            required
          />
        </div>
        <div>
          <label>
            What is the fallout from the events of the story? (ex. what happens
            to characters, town, etc)
          </label>
          <textarea
            value={textarea3}
            name="textarea3"
            onChange={handleInputChange}
            type="text"
            className='steps'
            required
          />
        </div>
        {savedMessage && <div className='savedMessage'>{savedMessage}</div>}
        <button className='next' type="submit">Get Writing!</button>
      </form>

    </div>
  );
}

export default Step4;
