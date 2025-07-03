import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FurnitureList() {
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/furniture')
      .then(res => setFurniture(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Liste des meubles</h2>
        <Link to="/furniture/new" className="btn btn-success">
           Ajouter un meuble
        </Link>
      </div>

      {furniture.length === 0 ? (
        <div className="alert alert-warning">Aucun meuble enregistré pour le moment.</div>
      ) : (
        <div className="list-group">
          {furniture.map(item => (
            <Link
              key={item._id}
              to={`/furniture/${item._id}`}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{item.name}</h5>
                <small className="text-muted">Catégorie : {item.category?.name || 'Non spécifiée'}</small>
              </div>
              <span className="badge bg-primary">Détails</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default FurnitureList;
