import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import About from './components/about';
import Login from './components/login';
import Prompt from './components/prompt';
import Step2 from './components/step2';
import Step3 from './components/step3';
import Step4 from './components/step4';
import Writing from './components/writing';
import Ongoingwork from './components/ongoingwork';
import Main from './components/main';
import AuthService from './utils/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get JWT from local storage
    const token = AuthService.getToken();

    // Token validation logic
    async function validateToken() {
      try {
        const response = await fetch('/api/validate', {
          headers: {
            'x-access-token': token,
          },
        });

        if (response.ok && AuthService.loggedIn()) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error validating token:', error);
      }
    }

    if (token) {
      validateToken();
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/newwork"
            element={isAuthenticated ? <Prompt /> : <Login />}
          />
          <Route
            path="/step2"
            element={isAuthenticated ? <Step2 /> : <Login />}
          />
          <Route
            path="/step3"
            element={isAuthenticated ? <Step3 /> : <Login />}
          />
          <Route
            path="/step4"
            element={isAuthenticated ? <Step4 /> : <Login />}
          />
          {/* Add the route for the Writing page with novelId parameter */}
          <Route
            path="/writing/"
            element={isAuthenticated ? <Writing /> : <Login />}
          />
          <Route
            path="/writing/:novelId"
            element={isAuthenticated ? <Writing /> : <Login />}
          />
          <Route
            path="/ongoingwork"
            element={isAuthenticated ? <Ongoingwork /> : <Login />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
