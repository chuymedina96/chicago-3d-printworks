// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Instant Quote', path: '/quote' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Engineering Support', path: '/support' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        <div className="navbar-container">
          <Link to="/" className="logo-text">Chicago 3D Printworks</Link>

          <div className="menu-toggle" onClick={toggleMenu}>
            <div className={`bar ${isOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          </div>

          <ul className="navbar-links desktop">
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Fullscreen mobile nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-content">
              <div className="close-btn" onClick={toggleMenu}>✕</div>
              <ul>
                {navItems.map(item => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={location.pathname === item.path ? 'active' : ''}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
