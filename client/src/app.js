import React from 'react';

import Navbar from './components/navbar';
import Footer from './components/footer';
import About from './components/about';
import Login from './components/login';
import Prompt from './components/prompt';
import Step2 from './components/step2.js';
import Step3 from './components/step3';
import Step4 from './components/step4';
import Writing from './components/writing';

function App() {
    let Component
    switch (window.location.pathname) {
        // navbar
        case "/":
            Component = Login
            break
            case "/about":
            Component = About
            break  
            case "/newwork":
            Component = Prompt
            break 
            // in component transition to next steps in New Work process  
            case "/step2":
            Component = Step2
            break
            case '/step3':
            Component = Step3
            break
            case '/step4':
            Component = Step4
            break
            case '/writing':
            Component = Writing
            break
    }
    
    return (
    <div>
        <Navbar />
        <Component />
        <Footer />
    </div>
    );
}

export default App;