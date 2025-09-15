'use client'
import React, { useState } from 'react';
import salons from '../data/salons';
import teamMember, { Member } from '../data/team';
import ModalRDV from '../components/Page home/ModalRDV';
import '../Style.css/TeamSection.css';

interface TeamSectionProps {
  salonId: string;
}

function TeamSection({ salonId }: TeamSectionProps) {
  const [selectedCoiffeur, setSelectedCoiffeur] = useState<Member | null>(null);

  const salon = salons.find((s) => s.id === salonId);
  if (!salon) return <div>Salon non trouvé</div>;

  const coiffeurs = teamMember.filter((Member) => Member.salonId === salon.id);

  const handleRDVClick = (coiffeur: Member) => {
    setSelectedCoiffeur(coiffeur);
  };

  return (
    <div className='team-section'>
      <h2 className='text-white text-center h1 fw-bold'>NOTRE TEAM</h2>

      <div className="row">
        <h3 className='text text-warning'>{salon.nom}</h3>
        {coiffeurs.map((Member) => (
          <div className="col-md-3 mb-4" key={Member.id}>
            <div className="Member-card">
              <img src={Member.image} className="card-img" alt={Member.nom} />
              <div className="overlay d-flex flex-column justify-content-center align-items-center">
                <h5 className="text-white">{Member.nom}</h5>
                <button
                  className="btn btn-warning mt-2"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => handleRDVClick(Member)}
                >
                  Prendre Rendez-vous
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCoiffeur && <ModalRDV coiffeur={selectedCoiffeur} />}
    </div>
  );
}

export default TeamSection;
