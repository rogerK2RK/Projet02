import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MaterialForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Bois');
  const [supplier, setSupplier] = useState('');
  const [keywords, setKeywords] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/suppliers')
      .then(res => setSuppliers(res.data))
      .catch(err => console.error('Erreur chargement fournisseurs', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/materials', {
        name,
        type,
        supplier,
        keywords: keywords.split(',').map(k => k.trim())
      });

      alert('Matériau ajouté avec succès');
      navigate('/materials');
    } catch (err) {
      console.error('Erreur lors de la création du matériau', err);
      alert('Erreur création matériau');
    }
  };

  return (
    <div>
      <h2>Ajouter un matériau</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select className="form-select" value={type} onChange={e => setType(e.target.value)} required>
            <option value="Bois">Bois</option>
            <option value="Fer">Fer</option>
            <option value="Plastique">Plastique</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fournisseur</label>
          <select className="form-select" value={supplier} onChange={e => setSupplier(e.target.value)} required>
            <option value="">-- Sélectionner --</option>
            {suppliers.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
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

export default MaterialForm;
