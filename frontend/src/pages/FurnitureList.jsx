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
    <div>
      <h2>Liste des meubles</h2>
      <ul className="list-group">
        {furniture.map(item => (
          <li key={item._id} className="list-group-item">
            {item.name} – {item.category?.name}
          </li>
        ))}
      </ul>
      <Link to="/furniture/new" className="btn btn-success mb-3">Ajouter un meuble</Link>
    </div>
  );
}

export default FurnitureList;
