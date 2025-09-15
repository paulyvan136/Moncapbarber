"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Calendar, Scissors, Euro, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface Salon {
  _id: string;
  nom: string;
  adresse: string;
  telephone?: string;
  email: string;
  uid: string;
}

interface Employe {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  uid: string;
  typeUser: string;
  nomBoutique?: string;
  adresse?: string;
}

interface Service {
  _id: string;
  nom: string;
  description?: string;
  prix: number;
  duree: number;
  salonId: string;
}

interface RendezVous {
  _id: string;
  clientNom: string;
  clientEmail: string;
  date: string;
  employeId: { _id: string; nom: string; prenom: string };
  serviceId: { _id: string; nom: string };
  salonId: string;
  statut: string;
}

interface DashboardStats {
  totalSalons: number;
  totalEmployes: number;
  totalRendezVous: number;
  totalServices: number;
  rendezVousAujourdhui: number;
  chiffreAffaires: number;
}

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSalons: 0,
    totalEmployes: 0,
    totalRendezVous: 0,
    totalServices: 0,
    rendezVousAujourdhui: 0,
    chiffreAffaires: 0,
  });
  const [salons, setSalons] = useState<Salon[]>([]);
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);

  const statutColors = {
    confirme: "bg-green-100 text-green-800",
    en_attente: "bg-yellow-100 text-yellow-800",
    annule: "bg-red-100 text-red-800",
    termine: "bg-blue-100 text-blue-800",
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [salonsRes, employesRes, servicesRes, rendezVousRes] = await Promise.all([
        fetch("/api/salon"),
        fetch("/api/employe"),
        fetch("/api/service"),
        fetch("/api/rendezvous"),
      ]);

      const [salonsData, employesData, servicesData, rendezVousData] = await Promise.all([
        salonsRes.json(),
        employesRes.json(),
        servicesRes.json(),
        rendezVousRes.json(),
      ]);

      setSalons(salonsData);
      setEmployes(employesData);
      setServices(servicesData);
      setRendezVous(rendezVousData);

      // Calcul des stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const rendezVousAujourdhui = rendezVousData.filter((rdv: RendezVous) => {
        const rdvDate = new Date(rdv.date);
        return rdvDate >= today && rdvDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
      }).length;
      const chiffreAffaires = rendezVousData
        .filter((rdv: RendezVous) => rdv.statut === "termine")
        .reduce((total: number, rdv: RendezVous) => {
          const service = servicesData.find((s: Service) => s._id === rdv.serviceId._id);
          return total + (service ? service.prix : 0);
        }, 0);
      const rendezVousParStatut = rendezVousData.reduce((acc: Record<string, number>, rdv: RendezVous) => {
        acc[rdv.statut] = (acc[rdv.statut] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalSalons: salonsData.length,
        totalEmployes: employesData.length,
        totalRendezVous: rendezVousData.length,
        totalServices: servicesData.length,
        rendezVousAujourdhui,
        chiffreAffaires,
      });
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSalon = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce salon ?")) {
      try {
        const response = await fetch("/api/salons", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          setSalons(salons.filter((salon) => salon._id !== id));
          toast.success("Salon supprimé avec succès");
        } else {
          toast.error("Erreur lors de la suppression");
        }
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const handleDeleteEmploye = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      try {
        const response = await fetch("/api/employes", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          setEmployes(employes.filter((employe) => employe._id !== id));
          toast.success("Employé supprimé avec succès");
        } else {
          toast.error("Erreur lors de la suppression");
        }
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      try {
        const response = await fetch("/api/services", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          setServices(services.filter((service) => service._id !== id));
          toast.success("Service supprimé avec succès");
        } else {
          toast.error("Erreur lors de la suppression");
        }
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const handleDeleteRendezVous = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      try {
        const response = await fetch("/api/rendezvous", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          setRendezVous(rendezVous.filter((rdv) => rdv._id !== id));
          toast.success("Rendez-vous supprimé avec succès");
        } else {
          toast.error("Erreur lors de la suppression");
        }
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  return (
    <DashboardLayout title="Dashboard Admin Général">
      <div className="space-y-6">
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Admin Général</h1>
          <p className="text-muted-foreground">Vue d'ensemble de votre réseau Moncap Barber</p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Salons"
            value={stats.totalSalons}
            icon={Building2}
            description="salons actifs"
            className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
          />
          <StatsCard
            title="Total Employés"
            value={stats.totalEmployes}
            icon={Users}
            description="employés actifs"
            className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20"
          />
          <StatsCard
            title="Rendez-vous"
            value={stats.rendezVousAujourdhui}
            icon={Calendar}
            description={`aujourd'hui / ${stats.totalRendezVous} total`}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
          />
          <StatsCard
            title="Chiffre d'Affaires"
            value={stats.chiffreAffaires.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
            icon={Euro}
            description="services terminés"
            className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
          />
        </div>

        {/* Détails par sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Rendez-vous par Statut
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(rendezVous.reduce((acc: Record<string, number>, rdv: RendezVous) => {
                  acc[rdv.statut] = (acc[rdv.statut] || 0) + 1;
                  return acc;
                }, {})).map(([statut, count]) => (
                  <div key={statut} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={statutColors[statut as keyof typeof statutColors]}>
                        {statut.replace('_', ' ')}
                      </Badge>
                    </div>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sections détaillées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Gestion des Salons
              </span>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark bg-yellow-400 hover:bg-yellow-500 rounded-md">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un salon
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {salons.length === 0 ? (
                <p className="text-muted-foreground">Aucun salon disponible.</p>
              ) : (
                salons.map((salon) => (
                  <div key={salon._id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{salon.nom}</h4>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-600 hover:text-gray-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteSalon(salon._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{salon.adresse}</p>
                    <p className="text-xs text-muted-foreground">{salon.email}</p>
                    <p className="text-xs text-muted-foreground">{salon.telephone || "N/A"}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gestion des Employés
              </span>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark bg-yellow-400 hover:bg-yellow-500 rounded-md">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un employé
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employes.length === 0 ? (
                <p className="text-muted-foreground">Aucun employé disponible.</p>
              ) : (
                employes.map((employe) => (
                  <div key={employe._id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{`${employe.prenom} ${employe.nom}`}</h4>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-600 hover:text-gray-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteEmploye(employe._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{employe.email}</p>
                    <p className="text-xs text-muted-foreground">{employe.nomBoutique || "Non assigné"}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Scissors className="h-5 w-5" />
                Gestion des Services
              </span>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark bg-yellow-400 hover:bg-yellow-500 rounded-md">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un service
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.length === 0 ? (
                <p className="text-muted-foreground">Aucun service disponible.</p>
              ) : (
                services.map((service) => (
                  <div key={service._id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{service.nom}</h4>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-600 hover:text-gray-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteService(service._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{service.description || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">Prix: {service.prix} €</p>
                    <p className="text-xs text-muted-foreground">Durée: {service.duree} min</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Gestion des Rendez-vous
              </span>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark bg-yellow-400 hover:bg-yellow-500 rounded-md">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau rendez-vous
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rendezVous.length === 0 ? (
                <p className="text-muted-foreground">Aucun rendez-vous disponible.</p>
              ) : (
                rendezVous.map((rdv) => (
                  <div key={rdv._id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{rdv.clientNom}</h4>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-600 hover:text-gray-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteRendezVous(rdv._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{rdv.clientEmail}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Date: {new Date(rdv.date).toLocaleString("fr-FR")}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Employé: {`${rdv.employeId.prenom} ${rdv.employeId.nom}`}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">Service: {rdv.serviceId.nom}</p>
                    <Badge className={statutColors[rdv.statut as keyof typeof statutColors]}>
                      {rdv.statut.replace('_', ' ')}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}