'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Service, Salon } from '@/types';
import { toast } from 'react-toastify';

const serviceSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  description: z.string().min(1, 'La description est requise'),
  prix: z.number().min(0, 'Le prix doit être positif'),
  duree: z.number().min(1, 'La durée doit être d\'au moins 1 minute'),
  categorie: z.string().min(1, 'La catégorie est requise'),
  salonId: z.string().optional(),
});

interface ServiceFormProps {
  service?: Service;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const categories = [
  'Coupe',
  'Coloration',
  'Soins',
  'Barbe',
  'Coiffure',
  'Permanente',
  'Mèches',
  'Brushing'
];

export const ServiceForm = ({ service, onSubmit, onCancel }: ServiceFormProps) => {
  const [salons, setSalons] = useState<Salon[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: service || {
      nom: '',
      description: '',
      prix: 0,
      duree: 30,
      categorie: '',
      salonId: '',
    },
  });

  const selectedCategorie = watch('categorie');
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
      const formattedData = {
        ...data,
        prix: parseFloat(data.prix),
        duree: parseInt(data.duree),
        salonId: data.salonId || undefined,
      };
      await onSubmit(formattedData);
      toast.success(service ? 'Service mis à jour avec succès' : 'Service créé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {service ? 'Modifier le service' : 'Ajouter un service'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="nom">Nom du service</Label>
            <Input
              id="nom"
              {...register('nom')}
              placeholder="Ex: Coupe homme"
            />
            {errors.nom && (
              <p className="text-sm text-red-500 mt-1">{errors.nom.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Description détaillée du service"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prix">Prix (€)</Label>
              <Input
                id="prix"
                type="number"
                step="0.01"
                min="0"
                {...register('prix', { valueAsNumber: true })}
                placeholder="25.00"
              />
              {errors.prix && (
                <p className="text-sm text-red-500 mt-1">{errors.prix.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="duree">Durée (minutes)</Label>
              <Input
                id="duree"
                type="number"
                min="1"
                {...register('duree', { valueAsNumber: true })}
                placeholder="30"
              />
              {errors.duree && (
                <p className="text-sm text-red-500 mt-1">{errors.duree.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="categorie">Catégorie</Label>
            <Select
              value={selectedCategorie}
              onValueChange={(value: string) => setValue('categorie', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((categorie) => (
                  <SelectItem key={categorie} value={categorie}>
                    {categorie}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categorie && (
              <p className="text-sm text-red-500 mt-1">{errors.categorie.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="salonId">Salon (optionnel)</Label>
            <Select
              value={selectedSalonId}
              onValueChange={(value: string) => setValue('salonId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Service général (tous les salons)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Service général</SelectItem>
                {salons.map((salon) => (
                  <SelectItem key={salon._id} value={salon._id!}>
                    {salon.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">
              Laissez vide pour un service disponible dans tous les salons
            </p>
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