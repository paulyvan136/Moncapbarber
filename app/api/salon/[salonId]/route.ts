import { db } from "@/db/mongoConnect";
import { SalonCollection } from "@/models/salons-model";
import { NextResponse } from "next/server";

// Récupérer un salon spécifique par ID
export const GET = async (req: Request, { params }: { params: { salonId: string } }) => {
  try {
    const { salonId } = params;
    const database = await db();
    if (!database || database !== "connecté") {
      return NextResponse.json({ message: "Erreur de connexion à la base de données" }, { status: 500 });
    }
    
    const salon = await SalonCollection.findById(salonId).lean();
    if (!salon) {
      return NextResponse.json({ message: "Salon non trouvé" }, { status: 404 });
    }
    
    return NextResponse.json(salon, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur s'est produite" }, { status: 500 });
  }
};