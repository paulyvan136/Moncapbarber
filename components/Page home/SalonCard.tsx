import Link from "next/link";
import salons from "../../data/salons";
import "../../Style.css/SalonCard.css";

interface Salon {
    id: string;
    nom: string;
    image: string;
}

const SalonCard = () => {
    return (
        <div className='salon-section d-flex flex-column align-items-center'>
            <h2 className='text-white text-center mb-3 h1 fw-bold'>NOS SALONS</h2>
            <div className="row">
                {salons.map((salon: Salon) => (
                    <div className="col-md-4" key={salon.id}>
                        <div className="salon-card mb-5">
                            <img src={salon.image} className="img-salon" alt={salon.nom} />
                            <div className="overlay d-flex flex-column justify-content-center align-items-center">
                                <h5 className="text-white">{salon.nom}</h5>
                                <Link href={`/Salons/${salon.id}`}>
                                    <button className="btn btn-primary" onClick={() => window.location.href = `/Salons/${salon.id}`}>Voir plus</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalonCard;
