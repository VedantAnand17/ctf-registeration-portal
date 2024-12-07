"use client"

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import RegistrationForm from '../components/RegisterationForm';
import TeamDetails from '../components/TeamDetails';

function Home() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/team/:teamId" element={<TeamDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default Home;