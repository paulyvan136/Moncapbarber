import { db } from "@/db/mongoConnect";
import { ServiceCollection } from "@/models/services-model";
import { NextResponse } from "next/server";

// Lister tous les services ou ceux d'un salon spécifique
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");

    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const query = salonId ? { salonId } : {};
    const services = await ServiceCollection.find(query).lean();
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Ajouter un service
export const POST = async (req: Request) => {
  try {
    const service = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const newService = new ServiceCollection(service);
    await newService.save();
    return NextResponse.json({ message: "Service ajouté avec succès" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Modifier un service
export const PUT = async (req: Request) => {
  try {
    const { id, ...updateData } = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const updatedService = await ServiceCollection.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedService) {
      return NextResponse.json({ message: "Service non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service modifié avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};

// Supprimer un service
export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }

    const deletedService = await ServiceCollection.findByIdAndDelete(id);
    if (!deletedService) {
      return NextResponse.json({ message: "Service non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};