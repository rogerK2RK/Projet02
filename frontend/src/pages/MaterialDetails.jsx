import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MaterialDetails() {
  const { id } = useParams();
  const [furnitureList, setFurnitureList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/materials/${id}/furniture`)
      .then(res => {
        setFurnitureList(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur :', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="alert alert-info">Chargement des meubles...</div>;

  return (
    <div>
      <h2>Meubles utilisant ce matériau</h2>
      {furnitureList.length === 0 ? (
        <p>Aucun meuble trouvé.</p>
      ) : (
        <ul className="list-group">
          {furnitureList.map(f => (
            <li key={f._id} className="list-group-item">
              <strong>{f.name}</strong><br />
              Catégorie : {f.category?.name || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MaterialDetails;
