import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function FurnitureDetails() {
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/furniture/${id}`)
      .then(res => {
        setFurniture(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="alert alert-info">Chargement...</div>;
  if (!furniture) return <div className="alert alert-warning">Meuble introuvable</div>;

  return (
    <div className="card p-4 shadow-sm">
      <h2>{furniture.name}</h2>
      <p><strong>Catégorie :</strong> {furniture.category?.name || 'N/A'}</p>
      <p><strong>Matériaux utilisés :</strong></p>
      <ul className="list-group">
        {furniture.materials?.map((mat, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {mat.name} ({mat.type})
            <Link to={`/articles/${mat.type.toLowerCase()}`} className="btn btn-sm btn-outline-info">
                Voir l'article
            </Link>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default FurnitureDetails;
