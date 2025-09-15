import { model, models, Schema } from "mongoose";

const SalonSchema = new Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String },
  email: { type: String, required: true },
  uid: { type: String, required: true },
  heuresOuverture: {
    type: Map,
    of: {
      ouvert: { type: Boolean, required: true },
      heureDebut: { type: String },
      heureFin: { type: String },
    },
  },
});

export const SalonCollection = models.Salons || model("Salons", SalonSchema);