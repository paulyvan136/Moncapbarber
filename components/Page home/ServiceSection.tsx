'use client';
import { useState } from 'react';
import '../../Style.css/ServiceSection.css';

interface LimitedServiceHomme {
  id: number;
  name: string;
  price: number | string;
  description: string;
}

export default function ServiceSection() {
  // Liste de services
  const services: LimitedServiceHomme[] = [
    {
      id: 1,
      name: "Raze simple",
      price: 5000,
      description: "Une coupe de cheveux propre et nette qui consiste à raser uniformément les cheveux pour un style classique et soigné. Idéale pour ceux qui préfèrent un entretien minimal et une apparence fraîche."
    },
    {
      id: 2,
      name: "Dégradé simple",
      price: 5000,
      description: "Un fondu progressif sur les côtés et l’arrière de la tête qui apporte un style moderne et élégant. Adapté à tous types de visages et personnalisable selon vos préférences."
    },
    {
      id: 3,
      name: "Taper fade",
      price: 5000,
      description: "Un style de coupe subtil où les cheveux sont progressivement coupés plus courts vers le cou et les tempes. Apporte une finition nette et contemporaine."
    },
    {
      id: 4,
      name: "Coco taillé",
      price: 5000,
      description: "Une coupe artistique avec des contours précis et une finition sculptée, parfaite pour une coiffure unique qui met en valeur votre personnalité."
    },
  ];

  // État pour le service sélectionné (par défaut, le premier)
  const [selectedService, setSelectedService] = useState<LimitedServiceHomme>(services[0]);

  return (
    <section className='services'>
      <h2 className="text-white text-center h1 fw-bold mb-5">NOS SERVICES</h2>
      <div className='row'>

        {/* Liste des services */}
        <div className='col-md-4'>
          <h3 className='mb-3'></h3>
          <ul className='list-group list-group-flush'>
            {services.map((service) => (
              <li
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`list-group-item ${selectedService.id === service.id ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {service.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Détails du service sélectionné */}
        <div className='col-md-8 d-flex justify-content-center align-items-center'>
          {selectedService ? (
            <div className="row">
              <div className="col-md-4">
                {/* image plus tard */}
                {/* <img src={selectedService.image} alt={selectedService.name} className="img-fluid" /> */}
              </div>
              <div className='text-start col-md-8 mt-5'>
                <h3 className='service-title'>{selectedService.name}</h3>
                <p>{selectedService.description}</p>
                <p className='text-warning'>
                  {typeof selectedService.price === 'number'
                    ? `${selectedService.price} FCFA`
                    : selectedService.price}
                </p>
              </div>
            </div>
          ) : (
            <p>Sélectionnez un service dans la liste.</p>
          )}
        </div>

      </div>
    </section>
  );
}
