"use client";
import React, { useState, useEffect } from "react";
import Services, { Service } from "@/data/services";

interface BookingFormProps {
    coiffeurId: number;
    coiffeurNom: string;
    joursDisponibles: string[];
    heuresDisponibles: string[];
    onSubmit: (data: any) => void;
}

export default function FormRDV({
    coiffeurId,
    coiffeurNom,
    joursDisponibles,
    heuresDisponibles,
    onSubmit,
}: BookingFormProps) {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");

    const [categorieChoisie, setCategorieChoisie] = useState("");
    const [servicesFiltres, setServicesFiltres] = useState<Service["services"]>([]);
    const [serviceChoisiId, setServiceChoisiId] = useState<number | null>(null);

    const [jourChoisi, setJourChoisi] = useState("");
    const [heureChoisie, setHeureChoisie] = useState("");

    useEffect(() => {
        if (categorieChoisie) {
            const category = Services.find((cat) => cat.category === categorieChoisie);
            setServicesFiltres(category ? category.services : []);
            setServiceChoisiId(null); // reset choix service
        } else {
            setServicesFiltres([]);
            setServiceChoisiId(null);
        }
    }, [categorieChoisie]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nom || !prenom || !telephone || !email) {
            alert("Veuillez remplir toutes vos informations personnelles.");
            return;
        }
        if (!categorieChoisie) {
            alert("Veuillez choisir une catégorie.");
            return;
        }
        if (!serviceChoisiId) {
            alert("Veuillez choisir un service.");
            return;
        }
        if (!jourChoisi || !heureChoisie) {
            alert("Veuillez choisir un jour et une heure.");
            return;
        }
        onSubmit({
            coiffeurId,
            nom,
            prenom,
            telephone,
            email,
            categorie: categorieChoisie,
            serviceId: serviceChoisiId,
            jour: jourChoisi,
            heure: heureChoisie,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="booking-form">
        e
            <h3>Prendre rendez-vous avec {coiffeurNom}</h3>

            {/* Nom */}
            <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                    type="text"
                    placeholder="Nom"
                    value={nom}
                    className="form-control"
                    onChange={(e) => setNom(e.target.value)}
                />
            </div>
            {/* Prénom */}
            <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input
                    type="text"
                    value={prenom}
                    className="form-control"
                    onChange={(e) => setPrenom(e.target.value)}
                />            </div>

            {/* Email */}
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    value={email}
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                />            </div>

            {/* Téléphone */}
            <div className="mb-3">
                <label className="form-label">Téléphone</label>
                <input
                    type="tel"
                    value={telephone}
                    className="form-control"
                    onChange={(e) => setTelephone(e.target.value)}
                />            </div>

            {/* Catégorie */}
            <div className="mb-3">
                <label>Catégorie :</label>
                <select
                    value={categorieChoisie}
                    className="form-control"
                    onChange={(e) => setCategorieChoisie(e.target.value)}
                >
                    <option value="">Choisir une catégorie </option>
                    {Services.map((cat) => (
                        <option key={cat.id} value={cat.category}>
                            {cat.category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Services */}
            <div className="mb-3">
                {servicesFiltres.length > 0 && (
                    <>
                        <label>Services </label>
                        <select
                            value={serviceChoisiId ?? ""}
                            className="form-control"
                            onChange={(e) => setServiceChoisiId(Number(e.target.value))}
                        >
                            <option value="">-- Choisir un service --</option>
                            {servicesFiltres.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - {service.price} FCFA
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            {/* Jour */}
            <div className="mb-3">

                <label>Jour disponible :</label>
                <select value={jourChoisi}
                className="form-control" onChange={(e) => setJourChoisi(e.target.value)}>
                    <option value=""> Choisir un jour </option>
                    {joursDisponibles.map((j) => (
                        <option key={j} value={j}>
                            {j}
                        </option>
                    ))}
                </select>

            </div>

            {/* Heure */}
            <div className="mb-3">
                <label>Heure disponible </label>
                <select value={heureChoisie} className="form-control" onChange={(e) => setHeureChoisie(e.target.value)}>
                    <option value=""> Choisir une heure </option>
                    {heuresDisponibles.map((h) => (
                        <option key={h} value={h}>
                            {h}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Confirmer le rendez-vous
            </button>

        </form>
    );
}
