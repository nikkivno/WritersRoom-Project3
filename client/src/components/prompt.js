// used for the first steps of new work. UI for the prompt generator

import React, { useState } from 'react';
import '../styles/prompt.css';
import decode from 'jwt-decode';

function Prompt() {
  const currentPage = window.location.pathname;

  const [textarea, setTextarea] = useState('');

  const handleInputchange = (e) => {
    const { name, value } = e.target;

    if (name === 'textarea') {
      setTextarea(value);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const promptEl = document.getElementById('generatedPrompt');

    try {
      const response = await fetch('/api/prompts/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords: textarea }),
      });

      const data = await response.json();

      console.log(data);
      promptEl.innerHTML = data;
    } catch (error) {
      console.log('Error requesting a prompt: ', error);
    }
  };
  const handleNextStep = async (e) => {
    e.preventDefault();
    const promptEl = document.getElementById('generatedPrompt');
    const token = localStorage.getItem('jwt');
    const userEmail = decode(token).email;

    localStorage.setItem('promptText', promptEl.innerHTML);

    try {
      const promptResponse = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptEl.innerHTML,
          email: userEmail,
        }),
      });

      const newPrompt = await promptResponse.json();

      if (promptResponse.ok) {
        localStorage.setItem('promptId', newPrompt.id);
        document.location.href = '/step2';
      }
    } catch (error) {
      console.log('Error adding prompt to the database: ', error);
    }
  };

  return (
    <div>
      <div className="step1">
        <h1>prompt</h1>
        <p>
          In the area below, put in key words related to the kind of novel you'd
          like to write (ex. genres, setting, time periods)
        </p>
      </div>
      <form id="promptform" onSubmit={handleFormSubmit}>
        <textarea
          value={textarea}
          name="textarea"
          onChange={handleInputchange}
          type="textarea"
          placeholder=""
          required
        />
        <button>prompt Me</button>
      </form>
      <div className='newprompt'>
        <p id="generatedPrompt"></p>
      </div>
      <div>
        <button onClick={handleNextStep}>
          <a href="/step2" className={currentPage === '/step2' ? 'active' : ''}>
            next step
          </a>
        </button>
      </div>
    </div>
  );
}

export default Prompt;
