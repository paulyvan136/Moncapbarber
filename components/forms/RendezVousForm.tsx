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
import { Employe, RendezVous, Salon, Service } from '@/types';
import { toast } from 'react-toastify';

const rendezVousSchema = z.object({
  clientNom: z.string().min(1, 'Le nom est requis'),
  clientPrenom: z.string().min(1, 'Le prénom est requis'),
  clientEmail: z.string().email('Email invalide'),
  clientTelephone: z.string().min(1, 'Le téléphone est requis'),
  salonId: z.string().min(1, 'Le salon est requis'),
  employeId: z.string().min(1, 'L\'employé est requis'),
  serviceId: z.string().min(1, 'Le service est requis'),
  dateHeure: z.string().min(1, 'La date et l\'heure sont requises'),
  notes: z.string().optional(),
});

interface RendezVousFormProps {
  rendezVous?: RendezVous;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const RendezVousForm = ({ rendezVous, onSubmit, onCancel }: RendezVousFormProps) => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(rendezVousSchema),
    defaultValues: rendezVous ? {
      ...rendezVous,
      employeId: typeof rendezVous.employeId === "object" ? rendezVous.employeId._id ?? "" : rendezVous.employeId,
      serviceId: typeof rendezVous.serviceId === "object" ? rendezVous.serviceId._id ?? "" : rendezVous.serviceId,
      dateHeure: new Date(rendezVous.dateHeure).toISOString().slice(0, 16),
    } : {
      clientNom: '',
      clientPrenom: '',
      clientEmail: '',
      clientTelephone: '',
      salonId: '',
      employeId: '',
      serviceId: '',
      dateHeure: '',
      notes: '',
    },
  });
  
  const selectedSalonId = watch('salonId');
  const selectedEmployeId = watch('employeId');
  const selectedServiceId = watch('serviceId');

  useEffect(() => {
    fetchSalons();
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedSalonId) {
      fetchEmployes(selectedSalonId);
    }
  }, [selectedSalonId]);

  const fetchSalons = async () => {
    try {
      const response = await fetch('/api/salons');
      const data = await response.json();
      setSalons(data);
    } catch (error) {
      console.error('Error fetching salons:', error);
    }
  };

  const fetchEmployes = async (salonId: string) => {
    try {
      const response = await fetch(`/api/employes?salonId=${salonId}`);
      const data = await response.json();
      setEmployes(data);
    } catch (error) {
      console.error('Error fetching employes:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/rendezvous', {
        method: rendezVous ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          rendezVous
            ? { ...data, id: rendezVous._id } // pour le PUT, il faut passer l'ID
            : data
        ),
      });
  
      const result = await response.json();
  
      if (!response.ok) throw new Error(result.message || "Erreur inconnue");
  
      toast.success(rendezVous ? 'Rendez-vous mis à jour avec succès' : 'Rendez-vous créé avec succès');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erreur lors de la sauvegarde');
    }
  };
  

  const handleSalonChange = (salonId: string) => {
    setValue('salonId', salonId);
    setValue('employeId', ''); // Reset employee selection
    fetchEmployes(salonId);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {rendezVous ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations client</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientNom">Nom</Label>
                <Input
                  id="clientNom"
                  {...register('clientNom')}
                  placeholder="Nom du client"
                />
                {errors.clientNom && (
                  <p className="text-sm text-red-500 mt-1">{errors.clientNom.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="clientPrenom">Prénom</Label>
                <Input
                  id="clientPrenom"
                  {...register('clientPrenom')}
                  placeholder="Prénom du client"
                />
                {errors.clientPrenom && (
                  <p className="text-sm text-red-500 mt-1">{errors.clientPrenom.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientEmail">Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  {...register('clientEmail')}
                  placeholder="email@exemple.com"
                />
                {errors.clientEmail && (
                  <p className="text-sm text-red-500 mt-1">{errors.clientEmail.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="clientTelephone">Téléphone</Label>
                <Input
                  id="clientTelephone"
                  {...register('clientTelephone')}
                  placeholder="Numéro de téléphone"
                />
                {errors.clientTelephone && (
                  <p className="text-sm text-red-500 mt-1">{errors.clientTelephone.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Détails du rendez-vous</h3>

            <div>
              <Label htmlFor="salonId">Salon</Label>
              <Select
                value={selectedSalonId}
                onValueChange={handleSalonChange}
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

            <div>
              <Label htmlFor="employeId">Employé</Label>
              <Select
                value={selectedEmployeId}
                onValueChange={(value: string) => setValue('employeId', value)}
                disabled={!selectedSalonId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un employé" />
                </SelectTrigger>
                <SelectContent>
                  {employes.map((employe) => (
                    <SelectItem key={employe._id} value={employe._id!}>
                      {employe.nom} {employe.prenom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.employeId && (
                <p className="text-sm text-red-500 mt-1">{errors.employeId.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="serviceId">Service</Label>
              <Select
                value={selectedServiceId}
                onValueChange={(value: string) => setValue('serviceId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service._id} value={service._id!}>
                      {service.nom} - {service.prix}€ ({service.duree}min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceId && (
                <p className="text-sm text-red-500 mt-1">{errors.serviceId.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="dateHeure">Date et heure</Label>
              <Input
                id="dateHeure"
                type="datetime-local"
                {...register('dateHeure')}
              />
              {errors.dateHeure && (
                <p className="text-sm text-red-500 mt-1">{errors.dateHeure.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Notes ou demandes spéciales"
                rows={3}
              />
            </div>
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