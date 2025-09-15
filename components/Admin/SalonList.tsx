'use client';

import React, { useState } from 'react';
import salonsData, { Salon } from '@/data/salons';

const SalonList = () => {
  const [salons, setSalons] = useState<Salon[]>(salonsData);
  const [newSalon, setNewSalon] = useState<Omit<Salon, 'id' | 'image'>>({
    nom: '',
    adresse: '',
    description: '',
    openingHours: '',
    closingHours: '',
  });

  const handleAddSalon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSalon.nom || !newSalon.adresse || !newSalon.description) return;
    const newEntry: Salon = {
      id: (salons.length + 1).toString(),
      image: '/images/default.jpg', // image par défaut
      ...newSalon,
    };
    setSalons(prev => [...prev, newEntry]);
    setNewSalon({
      nom: '',
      adresse: '',
      description: '',
      openingHours: '',
      closingHours: '',
    });
  };

  const handleDeleteSalon = (id: string) => {
    setSalons(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div>
      {/* Formulaire d'ajout */}
      <form onSubmit={handleAddSalon} className="mb-3">
        <div className="row g-2">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Nom"
                   value={newSalon.nom}
                   onChange={(e) => setNewSalon({ ...newSalon, nom: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Adresse"
                   value={newSalon.adresse}
                   onChange={(e) => setNewSalon({ ...newSalon, adresse: e.target.value })} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Ouverture (ex: 08:00)"
                   value={newSalon.openingHours}
                   onChange={(e) => setNewSalon({ ...newSalon, openingHours: e.target.value })} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Fermeture (ex: 20:00)"
                   value={newSalon.closingHours}
                   onChange={(e) => setNewSalon({ ...newSalon, closingHours: e.target.value })} />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Ajouter</button>
          </div>
        </div>
        <div className="mt-2">
          <input type="text" className="form-control" placeholder="Description"
                 value={newSalon.description}
                 onChange={(e) => setNewSalon({ ...newSalon, description: e.target.value })} />
        </div>
      </form>

      {/* Table des salons */}
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Description</th>
            <th>Horaires</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salons.map(s => (
            <tr key={s.id}>
              <td>
                <img src={s.image} alt={s.nom} style={{ width: '50px', borderRadius: '5px' }} />
              </td>
              <td>{s.nom}</td>
              <td>{s.adresse}</td>
              <td>{s.description}</td>
              <td>{s.openingHours} - {s.closingHours}</td>
              <td>
                <button onClick={() => handleDeleteSalon(s.id)} className="btn btn-danger btn-sm">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalonList;
