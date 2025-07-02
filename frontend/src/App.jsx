import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import FurnitureList from './pages/FurnitureList.jsx';
import MaterialList from './pages/MaterialList.jsx';
import MaterialForm from './pages/MaterialForm';
import FurnitureForm from './pages/FurnitureForm';
import Login from './pages/Login';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="container mt-4">
      <h1>Gestion de Meubles</h1>
      {token ? (
        <button className="btn btn-danger" onClick={() => {
          localStorage.removeItem('token');
          setToken(null);
        }}>
          Déconnexion
        </button>
      ) : (
        <Link to="/login" className="btn btn-outline-primary ms-2">Connexion</Link>
      )}
      <Routes>
        <Route path="/" element={<FurnitureList />} />
        <Route path="/materials" element={<MaterialList />} />
        <Route path="/materials/new" element={<MaterialForm />} />
        <Route path="/furniture/new" element={<FurnitureForm />} />
        <Route path="/login" element={<Login onLogin={(token) => setToken(token)} />} />
      </Routes>
    </div>
  );
}

export default App;
