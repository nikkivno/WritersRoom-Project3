import React, { useEffect } from 'react';
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

  return (
    <div>
      <div>
        <h1>The Catylist</h1>
        <p id="prompt"></p>
      </div>
      <div>
        <button>
          <a href="/step3" className={currentPage === '/step3' ? 'active' : ''}>
            Next Step
          </a>
        </button>
      </div>
    </div>
  );
}

export default Step2;
