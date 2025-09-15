import React from 'react'
import './About.css';
import TeamSection from '@/components/TeamSection';

function About() {
  return (
    <div className="aboutPage bg-dark text-white">

      {/* */}
      <div className="row mb-5">
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
        <div className="col-md-7  ">
          <div className="row ">
            <div className="col-md-5  ms-lg-5">
              <img src="./images/hero-home.png" alt="" className='img-about' />
            </div>
            <div className="col-md-5 mt-lg-5 mt-3 ">
              <img src="./images/hero-home.png" alt="" className='img-about' />
            </div>
          </div>
        </div>
      </div>



      <div className='mt-5'>
        <div className="row">

          {/* Colonne de gauche */}
          <div className="col-md-5">
            {/* Row pour les images */}
            <div className="row">
              <div className="col-md-3">
                <img src="./images/hero-home.png" alt="" className='img-about' />
              </div>
              <div className="col-md-6">
                <img src="./images/hero-home.png" alt="" className='img-about' />
              </div>
              <div className="col-md-3 mt-lg-5 mt-3 d-flex align-items-end justify-content-center">
                <img src="./images/hero-home.png" alt="" className='img-about' />
              </div>
            </div>
          </div>

          {/*colonne de droite */}

          {/* Texte descriptif */}
          <div className="col-md-6 ms-lg-5 mt-lg-0 mt-3">
            <div className="mt-4">
              <p>
                Moncap Barber est un salon de coiffure de référence, présent à Yopougon, à la Palmeraie et à Angré.
                Nous offrons des services de coiffure modernes et professionnels, pensés pour mettre en valeur votre style unique.
              </p>
              <p>
                Chaque client est accueilli avec soin et bénéficie d’une expérience personnalisée,
                dans un cadre élégant et chaleureux où règne le professionnalisme.
              </p>
              <p>
                Notre équipe de barbiers et coiffeurs expérimentés est passionnée par son métier et toujours à l’écoute pour répondre à vos besoins. Que ce soit pour une coupe tendance, un dégradé parfait, des locks, une coloration ou un entretien de barbe, nous garantissons un résultat impeccable et à la hauteur de vos attentes.
                Nous croyons que la coiffure n’est pas seulement un art, mais aussi un moyen de confiance et d’expression de soi.
              </p>

              {/* Bloc complémentaire */}
              <div className="ms-5 mt-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <TeamSection />
      </div>


      <div className="mt-5">
        <h2 className="text-center mb-4">Témoignages</h2>

        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">

            {/* Slide 1 */}
            <div className="carousel-item active">
              <div className="d-flex justify-content-center">
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title">Amadou K.</h5>
                    <p className="card-text">
                      J’adore ce salon ! Les barbiers sont très professionnels et toujours à l’écoute de mes préférences. Je ressors toujours satisfait.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="d-flex justify-content-center">
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title">Fatou D.</h5>
                    <p className="card-text">
                      Service impeccable et accueil chaleureux. Le cadre est propre et l’équipe très sympathique. Je recommande vivement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <div className="d-flex justify-content-center">
                <div className="card" >
                  <div className="card-body text-center">
                    <h5 className="card-title">Yao P.</h5>
                    <p className="card-text">
                      Excellent salon, ambiance agréable et coupes modernes. Je suis devenu un client fidèle grâce à la qualité des services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div >
  )
}

export default About
