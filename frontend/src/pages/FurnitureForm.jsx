import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FurnitureForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [materials, setMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, []);

  useEffect(() => {
    // Charger catégories
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Erreur chargement catégories', err));

    // Charger matériaux
    axios.get('http://localhost:5000/api/materials')
      .then(res => setMaterials(res.data))
      .catch(err => console.error('Erreur chargement matériaux', err));
  }, []);

  const handleMaterialToggle = (id) => {
    if (selectedMaterials.includes(id)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== id));
    } else {
      setSelectedMaterials([...selectedMaterials, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/furniture', {
        name,
        category,
        materials: selectedMaterials,
        keywords: keywords.split(',').map(k => k.trim())
      });

      alert('Meuble ajouté avec succès');
      navigate('/');
    } catch (err) {
      console.error('Erreur création meuble', err);
      alert('Erreur lors de la création');
    }
  };

  return (
    <div>
      <h2>Créer un meuble</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="">-- Sélectionner --</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Matériaux utilisés</label>
          <div className="form-check">
            {materials.map(mat => (
              <div key={mat._id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={mat._id}
                  id={mat._id}
                  onChange={() => handleMaterialToggle(mat._id)}
                  checked={selectedMaterials.includes(mat._id)}
                />
                <label className="form-check-label" htmlFor={mat._id}>
                  {mat.name} ({mat.type})
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Mots-clés (séparés par des virgules)</label>
          <input className="form-control" value={keywords} onChange={e => setKeywords(e.target.value)} />
        </div>

        <button className="btn btn-primary" type="submit">Créer</button>
      </form>
    </div>
  );
}

export default FurnitureForm;
