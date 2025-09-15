"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RendezVousForm } from "@/components/forms/RendezVousForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { RendezVous } from "@/types";
import { toast } from "react-toastify";

export default function RendezVousPage() {
    const { salonId } = useParams();
    const [rendezVous, setRendezVous] = useState<RendezVous[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRendezVous, setEditingRendezVous] = useState<RendezVous | undefined>();

    useEffect(() => {
        fetchRendezVous();
    }, [salonId]);

    const fetchRendezVous = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/rendezvous?salonId=${salonId}`);
            const data = await response.json();
            setRendezVous(data);
        } catch (error) {
            console.error("Error fetching rendez-vous:", error);
            toast.error("Erreur lors du chargement des rendez-vous");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            const url = editingRendezVous ? `/api/rendezvous/${editingRendezVous._id}` : "/api/rendezvous";
            const method = editingRendezVous ? "PUT" : "POST";
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, salonId }),
            });

            if (!response.ok) {
                throw new Error("Failed to save rendez-vous");
            }

            await fetchRendezVous();
            setShowForm(false);
            setEditingRendezVous(undefined);
            toast.success(editingRendezVous ? "Rendez-vous mis à jour avec succès" : "Rendez-vous ajouté avec succès");
        } catch (error) {
            console.error("Error saving rendez-vous:", error);
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
            try {
                const response = await fetch(`/api/rendezvous/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete rendez-vous");
                }

                setRendezVous(rendezVous.filter((rdv) => rdv._id !== id));
                toast.success("Rendez-vous supprimé avec succès");
            } catch (error) {
                console.error("Error deleting rendez-vous:", error);
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    const handleEdit = (rdv: RendezVous) => {
        setEditingRendezVous(rdv);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingRendezVous(undefined);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingRendezVous(undefined);
    };

    return (
        <DashboardLayout title="Gestion des Rendez-vous">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Rendez-vous</h2>
                    <Button onClick={handleAdd} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                        <Plus className="h-4 w-4 mr-2" />
                        Nouveau rendez-vous
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
                        {rendezVous.map((rdv) => (
                            <Card key={rdv._id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-5 w-5 text-yellow-600" />
                                            <span>{rdv.clientNom}</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(rdv)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => {
                                                if (rdv._id) {
                                                    handleDelete(rdv._id);
                                                } else {
                                                    console.error("Impossible de supprimer : l'ID du rendez-vous est manquant.");
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
                                            <span className="text-sm text-gray-600">Email: {rdv.clientEmail}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Date: {new Date(rdv.dateHeure).toLocaleString("fr-FR")}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Employé: {`${rdv.employeId.prenom} ${rdv.employeId.nom}`}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Service: {rdv.serviceId.nom}</span>
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
                            <DialogTitle>{editingRendezVous ? "Modifier le rendez-vous" : "Ajouter un rendez-vous"}</DialogTitle>
                        </DialogHeader>
                        <RendezVousForm
                            rendezVous={editingRendezVous}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}