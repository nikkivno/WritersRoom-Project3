import React, { useState } from 'react';
import '../styles/step3.css';

function Step3() {
  const currentPage = window.location.pathname;

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'text1') {
      setText1(value);
    } else if (name === 'text2') {
      setText2(value);
    } else if (name === 'text3') {
      setText3(value);
    } else if (name === 'text4') {
      setText4(value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const promptId = localStorage.getItem('promptId');
    const midpointData = JSON.stringify({
      cope_info: text1,
      incident_consequence: text2,
      internal_struggles: text3,
      conflicts: text4,
    });

    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          midpoint_input: midpointData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Input saved successfully');
      }
    } catch (error) {
      console.log('Error saving input: ', error);
    }
  };

  return (
    <div>
      <div>
        <h1>The Midpoint</h1>
      </div>
      <form id="midpoint" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="q1">
            How does each character cope with the inciting incident?
            (ex.adjectives)
          </label>
          <input
            value={text1}
            name="text1"
            onChange={handleInputChange}
            type="text"
            required
          />
        </div>
        <div>
          <label htmlFor="q2">
            What happens in the story because of the inciting incident?
          </label>
          <input
            value={text2}
            name="text2"
            onChange={handleInputChange}
            type="text"
            required
          />
        </div>
        <div>
          <label htmlFor="q3">
            What is each character struggling with? (ex. personal struggles)
          </label>
          <input
            value={text3}
            name="text3"
            onChange={handleInputChange}
            type="text"
            required
          />
        </div>
        <div>
          <label htmlFor="q4">
            What interpersonal struggles are happening between characters?
          </label>
          <input
            value={text4}
            name="text4"
            onChange={handleInputChange}
            type="text"
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <div>
        <button>
          <a href="/step4" className={currentPage === '/step4' ? 'active' : ''}>
            Next Step
          </a>
        </button>
      </div>
    </div>
  );
}

export default Step3;
