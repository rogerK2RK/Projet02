import React from 'react';
import { useParams } from 'react-router-dom';

const fakeArticles = {
  bois: {
    title: 'Tout savoir sur le bois',
    content: 'Le bois est un matériau naturel, solide et esthétique, parfait pour la fabrication de meubles artisanaux.',
  },
  fer: {
    title: 'Les secrets du fer',
    content: 'Le fer est souvent utilisé pour sa solidité. Il est parfait pour les structures durables et modernes.',
  },
  plastique: {
    title: 'Utilisation du plastique',
    content: 'Le plastique est léger, économique et utilisé dans de nombreux meubles modernes.',
  }
};

function MaterialArticle() {
  const { type } = useParams();
  const article = fakeArticles[type.toLowerCase()];

  if (!article) return <div className="alert alert-warning">Aucun article pour ce matériau</div>;

  return (
    <div className="card p-4 shadow-sm">
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
}

export default MaterialArticle;
