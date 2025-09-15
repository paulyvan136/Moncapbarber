"use client";

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SalonForm } from '@/components/forms/SalonForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { Salon } from '@/types';
import { toast } from 'react-toastify';

export default function SalonsPage() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSalon, setEditingSalon] = useState<Salon | undefined>();

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/salons');
      const data = await response.json();
      setSalons(data);
    } catch (error) {
      console.error('Error fetching salons:', error);
      toast.error('Erreur lors du chargement des salons');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const url = editingSalon ? `/api/salons/${editingSalon._id}` : '/api/salons';
      const method = editingSalon ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save salon');
      }

      await fetchSalons();
      setShowForm(false);
      setEditingSalon(undefined);
      toast.success(editingSalon ? 'Salon mis à jour avec succès' : 'Salon ajouté avec succès');
    } catch (error) {
      console.error('Error saving salon:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce salon ?')) {
      try {
        const response = await fetch(`/api/salons/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete salon');
        }

        setSalons(salons.filter(salon => salon._id !== id));
        toast.success('Salon supprimé avec succès');
      } catch (error) {
        console.error('Error deleting salon:', error);
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (salon: Salon) => {
    setEditingSalon(salon);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingSalon(undefined);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSalon(undefined);
  };

  return (
    <DashboardLayout title="Gestion des Salons">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Salons de coiffure</h2>
          <Button onClick={handleAdd} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un salon
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {salons.map((salon) => (
              <Card key={salon._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5 text-yellow-600" />
                      <span>{salon.nom}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(salon)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (salon._id) {
                            handleDelete(salon._id);
                          }
                        }}
                                              >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span className="text-sm text-gray-600">{salon.adresse}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{salon.telephone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{salon.email}</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Heures d'ouverture</h4>
                      <div className="space-y-1">
                        {Object.entries(salon.heuresOuverture).map(([jour, horaire]) => (
                          <div key={jour} className="flex justify-between text-xs">
                            <span className="capitalize">{jour}</span>
                            <span>
                              {horaire.ouvert 
                                ? `${horaire.heureDebut} - ${horaire.heureFin}`
                                : 'Fermé'
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSalon ? 'Modifier le salon' : 'Ajouter un salon'}
              </DialogTitle>
            </DialogHeader>
            <SalonForm
              salon={editingSalon}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}