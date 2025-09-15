import Link from 'next/link'
import React from 'react'

function navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <Link className="nav-link active text-dark" aria-current="page" href="/">Acceuil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/About">A propos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/Services">Services</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Salons
              </a>
              <ul className="dropdown-menu">
                <li><Link href="/Salons/salon-a" className="dropdown-item">Salon A</Link></li>
                <li><Link href="/Salons/salon-b" className="dropdown-item">Salon B</Link></li>
                <li><Link href="/Salons/salon-c" className="dropdown-item">Salon C</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/Price">Prix</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/Contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default navbar