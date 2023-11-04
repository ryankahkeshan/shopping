import './ProductCard.css'
import PropTypes, { number, string } from 'prop-types'
import { Star } from 'lucide-react';
import { v4 as uuid } from 'uuid';
import { useContext } from 'react';
import { CartContext } from '../Router';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, url, alt = '', title, price, rating, link }) => {

    const { addToCart } = useContext(CartContext)

    if (alt === '') alt = title

    const stars = []
    const roundedRating = Math.round(rating.rate)
    for (let i = 0; i < roundedRating; i++) {
        stars.push(<Star key={uuid()} className='star'/>)
    }
    for(let i = roundedRating; i < 5; i++) {
        stars.push(<Star key={uuid()} className='star empty-star'/>)
    }

    function findSubstring(text, maxLength = 40) {
        const words = text.split(' ');
        let currentLength = 0;
        const resultWords = [];
    
        for (const word of words) {
            if (currentLength + word.length + resultWords.length > maxLength) {
                break;
            }
            resultWords.push(word);
            currentLength += word.length;
        }
    
        return resultWords.join(' ');
    }

    return (
        <Link to={`${link}/${id}`} style={{textDecoration:'none', color:'inherit'}}>
            <section className='product-card'>
                <div className="top">
                    <img src={url} alt={alt} />
                </div>
                <div className="bottom">
                    <div style={{display:'flex', justifyContent:'center', gap:'8px', padding:'1rem'}}>
                        <StarsComponent rating={rating.rate}/>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between',
                        alignContent:'center', padding:'0 2rem', gap:'0.5rem'}}>
                        <h1>{findSubstring(title)}</h1>
                        <p>{`$${price}`}</p>
                    </div>
                    <div className="card-btns">
                        <button className='card-colored-btn' onClick={() => addToCart(url, alt, title, price)}>
                            Add To Cart
                        </button>
                        <Link to={`${link}/${id}`} style={{width:'100%'}}>
                            <button style={{width:'100%'}}>View Product</button>
                        </Link>
                    </div>
                </div>
            </section>
        </Link>
    )
}

ProductCard.propTypes = {
    id: PropTypes.number,
    url: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.objectOf(number),
    link: PropTypes.string
}

export default ProductCard

export const StarsComponent = ({ rating }) => {
    const stars = []
    const roundedRating = Math.round(rating)
    for (let i = 0; i < roundedRating; i++) {
        stars.push(<Star key={uuid()} className='star'/>)
    }
    for(let i = roundedRating; i < 5; i++) {
        stars.push(<Star key={uuid()} className='star empty-star'/>)
    }
    return stars
}