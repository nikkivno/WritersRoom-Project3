import React, {useState} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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
        const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
    
        <BrowserRouter>
        <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/about" component={About} />
          <Route path="/newwork" component={isAuthenticated ? Prompt : Login} />
          <Route path="/step2" component={isAuthenticated ? Step2 : Login} />
          <Route path="/step3" component={isAuthenticated ? Step3 : Login} />
          <Route path="/step4" component={isAuthenticated ? Step4 : Login} />
          <Route path="/writing" component={isAuthenticated ? Writing : Login} />
          <Redirect to="/" />
        </Switch>
        <Footer />
        </div>
        </BrowserRouter>
    );
}

export default App;