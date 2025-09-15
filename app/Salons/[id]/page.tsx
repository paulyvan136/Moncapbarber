"use client"; // Nécessaire car on utilise un hook dans un composant fonctionnel ici

import React from 'react';
import './salon.css';
import TeamSection from '@/components/TeamSection';
import { useParams } from 'next/navigation';
import salons from '@/data/salons';

function Page() {
  const params = useParams();
  const id = params?.id;

  if (!id) {
    return null; // ou un loader <div>Chargement...</div>
  }

  // Trouver le salon correspondant
  const salon = salons.find((s) => s.id === id);

  if (!salon) {
    return <div>Salon non trouvé</div>;
  }

  return (
    <div className='salon-page bg-dark text-white'>

      {/* section hero */}
      <div className="hero d-flex justify-content-center align-items-center ">
        <div className=" ">
          <div className='text-hero ps-5'>
            <h1 className='text-center'>{salon.nom}</h1>
          </div>
        </div>
      </div>

      {/* section about */}
      <div className="about d-flex flex-column justify-content-center align-items-center">
        <h3 className='text-white text-center mb-5 h1 fw-bold'>A PROPOS</h3>
        <p className='text-white text-center w-75'>
          {salon.description}
        </p>
      </div>

      {/* section team et rdv */}
      <TeamSection salonId={id as string} />

    </div>
  );
}

export default Page;
