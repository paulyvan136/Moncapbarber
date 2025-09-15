"use client";

import React from "react";
import FormRDV from "./FormRDV";
import { Member } from "../../data/team";

type ModalRDVProps = {
  coiffeur: Member;
};

function ModalRDV({ coiffeur }: ModalRDVProps) {
  const handleSubmit = (data: any) => {
    console.log("Données du rendez-vous :", data);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Prendre RDV avec {coiffeur.nom}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <FormRDV
                coiffeurId={coiffeur.id}
                coiffeurNom={coiffeur.nom}
                joursDisponibles={coiffeur.joursDisponibles}
                heuresDisponibles={coiffeur.heuresDisponibles}
                onSubmit={handleSubmit}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalRDV;
