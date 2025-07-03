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
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Erreur chargement catégories', err));

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
    <div className="card p-4 shadow-sm">
      <h2 className="mb-4">Créer un meuble</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom du meuble</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: Armoire design"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <select
            className="form-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="">-- Sélectionner une catégorie --</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Matériaux utilisés</label>
          <div className="row row-cols-1 row-cols-sm-2">
            {materials.map(mat => (
              <div className="form-check mb-2" key={mat._id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={mat._id}
                  checked={selectedMaterials.includes(mat._id)}
                  onChange={() => handleMaterialToggle(mat._id)}
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
          <input
            type="text"
            className="form-control"
            placeholder="ex: bois, moderne, armoire"
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Créer le meuble</button>
      </form>
    </div>
  );
}

export default FurnitureForm;
