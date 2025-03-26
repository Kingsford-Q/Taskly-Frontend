import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'

import Homepage from './components/Homepage';
import OAuth from './components/OAuth';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Homepage />} />
        <Route path = "/oauth" element = {<OAuth />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/login" element = {<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
