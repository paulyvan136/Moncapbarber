import { model, models, Schema } from "mongoose";

const EmployesSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  typeUser: { type: String, required: true, enum: ["admin", "employe"] }, // Exemple : admin ou employé
  nomBoutique: { type: String }, // Nom du salon associé
  adresse: { type: String },
});

export const EmployesCollection = models.Employes || model("Employes", EmployesSchema);