import React from 'react';
import ServiceByCategory from '@/components/Admin/ServiceByCategory';

function SalonAdmin() {

  return (
    <main style={{ paddingTop: "80px", minHeight: "100vh" }} className="bg-dark text-white">
    <div className="container">
      <h1 className="text-center mb-4">Administration Générale</h1>

      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3 col-lg-2 bg-white shadow-sm rounded p-0" style={{ minHeight: "80vh", position: "sticky", top: "80px" }}>
          <div className="nav flex-column nav-pills mt-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button className="nav-link" id="v-pills-employes-tab" data-bs-toggle="pill" data-bs-target="#v-pills-employes" type="button" role="tab" aria-controls="v-pills-employes" aria-selected="false">Employés</button>
            <button className="nav-link" id="v-pills-rdv-tab" data-bs-toggle="pill" data-bs-target="#v-pills-rdv" type="button" role="tab" aria-controls="v-pills-rdv" aria-selected="false">Rendez-vous</button>
            <button className="nav-link" id="v-pills-categories-tab" data-bs-toggle="pill" data-bs-target="#v-pills-categories" type="button" role="tab" aria-controls="v-pills-categories" aria-selected="false">Services par Catégorie</button>
          </div>
        </aside>

        {/* Main content */}
        <section className="col-md-9 col-lg-10 mt-3 ">
          <div className="tab-content p-3 bg-dark text-white shadow-sm rounded" id="v-pills-tabContent" style={{ maxHeight: "75vh", overflowY: "auto" }}>

            <div className="tab-pane fade" id="v-pills-employes" role="tabpanel" aria-labelledby="v-pills-employes-tab">
              <h2>Liste des Employés</h2>
            </div>

            <div className="tab-pane fade" id="v-pills-rdv" role="tabpanel" aria-labelledby="v-pills-rdv-tab">
              <h2>Liste des Rendez-vous</h2>
            </div>

            <div className="tab-pane fade" id="v-pills-categories" role="tabpanel" aria-labelledby="v-pills-categories-tab">
              <h2>Liste des Services par Catégorie</h2>
              <ServiceByCategory />
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
  );
}

export default SalonAdmin;
