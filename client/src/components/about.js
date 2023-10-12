import React from 'react';

import '../styles/about.css';

function About() {
    return (
        <div>
            <div className='aboutheader'>
                <h1 className='about'>About</h1>
            </div>
            <div className='aboutlist'>
            <ul>
                <li className='question'>What is writer's room?</li>
                <br></br>
                <li>Writers Room is a step by step tool for emerging writers based around the 3 Act Structure</li>
                <br></br>
                <br></br>
                <li className='question'>What is the '3 Act Structure'?</li>
                <br></br>
                <li>The three act structure for storytelling is a way of plotting out a fictional novel so that the author can be sure to hit all of the main points</li>
                <br></br>
                <br></br>
                <li className='question'>How does Writer's Room guide me through the planning process?</li>
                <br></br>
                <li>Starting with a generated prompt based on some keywords provided by you, Writer's Room will take you through steps to plot out your novel, from events, to character motivations and interpersonal relationships. Once you have some key points written out you will be taken to a space where you can access that information to help you write your novel right on the site.</li>
            </ul>
            </div>
        </div>
    )
}

export default About; 