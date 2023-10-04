import React from 'react';

import Navbar from './components/navbar';
import Footer from './components/footer';
import About from './components/about';
import Login from './components/login';
import Prompt from './components/prompt';

function App() {
    let Component
    switch (window.location.pathname) {
        case "/":
            Component = Login
            break
                case "/about":
                    Component = About
                    break   
                        case "/newWork":
                            Component = Prompt
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