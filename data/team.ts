export interface Member {
    id: number;
    salonId: string; // lien vers le salon
    nom: string;
    image: string;
    joursDisponibles: string[];
    heuresDisponibles: string[];
}

const teamMember: Member[] = [
    {
        id: 1,
        salonId: "1",
        nom: "Personne 1",
        image: "../images/hero-home.png",
        joursDisponibles: ["lundi", "mardi", "mercredi"],
        heuresDisponibles: ["09:00", "10:00", "11:00"]
    },
    {
        id: 2,
        salonId: "1",
        nom: "Personne 2",
        image: "../images/hero-home.png",
        joursDisponibles: ["jeudi", "vendredi"],
        heuresDisponibles: ["14:00", "15:00", "16:00"]
    },
    {
        id: 3,
        salonId: "2",
        nom: "Personne 3",
        image: "../images/hero-home.png",
        joursDisponibles: ["lundi", "mercredi", "vendredi"],
        heuresDisponibles: ["09:00", "13:00", "16:00"]
    },
    {
        id: 4,
        salonId: "2",
        nom: "Personne 4",
        image: "../images/hero-home.png",
        joursDisponibles: ["mardi", "jeudi"],
        heuresDisponibles: ["10:00", "12:00", "14:00"]
    },
    {
        id: 5,
        salonId: "3",
        nom: "Personne 5",
        image: "../images/hero-home.png",
        joursDisponibles: ["lundi", "mercredi", "vendredi"],
        heuresDisponibles: ["08:00", "11:00", "15:00"]
    },
    {
        id: 6,
        salonId: "3",
        nom: "Personne 6",
        image: "../images/hero-home.png",
        joursDisponibles: ["mardi", "jeudi"],
        heuresDisponibles: ["09:00", "13:00", "17:00"]
    },               
    {
        id: 7,
        salonId: "1",
        nom: "Personne 7",
        image: "../images/hero-home.png",
        joursDisponibles: ["lundi", "mardi", "mercredi"],
        heuresDisponibles: ["09:00", "10:00", "11:00"]
    },
    {
        id: 8,
        salonId: "2",
        nom: "Personne 8",
        image: "../images/hero-home.png",
        joursDisponibles: ["jeudi", "vendredi"],
        heuresDisponibles: ["14:00", "15:00", "16:00"]
    },
    {
        id: 9,
        salonId: "3",
        nom: "Personne 9",
        image: "../images/hero-home.png",
        joursDisponibles: ["lundi", "mercredi", "vendredi"],
        heuresDisponibles: ["09:00", "13:00", "16:00"]
    },
    {
        id: 10,
        salonId: "1",
        nom: "Personne 10",
        image: "../images/hero-home.png",
        joursDisponibles: ["mardi", "jeudi"],
        heuresDisponibles: ["10:00", "12:00", "14:00"]
    },
    {
        id: 11,
        salonId: "2",
        nom: "Personne 11",
        image: "../images/hero-home.png",
        joursDisponibles: ["lundi", "mercredi", "vendredi"],
        heuresDisponibles: ["08:00", "11:00", "15:00"]
    },
    {
        id: 12,
        salonId: "3",
        nom: "Personne 12",
        image: "../images/hero-home.png",
        joursDisponibles: ["mardi", "jeudi"],
        heuresDisponibles: ["09:00", "13:00", "17:00"]
    }
];

export default teamMember;
