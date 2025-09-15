'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Salon } from '@/types';
import { toast } from 'react-toastify';

const salonSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  adresse: z.string().min(1, 'L\'adresse est requise'),
  telephone: z.string().min(1, 'Le téléphone est requis'),
  email: z.string().email('Email invalide'),
  managerId: z.string().min(1, 'Le manager est requis'),
});

interface SalonFormProps {
  salon?: Salon;
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

export const SalonForm = ({ salon, onSubmit, onCancel }: SalonFormProps) => {
  const [heuresOuverture, setHeuresOuverture] = useState(
    salon?.heuresOuverture || {
      lundi: { ouvert: true, heureDebut: '09:00', heureFin: '18:00' },
      mardi: { ouvert: true, heureDebut: '09:00', heureFin: '18:00' },
      mercredi: { ouvert: true, heureDebut: '09:00', heureFin: '18:00' },
      jeudi: { ouvert: true, heureDebut: '09:00', heureFin: '18:00' },
      vendredi: { ouvert: true, heureDebut: '09:00', heureFin: '18:00' },
      samedi: { ouvert: true, heureDebut: '09:00', heureFin: '17:00' },
      dimanche: { ouvert: false, heureDebut: '09:00', heureFin: '17:00' },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(salonSchema),
    defaultValues: salon || {
      nom: '',
      adresse: '',
      telephone: '',
      email: '',
      managerId: '',
    },
  });

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit({ ...data, heuresOuverture });
      toast.success(salon ? 'Salon mis à jour avec succès' : 'Salon créé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const updateHeuresOuverture = (jour: string, field: string, value: any) => {
    setHeuresOuverture(prev => ({
      ...prev,
      [jour]: {
        ...prev[jour],
        [field]: value
      }
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {salon ? 'Modifier le salon' : 'Ajouter un salon'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">Nom du salon</Label>
              <Input
                id="nom"
                {...register('nom')}
                placeholder="Nom du salon"
              />
              {errors.nom && (
                <p className="text-sm text-red-500 mt-1">{errors.nom.message}</p>
              )}
            </div>

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
          </div>

          <div>
            <Label htmlFor="adresse">Adresse</Label>
            <Textarea
              id="adresse"
              {...register('adresse')}
              placeholder="Adresse complète"
              rows={3}
            />
            {errors.adresse && (
              <p className="text-sm text-red-500 mt-1">{errors.adresse.message}</p>
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

          <div>
            <Label htmlFor="managerId">Manager</Label>
            <Input
              id="managerId"
              {...register('managerId')}
              placeholder="ID du manager"
            />
            {errors.managerId && (
              <p className="text-sm text-red-500 mt-1">{errors.managerId.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Heures d'ouverture</h3>
            {jours.map((jour) => (
              <div key={jour.key} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-24">
                  <Label>{jour.label}</Label>
                </div>
                <Switch
                  checked={heuresOuverture[jour.key]?.ouvert}
                  onCheckedChange={(checked) => 
                    updateHeuresOuverture(jour.key, 'ouvert', checked)
                  }
                />
                {heuresOuverture[jour.key]?.ouvert && (
                  <div className="flex space-x-2">
                    <Input
                      type="time"
                      value={heuresOuverture[jour.key]?.heureDebut}
                      onChange={(e) => 
                        updateHeuresOuverture(jour.key, 'heureDebut', e.target.value)
                      }
                      className="w-32"
                    />
                    <span className="self-center">à</span>
                    <Input
                      type="time"
                      value={heuresOuverture[jour.key]?.heureFin}
                      onChange={(e) => 
                        updateHeuresOuverture(jour.key, 'heureFin', e.target.value)
                      }
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
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