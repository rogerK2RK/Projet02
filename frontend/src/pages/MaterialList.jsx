import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/materials')
      .then(res => {
        setMaterials(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des matériaux :', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info">Chargement des matériaux...</div>;

  return (
    <div className="card shadow-sm p-4">
      <h2 className="mb-4">Liste des matières premières</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {materials.map(mat => (
          <div key={mat._id} className="col">
            <div className="card h-100 border border-light-subtle">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/materials/${mat._id}`} className="text-decoration-none">
                    {mat.name}
                  </Link>
                </h5>
                <p className="card-subtitle text-muted mb-2">Type : {mat.type}</p>
                <p className="mb-1">
                  <strong>Fournisseur :</strong> {mat.supplier?.name || 'N/A'}
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {mat.keywords?.map((k, index) => (
                    <span key={index} className="badge bg-secondary">{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaterialList;
