'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Employe, Salon } from '@/types';
import { toast } from 'react-toastify';

const employeSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  prenom: z.string().min(1, 'Le prénom est requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(1, 'Le téléphone est requis'),
  salonId: z.string().min(1, 'Le salon est requis'),
});

interface EmployeFormProps {
  employe?: Employe;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const jours = [
  { key: 'lundi', label: 'Lundi' },
  { key: 'mardi', label: 'Mardi' },
  { key: 'mercredi', label: 'Mercredi' },
  { key: 'jeudi', label: 'Jeudi' },
  { key: 'vendredi', label: 'Vendredi' },
  { key: 'samedi', label: 'Samedi' },
  { key: 'dimanche', label: 'Dimanche' },
];

const specialitesOptions = [
  'Coupe homme',
  'Coupe femme',
  'Barbe',
  'Coloration',
  'Permanente',
  'Brushing',
  'Soins capillaires',
  'Coiffure mariage'
];

export const EmployeForm = ({ employe, onSubmit, onCancel }: EmployeFormProps) => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [joursDisponibles, setJoursDisponibles] = useState<string[]>(
    employe?.joursDisponibles || []
  );
  const [heuresDisponibles, setHeuresDisponibles] = useState(
    employe?.heuresDisponibles || {
      lundi: { debut: '09:00', fin: '18:00' },
      mardi: { debut: '09:00', fin: '18:00' },
      mercredi: { debut: '09:00', fin: '18:00' },
      jeudi: { debut: '09:00', fin: '18:00' },
      vendredi: { debut: '09:00', fin: '18:00' },
      samedi: { debut: '09:00', fin: '17:00' },
      dimanche: { debut: '10:00', fin: '16:00' },
    }
  );
  const [specialites, setSpecialites] = useState<string[]>(
    employe?.specialites || []
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(employeSchema),
    defaultValues: employe || {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      salonId: '',
    },
  });

  const selectedSalonId = watch('salonId');

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      const response = await fetch('/api/salons');
      const data = await response.json();
      setSalons(data);
    } catch (error) {
      console.error('Error fetching salons:', error);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit({
        ...data,
        joursDisponibles,
        heuresDisponibles,
        specialites,
      });
      toast.success(employe ? 'Employé mis à jour avec succès' : 'Employé créé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleJourChange = (jour: string, checked: boolean) => {
    if (checked) {
      setJoursDisponibles([...joursDisponibles, jour]);
    } else {
      setJoursDisponibles(joursDisponibles.filter(j => j !== jour));
    }
  };

  const handleSpecialiteChange = (specialite: string, checked: boolean) => {
    if (checked) {
      setSpecialites([...specialites, specialite]);
    } else {
      setSpecialites(specialites.filter(s => s !== specialite));
    }
  };

  const updateHeuresDisponibles = (jour: string, field: 'debut' | 'fin', value: string) => {
    setHeuresDisponibles(prev => ({
      ...prev,
      [jour]: {
        ...prev[jour],
        [field]: value
      }
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {employe ? 'Modifier l\'employé' : 'Ajouter un employé'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                {...register('nom')}
                placeholder="Nom de famille"
              />
              {errors.nom && (
                <p className="text-sm text-red-500 mt-1">{errors.nom.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                {...register('prenom')}
                placeholder="Prénom"
              />
              {errors.prenom && (
                <p className="text-sm text-red-500 mt-1">{errors.prenom.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="email@exemple.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                {...register('telephone')}
                placeholder="Numéro de téléphone"
              />
              {errors.telephone && (
                <p className="text-sm text-red-500 mt-1">{errors.telephone.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="salonId">Salon</Label>
            <Select
              value={selectedSalonId ?? ''}
              onValueChange={(value: string) => setValue('salonId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un salon" />
              </SelectTrigger>
              <SelectContent>
                {salons.map((salon) => (
                  <SelectItem key={salon._id} value={salon._id!}>
                    {salon.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.salonId && (
              <p className="text-sm text-red-500 mt-1">{errors.salonId.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Spécialités</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specialitesOptions.map((specialite) => (
                <div key={specialite} className="flex items-center space-x-2">
                  <Checkbox
                    id={specialite}
                    checked={specialites.includes(specialite)}
                    onCheckedChange={(checked: boolean) =>
                      handleSpecialiteChange(specialite, checked as boolean)
                    }
                  />
                  <Label htmlFor={specialite} className="text-sm">
                    {specialite}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Jours disponibles</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {jours.map((jour) => (
                <div key={jour.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={jour.key}
                    checked={joursDisponibles.includes(jour.key)}
                    onCheckedChange={(checked: boolean) =>
                      handleJourChange(jour.key, checked as boolean)
                    }
                  />
                  <Label htmlFor={jour.key} className="text-sm">
                    {jour.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Heures disponibles</h3>
            {jours.map((jour) => (
              <div key={jour.key} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-24">
                  <Label>{jour.label}</Label>
                </div>
                {joursDisponibles.includes(jour.key) ? (
                  <div className="flex space-x-2">
                    <Input
                      type="time"
                      value={heuresDisponibles[jour.key]?.debut || '09:00'}
                      onChange={(e) =>
                        updateHeuresDisponibles(jour.key, 'debut', e.target.value)
                      }
                      className="w-32"
                    />
                    <span className="self-center">à</span>
                    <Input
                      type="time"
                      value={heuresDisponibles[jour.key]?.fin || '18:00'}
                      onChange={(e) =>
                        updateHeuresDisponibles(jour.key, 'fin', e.target.value)
                      }
                      className="w-32"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400">Non disponible</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};