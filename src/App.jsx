import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import './App.css'

const googleClientId = "139569476737-7e7vsooh7hh29dusm8ek03lf2d6kbg0d.apps.googleusercontent.com";


import Homepage from './components/Homepage';
import OAuth from './components/OAuth';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Homepage />} />
        <Route path = "/oauth" element = {<OAuth />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/login" element = {<Login />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
    
  )
}

export default App
