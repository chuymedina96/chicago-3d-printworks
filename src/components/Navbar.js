// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Instant Quote', path: '/quote' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Engineering Support', path: '/support' },
    { name: 'Terms', path: '/terms' },
  ];

  const toggleMenu = () => setIsOpen((o) => !o);

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

          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            type="button"
          >
            <div className={`bar ${isOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          </button>

          <ul className="navbar-links desktop">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={isActive(item.path) ? 'active' : ''}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-content">
              <button className="close-btn" onClick={toggleMenu} aria-label="Close menu" type="button">✕</button>
              <ul>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={isActive(item.path) ? 'active' : ''}
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
