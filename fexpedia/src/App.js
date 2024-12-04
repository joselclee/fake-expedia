// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import FlightBooking from './components/FlightBooking';
import UserProfile from './components/UserProfile';
import AccountLogin from './components/AccountLogin';
import AccountCreation from './components/AccountCreation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/flights" element={<FlightBooking />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<AccountLogin />} />
        <Route path="/register" element={<AccountCreation />} />
      </Routes>
    </Router>
  );
}

export default App;