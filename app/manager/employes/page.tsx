"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { EmployeForm } from "@/components/forms/EmployeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Users, Mail } from "lucide-react";
import { Employe } from "@/types";
import { toast } from "react-toastify";

export default function EmployesPage() {
    const { salonId } = useParams();
    const [employes, setEmployes] = useState<Employe[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEmploye, setEditingEmploye] = useState<Employe | undefined>();

    useEffect(() => {
        fetchEmployes();
    }, [salonId]);

    const fetchEmployes = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/employes?salonId=${salonId}`);
            const data = await response.json();
            setEmployes(data);
        } catch (error) {
            console.error("Error fetching employes:", error);
            toast.error("Erreur lors du chargement des employés");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            const url = editingEmploye ? `/api/employes/${editingEmploye._id}` : "/api/employes";
            const method = editingEmploye ? "PUT" : "POST";
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, salonId }),
            });

            if (!response.ok) {
                throw new Error("Failed to save employe");
            }

            await fetchEmployes();
            setShowForm(false);
            setEditingEmploye(undefined);
            toast.success(editingEmploye ? "Employé mis à jour avec succès" : "Employé ajouté avec succès");
        } catch (error) {
            console.error("Error saving employe:", error);
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
            try {
                const response = await fetch(`/api/employes/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete employe");
                }

                setEmployes(employes.filter((employe) => employe._id !== id));
                toast.success("Employé supprimé avec succès");
            } catch (error) {
                console.error("Error deleting employe:", error);
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    const handleEdit = (employe: Employe) => {
        setEditingEmploye(employe);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingEmploye(undefined);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingEmploye(undefined);
    };

    return (
        <DashboardLayout title="Gestion des Employés">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Employés</h2>
                    <Button onClick={handleAdd} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un employé
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
                        {employes.map((employe) => (
                            <Card key={employe._id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Users className="h-5 w-5 text-yellow-600" />
                                            <span>{`${employe.prenom} ${employe.nom}`}</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(employe)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => {
                                                if (employe._id) {
                                                    handleDelete(employe._id);
                                                } else {
                                                    console.error("Impossible de supprimer : employe._id est undefined");
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
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">{employe.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Boutique: {employe.nomBoutique || "Non assigné"}</span>
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
                            <DialogTitle>{editingEmploye ? "Modifier l'employé" : "Ajouter un employé"}</DialogTitle>
                        </DialogHeader>
                        <EmployeForm employe={editingEmploye} onSubmit={handleSubmit} onCancel={handleCancel} />
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}