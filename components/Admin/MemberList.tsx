import React, { useState } from 'react';
import teamMember, { Member } from '@/data/team';
import salons from '@/data/salons'; // ajuste le chemin selon ton projet

const joursOptions = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const heuresOptions = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const MemberList: React.FC = () => {
    
  const [employes, setEmployes] = useState<Member[]>(teamMember);
  const [formData, setFormData] = useState<Member>({
    id: employes.length + 1,
    salonId: '',
    nom: '',
    image: '',
    joursDisponibles: [],
    heuresDisponibles: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'joursDisponibles' | 'heuresDisponibles') => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const updated = checked
        ? [...prev[field], value]
        : prev[field].filter(v => v !== value);
      return { ...prev, [field]: updated };
    });
  };

  const handleAddEmploye = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmploye = { ...formData, id: employes.length + 1 };
    setEmployes(prev => [...prev, newEmploye]);

    // Reset formulaire
    setFormData({
      id: employes.length + 2,
      salonId: '',
      nom: '',
      image: '',
      joursDisponibles: [],
      heuresDisponibles: [],
    });
  };

  const handleDelete = (id: number) => {
    setEmployes(prev => prev.filter(emp => emp.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Liste des Employés</h2>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleAddEmploye} className="mb-4 p-3 bg-light text-dark rounded shadow-sm">
        <h5>Ajouter un Employé</h5>
        <div className="row">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              name="nom"
              className="form-control"
              placeholder="Nom de l'employé"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-2">
            <select
              name="salonId"
              className="form-select"
              value={formData.salonId}
              onChange={handleChange}
              required
            >
              <option value="">Choisir un salon</option>
              {salons.map(salon => (
                <option key={salon.id} value={salon.id}>{salon.nom}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-2">
            <input
              type="text"
              name="image"
              className="form-control"
              placeholder="URL de l'image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Checkbox jours disponibles */}
        <div className="mb-2">
          <label><strong>Jours Disponibles:</strong></label>
          <div className="d-flex flex-wrap">
            {joursOptions.map(jour => (
              <div key={jour} className="form-check me-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`jour-${jour}`}
                  value={jour}
                  checked={formData.joursDisponibles.includes(jour)}
                  onChange={(e) => handleCheckboxChange(e, 'joursDisponibles')}
                />
                <label className="form-check-label" htmlFor={`jour-${jour}`}>{jour}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Checkbox heures disponibles */}
        <div className="mb-2">
          <label><strong>Heures Disponibles:</strong></label>
          <div className="d-flex flex-wrap">
            {heuresOptions.map(heure => (
              <div key={heure} className="form-check me-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`heure-${heure}`}
                  value={heure}
                  checked={formData.heuresDisponibles.includes(heure)}
                  onChange={(e) => handleCheckboxChange(e, 'heuresDisponibles')}
                />
                <label className="form-check-label" htmlFor={`heure-${heure}`}>{heure}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2">Ajouter</button>
      </form>

      {/* Liste des employés */}
      <div className="row">
        {employes.map((employe: Member) => (
          <div key={employe.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <img
                src={employe.image}
                className="card-img-top"
                alt={employe.nom}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{employe.nom}</h5>
                <p className="card-text"><strong>Salon ID:</strong> {employe.salonId}</p>
                <p className="card-text"><strong>Jours Disponibles:</strong> {employe.joursDisponibles.join(', ')}</p>
                <p className="card-text"><strong>Heures Disponibles:</strong> {employe.heuresDisponibles.join(', ')}</p>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employe.id)}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
