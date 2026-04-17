import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          L'AURA
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <a href="/#collections" className="nav-link">Collections</a>
          <a href="/#about" className="nav-link">About</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
