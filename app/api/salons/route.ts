import { db } from "@/db/mongoConnect";
import { SalonCollection } from "@/models/salons-model";
import { NextResponse } from "next/server";

// Lister tous les salons (pour Tableau de bord 1)
export const GET = async () => {
  try {
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }
    const salons = await SalonCollection.find().lean();
    return NextResponse.json(salons, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Ajouter un salon
export const POST = async (req: Request) => {
  try {
    const salon = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }
    const newSalon = new SalonCollection(salon);
    await newSalon.save();
    return NextResponse.json({ message: "Salon ajouté avec succès" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Modifier un salon
export const PUT = async (req: Request) => {
  try {
    const { id, ...updateData } = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }
    const updatedSalon = await SalonCollection.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedSalon) {
      return NextResponse.json({ message: "Salon non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Salon modifié avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Supprimer un salon
export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }
    const deletedSalon = await SalonCollection.findByIdAndDelete(id);
    if (!deletedSalon) {
      return NextResponse.json({ message: "Salon non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Salon supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};