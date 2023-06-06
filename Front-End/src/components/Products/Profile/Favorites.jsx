import { Link } from 'react-router-dom';
import Lottie from "lottie-react"
import delivery from "../../../assets/LottieAnimations/computer.json"

export default function Favorites({ favorites }) {

    return (
        <section className='favBox'>
            <section className='favoriteContainer'>
                {favorites && favorites.map((favorite) => {
                    return (
                        <Link
                            to={`/product/${favorite.id}`}
                            className="favoriteProd" key={favorite.id} >
                            <img className='favProductImg' src={favorite.image} alt="" loading='lazy' />
                            <div className='topContentBoxFav'>
                                <p className="favTitle">{favorite.title}</p>
                                <p className="favPrice">${favorite.price}</p>
                            </div>
                        </Link>
                    );
                })}
            </section >
            <section className='recomendations'>
                <Lottie className="favPageAnimation" animationData={delivery} loop={true} />
            </section>
        </section>

    )
}
