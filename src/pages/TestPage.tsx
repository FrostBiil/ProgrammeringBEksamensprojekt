// src/App.tsx
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TestPage from './pages/TestPage'; // Antager, at du har en TestPage komponent
import Navbar from './components/Navbar';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<TestPage />} /> {/* Tilføj din TestPage Route */}
          {/* Du kan tilføje flere ruter efter behov */}
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
