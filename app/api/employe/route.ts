import { db } from "@/db/mongoConnect";
import { EmployesCollection } from "@/models/employes-model";
import { NextResponse } from "next/server";

// Lister tous les employés ou ceux d'un salon spécifique
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");

    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const query = salonId ? { nomBoutique: salonId } : { typeUser: "employe" }
    const employes = await EmployesCollection.find(query).lean();
    return NextResponse.json(employes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Ajouter un employé
export const POST = async (req: Request) => {
  try {
    const employe = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const newEmploye = new EmployesCollection({ ...employe, typeUser: "employe" });
    await newEmploye.save();
    return NextResponse.json({ message: "Employé ajouté avec succès" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Modifier un employé
export const PUT = async (req: Request) => {
  try {
    const { id, ...updateData } = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const updatedEmploye = await EmployesCollection.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedEmploye) {
      return NextResponse.json({ message: "Employé non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Employé modifié avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Supprimer un employé
export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const deletedEmploye = await EmployesCollection.findByIdAndDelete(id);
    if (!deletedEmploye) {
      return NextResponse.json({ message: "Employé non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Employé supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};