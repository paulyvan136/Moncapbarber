import React from 'react';
import Services from '../../data/services';

function ServiceByCategory() {
  return (
    <div className="container">
      <h1 className="my-4 text-center">Services par catégorie</h1>

      {Services.map((category) => (
        <div key={category.id} className="mb-5">
          <h3 className="text-primary">{category.category}</h3>
          <div className="row">
            {category.services.map((service) => (
              <div key={service.id} className="col-md-6 mb-3">
                <div className="card shadow-sm bg-dark text-white">
                  <div className="card-body">
                    <h5 className="card-title">{service.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {typeof service.price === "number" ? `${service.price} FCFA` : service.price}
                    </h6>
                    <p className="card-text">{service.description}</p>
                    <button className="btn btn-sm btn-primary">Modifier</button>
                    <button className="btn btn-sm btn-danger ms-2">Supprimer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServiceByCategory;
