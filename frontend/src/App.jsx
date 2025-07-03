import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import FurnitureList from './pages/FurnitureList.jsx';
import MaterialList from './pages/MaterialList.jsx';
import MaterialForm from './pages/MaterialForm.jsx';
import FurnitureForm from './pages/FurnitureForm.jsx';
import Login from './pages/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Menu from './components/Menu.jsx';
import MaterialDetails from './pages/MaterialDetails.jsx';
import FurnitureDetails from './pages/FurnitureDetails';
import MaterialArticle from './pages/MaterialArticle';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="container mt-4">
      <Menu token={token} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<FurnitureList />} />
        <Route path="/materials" element={<MaterialList />} />
        <Route path="/furniture/:id" element={<FurnitureDetails />} />
        <Route path="/articles/:type" element={<MaterialArticle />} />
        
        {/* Pages protégées */}
        <Route
          path="/materials/new"
          element={
            <PrivateRoute token={token}>
              <MaterialForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/furniture/new"
          element={
            <PrivateRoute token={token}>
              <FurnitureForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={(token) => setToken(token)} />}
        />
        <Route path="/materials/:id" element={<MaterialDetails />} />
      </Routes>
    </div>
  );
}

export default App;
