// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const navItems = [
  { name: "Services", path: "/support" },
  { name: "Technologies", path: "/technologies" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className={`nav ${scrolled || location.pathname !== "/" ? "nav-solid" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Chicago 3D Printworks home">
          <img className="brand-mark" src="/logo-mark.svg" alt="" aria-hidden="true" width="30" height="34" />
          <span className="brand-text">
            Chicago <strong>3D Printworks</strong>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? "active" : "")}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta">
          <Link to="/quote" className="btn btn-primary btn-sm">Instant quote</Link>
          <button
            className={`menu-toggle ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            type="button"
          >
            <span /><span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <nav aria-label="Mobile">
              <NavLink to="/" end>Home</NavLink>
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path}>{item.name}</NavLink>
              ))}
              <NavLink to="/terms">Terms</NavLink>
              <Link to="/quote" className="btn btn-primary">Get an instant quote</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
