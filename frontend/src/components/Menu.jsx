import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ token, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Meubles</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/materials">Matériaux</Link>
            </li>

            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/furniture/new"> Ajouter meuble</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/materials/new"> Ajouter matériau</Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex">
            {token ? (
              <button onClick={onLogout} className="btn btn-outline-danger">
                Déconnexion
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline-primary">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
