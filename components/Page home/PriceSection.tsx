import Services, { Service } from '../../data/services'; 
import React, { useState } from 'react'
import '../../Style.css/PriceSection.css'


 function PriceSection() {

     // On récupère la catégorie "Hommes"
  const categoryHomme = Services.find((cat) => cat.id === 1);
  const LimitedServiceHomme = categoryHomme?.services.slice(0, 4); // 4 premiers services

       // On récupère la catégorie "Locks + Coiffure"
  const categoryDame = Services.find((cat) => cat.id === 3);
  const LimitedServiceDame = categoryDame?.services.slice(0, 4); // 4 premiers services

      // On récupère la catégorie "Enfants"
  const categoryEnfants = Services.find((cat) => cat.id === 5);
    const LimitedServiceEnfants = categoryEnfants?.services.slice(0, 4); // 4 premiers services



  
    return (
        <div className=" container ">
            <h2 className='text-white text-center mb-5 h1 fw-bold'>Nos Prix</h2>
            <div className="row">
                
                {/* tableau 1 */}
                <div className="col-md-4">
                    <div className="card  text-center text-white mb-4">
                        <div className="card-header">
                            <h3 className="text-warning">Coupe Homme</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                        </div>
                        <div className="card-body">                    
                            <table className="table table-sm text-white " >
                            <tbody>
                            {LimitedServiceHomme?.map((service) => (
                                <tr key={service.id}>
                                    <td className="text-start text-white">{service.name}</td>
                                    <td className="text-warning">{service.price} FCFA</td>
                                </tr>
                                
                                  ))}
                            </tbody>
                          
                        </table>
                            
                            <button className="btn btn-custom">Rendez-vous</button>
                        </div>
                    </div>
                </div>
                {/* tableau 2 */}

                <div className="col-md-4">
                    <div className="card text-center text-white mb-4">
                        <div className="card-header">
                        <h3 className="text-warning">Locks + Coiffure</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                        </div>
                        <div className="card-body">
                            <table className="table table-sm">
                                <tbody>
                                {LimitedServiceDame?.map((service) => (
                                <tr key={service.id}>
                                    <td className="text-start text-white">{service.name}</td>
                                    <td className="text-warning">{service.price} FCFA</td>
                                </tr>
                                  ))}
                                </tbody>
                            </table>
                            <button className="btn btn-custom">Rendez-vous</button>
                        </div>
                    </div>
                </div>
                {/* tableau 3 */}

                <div className="col-md-4">
                    <div className="card text-center text-white mb-4">
                        <div className="card-header">
                        <h3 className="text-warning">Coupe Enfants</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                        </div>
                        <div className="card-body">
                            <table className="table table-sm">
                                <tbody>
                                {LimitedServiceEnfants?.map((service) => (
                                <tr key={service.id}>
                                    <td className="text-start text-white">{service.name}</td>
                                    <td className="text-warning">{service.price} FCFA</td>
                                </tr>
                                
                                  ))}
                                </tbody>
                            </table>
                            <button className="btn btn-custom">Rendez-vous</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PriceSection


