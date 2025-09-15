export interface Salon {
    _id?: string;
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    managerId: string;
    heuresOuverture: {
      [key: string]: {
        ouvert: boolean;
        heureDebut: string;
        heureFin: string;
      };
    };
    services: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  
  
  export interface Service {
    _id?: string;
    nom: string;
    description: string;
    prix: number;
    duree: number; // en minutes
    categorie: string;
    salonId?: string; // Si spécifique à un salon
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface RendezVous {
    _id?: string;
    clientNom: string;
    clientPrenom: string;
    clientEmail: string;
    clientTelephone: string;
    salonId: string;
    employeId: {
      _id?: string;
      nom: string;
      prenom: string;
      email: string;
    };
    serviceId: {
      _id?: string;
      nom: string;
      prix: number;
      duree: number;
    };
    dateHeure: Date;
    statut: 'confirme' | 'en_attente' | 'annule' | 'termine';
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
 
  
  export interface Disponibilite {
    debut: string;
    fin: string;
  }
  
  export interface HeuresDisponibles {
    [jour: string]: Disponibilite;
  }
  
  export interface Employe {
    _id?: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    salonId: string;
    nomBoutique?: string;
    joursDisponibles: string[];
    heuresDisponibles: HeuresDisponibles;
    specialites: string[];
    typeUser?: "employe";
  }
  
  export interface User {
    _id?: string;
    email: string;
    nom: string;
    prenom: string;
    role: 'admin' | 'manager';
    salonId?: string; // Pour les managers
    firebaseUid: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData: Partial<User>, password: string) => Promise<void>;
  }
  
  export interface DashboardStats {
    totalSalons?: number;
    totalEmployes: number;
    totalRendezVous: number;
    totalServices: number;
    rendezVousAujourdhui: number;
    chiffreAffaires?: number;
  }