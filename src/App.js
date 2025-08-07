// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quote from './pages/Quote';
import Technologies from './pages/Technologies';
import Support from './pages/Support';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
}
