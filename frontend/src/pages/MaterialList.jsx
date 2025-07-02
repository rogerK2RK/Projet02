import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Liste des matières premières</h2>
      <ul className="list-group">
        {materials.map(mat => (
          <li key={mat._id} className="list-group-item">
            <strong>{mat.name}</strong> – <em>{mat.type}</em><br />
            Fournisseur : {mat.supplier?.name || 'N/A'}<br />
            Mots-clés :
            {mat.keywords?.map((k, index) => (
              <span key={index} className="badge text-bg-secondary mx-1">{k}</span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MaterialList;
