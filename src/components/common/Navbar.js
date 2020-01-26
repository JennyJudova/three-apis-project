import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

export default function Navbar() {
  const [burgerOpen, setBurger] = useState(false);

  const toggleNavbar = () => {
    const burgerUpdate = burgerOpen;
    setBurger(!burgerUpdate);
  };

  return (
    <nav className={`${burgerOpen ? 'burgerOpen' : ''}`}>
      <div>
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
      </div>
      <button
        className="burgerMenu"
        onClick={toggleNavbar}
        onKeyDown={toggleNavbar}
        type="button"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </nav>
  );
}
