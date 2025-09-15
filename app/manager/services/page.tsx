"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ServiceForm } from "@/components/forms/ServiceForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Scissors } from "lucide-react";
import { Service } from "@/types";
import { toast } from "react-toastify";

export default function ServicesPage() {
    const { salonId } = useParams();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState<Service | undefined>();

    useEffect(() => {
        fetchServices();
    }, [salonId]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/services?salonId=${salonId}`);
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
            toast.error("Erreur lors du chargement des services");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            const url = editingService ? `/api/services/${editingService._id}` : "/api/services";
            const method = editingService ? "PUT" : "POST";
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, salonId }),
            });

            if (!response.ok) {
                throw new Error("Failed to save service");
            }

            await fetchServices();
            setShowForm(false);
            setEditingService(undefined);
            toast.success(editingService ? "Service mis à jour avec succès" : "Service ajouté avec succès");
        } catch (error) {
            console.error("Error saving service:", error);
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
            try {
                const response = await fetch(`/api/services/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete service");
                }

                setServices(services.filter((service) => service._id !== id));
                toast.success("Service supprimé avec succès");
            } catch (error) {
                console.error("Error deleting service:", error);
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingService(undefined);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingService(undefined);
    };

    return (
        <DashboardLayout title="Gestion des Services">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Services</h2>
                    <Button onClick={handleAdd} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un service
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
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <Card key={service._id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Scissors className="h-5 w-5 text-yellow-600" />
                                            <span>{service.nom}</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => {
                                                if (service._id) {
                                                    handleDelete(service._id);
                                                } else {
                                                    console.error("Impossible de supprimer : service._id est undefined");
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
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Prix: {service.prix} €</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Durée: {service.duree} min</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Description: {service.description || "N/A"}</span>
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
                            <DialogTitle>{editingService ? "Modifier le service" : "Ajouter un service"}</DialogTitle>
                        </DialogHeader>
                        <ServiceForm service={editingService} onSubmit={handleSubmit} onCancel={handleCancel} />
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}