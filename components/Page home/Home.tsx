'use client';
import React, { useEffect } from 'react';
import '../../Style.css/Home.css';
import ServiceSection from '../../components/Page home/ServiceSection';
import PriceSection from './PriceSection';
import SalonCard from './SalonCard';

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
      , 50);
  }, []);


  7
  return (
    <>

      {/* section hero */}

      <div className="hero d-flex justify-content-start align-items-center ">
        <div className=" ">
          <div className='text-hero ps-5'>
            <h1>Lorem ipsum dolor sit amet consectetur.</h1>
            <p>Lorem, ipsum.</p>
            <button className="btn btn-outline-warning text-white ">PRENDRE RENDEZ-VOUS</button>
          </div>
        </div>
      </div>

      {/* section about */}
      <div className="about bg-dark text-white">
        <div className="row">
          <h2 className='fw-bold h1'>A PROPOS DE NOUS</h2>
          <div className="col-md-5 my-lg-auto">
            <p className="">
              Moncap Barber est un salon de coiffure de référence, présent à Yopougon, à la Palmeraie et à Angré.
              Nous offrons des services de coiffure modernes et professionnels, pensés pour mettre en valeur votre style unique.
            </p>
            <p>Chaque client est accueilli avec soin et bénéficie d’une expérience personnalisée,
              dans un cadre élégant et chaleureux où règne le professionnalisme.
            </p>
            <p className=''>Notre équipe de barbiers et coiffeurs expérimentés est passionnée par son métier et toujours à l’écoute pour répondre à vos besoins. Que ce soit pour une coupe tendance, un dégradé parfait, des locks, une coloration ou un entretien de barbe, nous garantissons un résultat impeccable et à la hauteur de vos attentes.
              Nous croyons que la coiffure n’est pas seulement un art, mais aussi un moyen de confiance et d’expression de soi.

            </p>
            <div className=" ms-5 mt-4">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

            </div>
          </div>
          <div className="col-md-7 ">
            <div className="row">
              <div className="col-md-5  ms-lg-5">
                <img src="./images/hero-home.png" alt="" className='img-about' />
              </div>
              <div className="col-md-5 mt-lg-5 mt-3 ">
                <img src="./images/hero-home.png" alt="" className='img-about' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section salon */}
      <div className=' bg-dark '>
      <SalonCard />
      </div>

      {/* section services */}
      <div className=' bg-dark text-white'>
        <ServiceSection />
      </div>

      {/* section gallery */}
      <div className="gallery bg-dark text-white">
        <h3 className="text-white text-center mb-5 h1 fw-bold">GALLERIE</h3>
        {/*Ligne 1*/}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <img src="./images/gallery/gallery2.jpg" alt="" className='img-gallery' />
          </div>
          <div className="col-md-4">
          <img src="./images/gallery/gallery3.jpg" alt="" className='img-gallery' />
          </div>
          <div className="col-md-4">
          <img src="./images/gallery/gallery4.jpg" alt="" className='img-gallery' />
          </div>
        </div>
        {/*Ligne 2*/}
        <div className="row g-4 mt-4 ">
          <div className="col-md-6 me-">
          <img src="./images/gallery/gallery1.jpg" alt="" className='img-gallery' />
          </div>
          <div className="col-md-6">
          <img src="./images/gallery/gallery7.jpg" alt="" className='img-gallery' />
          </div>
        </div>
        {/*Ligne 3*/}
        <div className="row g-4 mt-3">
          <div className="col-md-4">
          <img src="./images/gallery/gallery5.jpg" alt="" className='img-gallery' />
          </div>
          <div className="col-md-4">
          <img src="./images/gallery/gallery6.jpg" alt="" className='img-gallery' />
          </div>
          <div className="col-md-4">
          <img src="./images/gallery/gallery8.jpg" alt="" className='img-gallery' />
          </div>
        </div>
      </div>

      {/* section prix */}
      <div className="prix  bg-dark text-white ">
        <PriceSection />
      </div>


    </>
  );
}
