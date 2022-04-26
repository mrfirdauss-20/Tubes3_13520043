import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper cyan darken-1 px1">
      <NavLink to="/" className="brand-logo">
        DNAcheck
      </NavLink>
      <ul className="right hide-on-med-and-down">
        <li cy-data="home-nav-link">
          <NavLink to="/test">Disease Test</NavLink>
        </li>
        <li>
          <NavLink to="/addpenyakit">Add New Disease</NavLink>
        </li>
        <li>
          <NavLink to="/history">History</NavLink>
        </li>
      </ul>
    </div>
  </nav>
)
