import { model, models, Schema } from "mongoose";

const RendezVousSchema = new Schema({
  clientNom: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: Date, required: true },
  employeId: { type: Schema.Types.ObjectId, ref: "Users", required: true }, // Référence à l'employé
  serviceId: { type: Schema.Types.ObjectId, ref: "Services", required: true }, // Référence au service
  salonId: { type: Schema.Types.ObjectId, ref: "Salons", required: true }, // Référence au salon
  statut: { type: String, required: true, enum: ["en_attente", "confirme", "annule"] },
});

export const RendezVousCollection = models.RendezVous || model("RendezVous", RendezVousSchema);