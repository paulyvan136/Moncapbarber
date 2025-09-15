import { db } from "@/db/mongoConnect";
import { RendezVousCollection } from "@/models/rendezvous-model";
import { NextResponse } from "next/server";

// Lister tous les rendez-vous ou ceux d'un salon spécifique
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");

    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const query = salonId ? { salonId } : {};
    const rendezVous = await RendezVousCollection.find(query)
      .populate("employeId", "nom prenom email")
      .populate("serviceId", "nom prix duree")
      .lean();
    return NextResponse.json(rendezVous, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Ajouter un rendez-vous
export const POST = async (req: Request) => {
  try {
    const rendezVous = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const newRendezVous = new RendezVousCollection(rendezVous);
    await newRendezVous.save();
    return NextResponse.json({ message: "Rendez-vous ajouté avec succès" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Modifier un rendez-vous
export const PUT = async (req: Request) => {
  try {
    const { id, ...updateData } = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const updatedRendezVous = await RendezVousCollection.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRendezVous) {
      return NextResponse.json({ message: "Rendez-vous non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Rendez-vous modifié avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Supprimer un rendez-vous
export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const deletedRendezVous = await RendezVousCollection.findByIdAndDelete(id);
    if (!deletedRendezVous) {
      return NextResponse.json({ message: "Rendez-vous non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Rendez-vous supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};