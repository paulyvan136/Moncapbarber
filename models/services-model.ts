import { model, models, Schema } from "mongoose";

const ServiceSchema = new Schema({
  nom: { type: String, required: true },
  description: { type: String },
  prix: { type: Number, required: true },
  duree: { type: Number, required: true }, // Durée en minutes
  salonId: { type: Schema.Types.ObjectId, ref: "Salons", required: true }, // Référence au salon
});

export const ServiceCollection = models.Services || model("Services", ServiceSchema);