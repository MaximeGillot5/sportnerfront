import React from 'react';
import './App.css'
import Home from './page/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './page/About';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoginForm from "./page/LoginForm"
import UserAccount from './page/UserAccount';
import ForgotPassword from './page/ForgotPassword';
import LostPassword from './page/LostPassword';
import Events from './page/Events';
import EventForm from './page/EventForm';
import Sports from './page/Sports';

const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path='/account' element={<UserAccount />} />
            <Route path='/passwords/reset' element={<ForgotPassword />} />
            <Route path='/passwords/lost' element={<LostPassword />} />
            <Route path='/events' element={<Events />} />
            <Route path='/events/create' element={<EventForm/>} />
            <Route path='/sports' element={<Sports/>} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;