
export interface Salon {
    id: string;
    nom: string;
    adresse: string;
    image: string;
    description: string;
    openingHours: string; 
    closingHours: string; 
  }
  
  const salons: Salon[] = [
    {
      id: "1",
      nom: "MONCAP BARBER OSCARS",
      adresse: "Abidjan Cocody Angré 8e Tranche",
      image: "/images/hero-home2.jpg",
      description: "Un salon moderne et professionnel pour hommes et femmes.",
      openingHours: "08:00",
      closingHours: "20:00"
    },
    {
      id: "2",
      nom: "MONCAP BARBER YOPOUGON",
      adresse: "Yopougon Sideci Palmeraie",
      image: "/images/hero-home2.jpg",
      description: "Spécialisé en coiffure homme, barbe et soins esthétiques rapides.",
      openingHours: "09:00",
      closingHours: "22:00"
    },
    {
      id: "3",
      nom: "MONCAP BARBER PALMERAIE",
      adresse: "Abidjan Cocody Palmeraie",
      image: "/images/hero-home2.jpg",
      description: "Salon de coiffure haut de gamme avec une équipe professionnelle.",
      openingHours: "07:30",
      closingHours: "19:30"
    },
    
];
  
  export default salons;
  