'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User, AuthContextType } from '@/types';
import { toast } from 'react-toastify';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Utilisateurs de test
const testUsers: User[] = [
  {
    _id: '1',
    email: 'admin@moncapbarber.com',
    nom: 'Admin',
    prenom: 'Principal',
    role: 'admin',
    firebaseUid: 'admin-uid',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    email: 'manager@salon1.com',
    nom: 'Manager',
    prenom: 'Salon1',
    role: 'manager',
    salonId: 'salon-1',
    firebaseUid: 'manager-uid',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Simuler la récupération des données utilisateur
        const userData = testUsers.find(u => u.email === firebaseUser.email);
        if (userData) {
          setUser(userData);
        } else {
          // Créer un utilisateur par défaut si non trouvé
          const defaultUser: User = {
            _id: firebaseUser.uid,
            email: firebaseUser.email!,
            nom: 'Utilisateur',
            prenom: 'Test',
            role: 'manager',
            firebaseUid: firebaseUser.uid,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setUser(defaultUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Pour la démo, on accepte n'importe quel mot de passe pour les emails de test
      const testUser = testUsers.find(u => u.email === email);
      if (testUser) {
        // Simuler la connexion Firebase
        setUser(testUser);
        toast.success('Connexion réussie!');
        return;
      }

      // Sinon, utiliser Firebase Auth normalement
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Connexion réussie!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Erreur de connexion. Vérifiez vos identifiants.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Déconnexion réussie!');
    } catch (error: any) {
      toast.error('Erreur lors de la déconnexion: ' + error.message);
      throw error;
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, userData.email!, password);
      
      // Créer l'utilisateur dans notre système
      const newUser: User = {
        ...userData as User,
        firebaseUid: firebaseUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setUser(newUser);
      toast.success('Inscription réussie!');
    } catch (error: any) {
      toast.error('Erreur lors de l\'inscription: ' + error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};